import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {                         //Get user data
    this.firebase.user$.subscribe((user: any) => {
      this.user = user;
      console.log(this.user);
    })
  }

}
