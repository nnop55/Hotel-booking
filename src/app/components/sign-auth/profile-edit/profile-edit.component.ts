import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  uid!: string;
  fullName!: string;
  phoneNumber!: string;
  email!: string;
  cardNum!: string;
  cardCvv!: string;
  cardExpirationDate!: string;

  constructor(private firebase: FirebaseService,
    private afs: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() { // Get user data in inputs
    this.firebase.user$.subscribe((user: any) => {
      this.uid = user.uid;
      this.fullName = user.fullName;
      this.phoneNumber = user.phoneNumber;
      this.email = user.email;
      this.cardNum = user.cardNum;
      this.cardCvv = user.cardCvv;
      this.cardExpirationDate = user.cardExpirationDate;
    })
  }

  saveProfileChanges() {// Update user data
    this.afs.collection('users').doc(this.uid).set({
      'fullName': this.fullName,
      'phoneNumber': this.phoneNumber,
      'email': this.email,
      'cardNum': this.cardNum,
      'cardCvv': this.cardCvv,
      'cardExpirationDate': this.cardExpirationDate
    }, { merge: true })
      .then(() => {
        this.router.navigate(['/sign/profile'])
      })
  }

}
