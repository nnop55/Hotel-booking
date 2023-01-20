import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat';
import { Observable, of, switchMap } from 'rxjs';
import { User } from '../models/user.model';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { HotelReserve } from '../models/hotel-reserve.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  checkUser: boolean = false;

  user$!: Observable<User | null | undefined>;
  hotelHystory$!: Observable<User | null | undefined>;

  constructor(
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private router: Router
  ) {
    this.user$ = this.auth.authState
      .pipe(
        switchMap((user: any) => {
          if (user) {
            return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null)
          }
        })
      )
  }

  signIn(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        return this.getUserFullData(result.user?.uid ?? '');
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(user: User, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(user.email, password)
      .then((result) => {
        this.registerUserData(result.user, user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  private getUserFullData(id: string): Observable<User> {
    return this.firestore
      .collection('users')
      .doc(id)
      .valueChanges() as Observable<User>;
  }

  public getDataByDocumentName(document: string): any {
    return this.firestore.collection<any>(document);
  }

  public setDataByDocumentName(document: string, uid: string): any {
    return this.firestore.doc<any>(`${document}/${uid}`);
  }

  public createBookHistory(item: HotelReserve) {
    let uid = this.firestore.createId();

    const bookRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `reserve-history/${uid}`
    );

    item.uid = uid;

    bookRef.set(item, {
      merge: true,
    });

    return uid;
  }

  private registerUserData(fireUser: any, user: User) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${fireUser.uid}`
    );
    var userData: User = {
      uid: fireUser.uid,
      email: fireUser.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      cardNum: user.cardNum,
      cardCvv: user.cardCvv,
      cardExpirationDate: user.cardExpirationDate
    } as User;

    return userRef.set(userData, {
      merge: true,
    });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  SignOut() {
    return this.auth.signOut().then(() => {
      this.router.navigate(['']);
    });
  }

}
