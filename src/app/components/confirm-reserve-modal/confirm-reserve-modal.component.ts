import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-confirm-reserve-modal',
  templateUrl: './confirm-reserve-modal.component.html',
  styleUrls: ['./confirm-reserve-modal.component.css']
})
export class ConfirmReserveModalComponent implements OnInit {

  user: any;

  constructor(private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {                                             //Get user data
    this.firebase.user$.subscribe((user: any) => {
      this.user = user;
      console.log(this.user);
    })
  }

}
