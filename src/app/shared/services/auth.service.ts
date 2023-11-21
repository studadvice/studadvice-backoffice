import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import firebase from 'firebase/compat/app';

interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    role: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    private userCollection = this.afs.collection('users');

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public db: AngularFireDatabase,
        public router: Router
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                const userData: User = {
                    uid: user.uid,
                    email: user.email!,
                    displayName: user.displayName!,
                    photoURL: user.photoURL!,
                    emailVerified: user.emailVerified,
                    role: 'user'
                };
                this.currentUserSubject.next(userData);
            } else {
                this.currentUserSubject.next(null);
            }
        });
    }

    get isLoggedIn(): Observable<boolean> {
        return this.currentUser$.pipe(
            map(user => !!user && user.emailVerified)
        );
    }

    async signIn(email: string, password: string): Promise<void> {
        try {
            const result = await this.afAuth.signInWithEmailAndPassword(email, password);
            this.setUserData(result.user!);
            this.router.navigate(['dashboard']);
        } catch (error) {
            console.error(error);
        }
    }

    async signUp(email: string, password: string): Promise<void> {
        try {
            const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
            await this.sendVerificationMail();
            this.setUserData(result.user!);
        } catch (error) {
            console.error(error);
        }
    }

    async sendVerificationMail(): Promise<void> {
        const user = await this.afAuth.currentUser;
        if (user) {
            await user.sendEmailVerification();
            this.router.navigate(['verify-email-address']);
        }
    }

    async forgotPassword(passwordResetEmail: string): Promise<void> {
        try {
            await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
        } catch (error) {
            console.error(error);
        }
    }

    async setUserData(user: firebase.User): Promise<void> {
        const userData: User = {
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName!,
            photoURL: user.photoURL!,
            emailVerified: user.emailVerified,
            role: 'user'
        };
        const userRef = this.db.object(`users/${user.uid}`);
        await userRef.set(userData);
    }

    async setUserAsAdmin(uid: string): Promise<void> {
        const userRef = this.userCollection.doc(uid);
        await userRef.update({role: 'admin'});
    }

    async signOut(): Promise<void> {
        await this.afAuth.signOut();
        this.currentUserSubject.next(null);
        this.router.navigate(['sign-in']);
    }

    getUserRole(uid: string): Observable<string | null> {
        return this.db.object(`users/${uid}`).valueChanges().pipe(
            map((user: any) => user.role)
        );
    }

    async signInWithGoogle(): Promise<void> {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await this.afAuth.signInWithPopup(provider);
            if (result.additionalUserInfo?.isNewUser) {
                await this.setUserData(result.user!);
            } else if (result.user) {
                this.getUserRole(result.user.uid).subscribe(
                    {
                        next: (role) => {
                            if (role === 'admin') {
                                this.router.navigate(['formulaire']);
                            } else {
                                this.router.navigate(['dashboard']);
                            }
                        }
                    }
                )
            }
        } catch (error) {
            console.error(error);
        }
    }
}