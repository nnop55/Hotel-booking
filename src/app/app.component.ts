import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from './models/user.model';
import { CheckVariablesService } from './services/check-variables.service';
import { FirebaseService } from './services/firebase.service';
import * as moment from 'moment';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ContinueReservationModalComponent } from './components/continue-reservation-modal/continue-reservation-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'book-hotels';

  constructor(private checkService: CheckVariablesService,
    private router: Router,
    private firebase: FirebaseService,
    private check: CheckVariablesService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCurrentRoute();
    this.checkUserLoggedIn();
  }

  getCurrentRoute() {       //Get current route for hide or show filter bar
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/') {
          this.checkService.showCategories = true;
        } else {
          this.checkService.showCategories = false;
        }
      }
    })
  }

  checkUserLoggedIn() {       //Check user if logged in
    this.firebase.user$.subscribe((user: any) => {
      if (user && user.uid.length > 0) {
        this.firebase.checkUser = true;
        localStorage.setItem('user', JSON.stringify(user));
        this.checkHistory(user);
      }
    })
  }

  checkHistory(user: User) {  //Check user history if started reservation and dont finished continue
    let date = moment().format("YYYY-MM-DD HH:mm");
    let index = 0;
    let url = window.location.href;
    if (!(url.indexOf("reserve") > 0)) {
      this.firebase.getDataByDocumentName("reserve-history").valueChanges().pipe(
        map((items: any) =>
          items.filter((item: any) =>
            item.datetime <= date && moment(item.datetime).add(1, "days").format("YYYY-MM-DD HH:mm")
            >= date && item.status == "Active" && item.user_id == user.uid
          ))).subscribe((filteredData: any) => {
            if (index == 0 && filteredData && filteredData.length > 0) {
              this.continueReserveDialog(filteredData[0]);
            }
            index++;
          });
    }
  }

  continueReserveDialog(data: any) {// Continue reservation if you want or cancel
    const dialogRef = this.dialog.open(ContinueReservationModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate([`/reserve/${data.hotel_id}`])
      } else {
        this.check.reserveStatus = "Cancelled"
        const postData = {
          status: this.check.reserveStatus
        }
        this.firebase.setDataByDocumentName("reserve-history", data.uid).update(postData);
      }
    });
  }

}
