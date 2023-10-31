import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore,} from '@angular/fire/compat/firestore';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {User} from "../../core/data/user";
import firebase from 'firebase/compat/app';
import {map, Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userData: any;

    private userCollection = this.afs.collection('users');

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public db: AngularFireDatabase,
        public router: Router,
        public ngZone: NgZone
    ) {
        this.afAuth.authState.subscribe((user) => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user')!);
            } else {
                localStorage.setItem('user', 'null');
                JSON.parse(localStorage.getItem('user')!);
            }
        });
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!);
        return user !== null && user.emailVerified !== false;
    }

    signIn(email: string, password: string) {
        return this.afAuth
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.setUserData(result.user);
                this.afAuth.authState.subscribe((user) => {
                    if (user) {
                        this.router.navigate(['dashboard']);
                    }
                });
            })
            .catch((error) => {
                window.alert(error.message);
            });
    }

    signUp(email: string, password: string) {
        return this.afAuth
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                this.sendVerificationMail().then(r => console.log(r));
                this.setUserData(result.user);
            })
            .catch((error) => {
                window.alert(error.message);
            });
    }

    sendVerificationMail() {
        return this.afAuth.currentUser
            .then((u: any) => u.sendEmailVerification())
            .then(() => {
                this.router.navigate(['verify-email-address']);
            });
    }

    forgotPassword(passwordResetEmail: string) {
        return this.afAuth
            .sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            })
            .catch((error) => {
                window.alert(error);
            });
    }

    setUserData(user: any) {
        const userRef = this.db.object(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            role: 'user'
        };
        userRef.set(userData).then(r => console.log(r));
    }


    setUserAsAdmin(uid: string) {
        const userRef = this.userCollection.doc(uid);
        return userRef.update({role: 'admin'});
    }

    signOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['sign-in']);
        });
    }

    getUserRole(uid: string): Observable<string | null> {
        return this.db.object(`users/${uid}`).valueChanges().pipe(
            map((user: any) => user.role)
        );
    }


    signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.afAuth.signInWithPopup(provider).then((result) => {
            console.log(result);
            if (result.additionalUserInfo?.isNewUser) {
                this.setUserData(result.user);
            } else {
                if (result.user) {
                    this.getUserRole(result.user.uid).subscribe(role => {
                        if (role === 'admin') {
                            this.router.navigate(['formulaire']);
                        } else {
                            this.router.navigate(['dashboard']);
                        }
                    });
                }
            }
        }).catch((error) => {
            window.alert(error);
        });
    }
}
