import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import firebase from 'firebase/compat/app';
import { User } from 'src/app/core/data/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);

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
                };
                this.currentUserSubject.next(userData);
            } else {
                this.currentUserSubject.next(null);
            }
        });
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

    async setUserData(user: firebase.User): Promise<void> {
        const userData: User = {
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName!,
            photoURL: user.photoURL!,
            emailVerified: user.emailVerified,
        };
        const userRef = this.db.object(`users/${user.uid}`);
        await userRef.set(userData);
    }

    async signOut(): Promise<void> {
        await this.afAuth.signOut();
        this.currentUserSubject.next(null);
        this.router.navigate(['sign-in']);
    }

    async signInWithGoogle(): Promise<void> {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await this.afAuth.signInWithPopup(provider);
            if (result.additionalUserInfo?.isNewUser) {
                await this.setUserData(result.user!);
            } else if (result.user) {
                this.router.navigate(['dashboard']);
            }
        } catch (error) {
            console.error(error);
        }
    }

    getToken() {
        return this.afAuth.idToken;
    }
}