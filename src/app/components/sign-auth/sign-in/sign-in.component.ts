import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide = true;

  constructor(private firebase: FirebaseService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  signIn(form: NgForm) {     //Signin
    if (form.value.email == '' || form.value.password == '') {
      alert('Fill all the fields!!')
    } else {
      this.firebase
        .signIn(form.value.email, form.value.password)
        .then((response: any) => {
          if (response != undefined) {
            this.firebase.checkUser = true;
            this.openSnackBar('Logged In', 'OK')
          }
        });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


}
