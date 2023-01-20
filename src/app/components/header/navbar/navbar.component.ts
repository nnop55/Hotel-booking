import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CheckVariablesService } from 'src/app/services/check-variables.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SignInComponent } from '../../sign-auth/sign-in/sign-in.component';
import { SignUpComponent } from '../../sign-auth/sign-up/sign-up.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public checkService: CheckVariablesService,
    public dialog: MatDialog,
    public firebase: FirebaseService,
    private router: Router) { }

  ngOnInit(): void {
  }


  openSignIn() {                                        //Sign in dialog
    const dialogRef = this.dialog.open(SignInComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSignUp() {                                        //Sign up dialog
    const dialogRef = this.dialog.open(SignUpComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logOut() {                                          //Log out from account
    localStorage.clear();
    this.firebase.SignOut();
    this.firebase.checkUser = false;
    this.router.navigate([''])
  }
}
