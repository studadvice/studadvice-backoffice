import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore,} from '@angular/fire/compat/firestore';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {User} from "../../core/data/user";
import firebase from 'firebase/compat/app';
import {map, Observable, tap} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userData$?: Observable<firebase.User | null>;

    private userCollection = this.afs.collection('users');

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public db: AngularFireDatabase,
        public router: Router,
        public ngZone: NgZone
    ) {
        this.userData$ = afAuth.authState;
    }

    get isLoggedIn(): Observable<boolean> {
        return this.userData$!.pipe(
            map(user => !!user)
        );
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
            if (result.user) {
                if (result.additionalUserInfo?.isNewUser) {
                    this.setUserData(result.user);
                    // Redirection pour les nouveaux utilisateurs
                    this.router.navigate(['dashboard']);
                } else {
                    // Si l'utilisateur existe déjà, vérifiez son rôle
                    this.getUserRole(result.user.uid).subscribe(role => {
                        if (role === 'admin') {
                            this.router.navigate(['formulaire']);
                        } else {
                            this.router.navigate(['dashboard']);
                        }
                    }, error => {
                        console.error("Erreur lors de l'obtention du rôle de l'utilisateur", error);
                        window.alert("Erreur lors de la navigation.");
                    });
                }
            }
        }).catch((error) => {
            window.alert(error.message);
        });
    }

}
