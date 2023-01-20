import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  hide = true;

  constructor(private firebase: FirebaseService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  signUp(form: NgForm) {     //Signup
    var user = Object.assign(new User(), form.value);
    if (form.value.fullName == '' || form.value.email == ''
      || form.value.phoneNumber == '' || form.value.password == '' ||
      form.value.confPassword == '' || form.value.cardCvv == ''
      || form.value.cardNum == '' || form.value.cardExpirationDate == '') {
      alert("Fill all the fields!!");
    } else {
      this.firebase.signUp(user, form.value.password).then((res: any) => {
        if (form.value.password != form.value.confPassword) {
          alert("Passwords doesn't match!!")
        }
        else {
          this.openSnackBar('Successfully registered', 'OK')
        }
      })
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}  
