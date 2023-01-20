import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import * as moment from 'moment';
import { FirebaseService } from 'src/app/services/firebase.service';
import { map } from 'rxjs';
import { ContinueReservationModalComponent } from '../../continue-reservation-modal/continue-reservation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CheckVariablesService } from 'src/app/services/check-variables.service';
import { ConfirmReserveModalComponent } from '../../confirm-reserve-modal/confirm-reserve-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotelReserve } from 'src/app/models/hotel-reserve.model';


@Component({
  selector: 'app-reserve-hotel',
  templateUrl: './reserve-hotel.component.html',
  styleUrls: ['./reserve-hotel.component.css']
})
export class ReserveHotelComponent implements OnInit {

  date: any = new Object();
  diffInMs: any;
  saveCalculatedPrice: any;
  uid: string = "";
  hotelId: string = "";
  user: any;

  currentHotelRooms: any;

  constructor(private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private firebase: FirebaseService,
    private dialog: MatDialog,
    private router: Router,
    private check: CheckVariablesService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getRoomsByHotelId();
    this.checkUser();

    this.date.date_from = moment().format('YYYY-MM-DD');         //Date format with moment js
    this.date.date_to = moment().add(1, 'days').format('YYYY-MM-DD');
  }

  checkUser() {                                  //Chek user data
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    if (this.user) {
      this.checkReserveHistory();
    }
  }

  checkReserveHistory() {  // Check reserve history, if it is empty add new, else continue which reservation is started and dont finished
    let date = moment().format('YYYY-MM-DD HH:mm');
    let index = 0;

    this.firebase.getDataByDocumentName('reserve-history').valueChanges().pipe(
      map((items: any) =>
        items.filter((item: any) =>
          item.datetime <= date && moment(item.datetime).add(1, 'days').format('YYYY-MM-DD HH:mm') >=
          date && item.status == 'Active' && item.user_id == this.user.uid))).subscribe((filteredData: any) => {
            if (index == 0) {
              if (filteredData.length > 0) {
                let data = filteredData[0];
                this.uid = data.uid;

                if (data.hotel_id != this.hotelId) {
                  this.continueReserveDialog(data);
                } else {
                  this.date.date_from = moment(data.start_date).format('YYYY-MM-DD');
                  this.date.date_to = moment(data.end_date).format('YYYY-MM-DD');
                }

              } else {
                this.createReserveHistory();
              }
            }
            index++;
          })
  }

  continueReserveDialog(data: any) {// If reservation is started and dont finished for continue and finish
    const dialogRef = this.dialog.open(ContinueReservationModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate([`/reserve/${data.hotel_id}`]);
        this.uid = data.uid;
        this.date.date_from = moment(data.start_date).format("YYYY-MM-DD");
        this.date.date_to = moment(data.end_date).format("YYYY-MM-DD");
      } else {
        this.check.reserveStatus = "Cancelled";

        const postData = {
          status: this.check.reserveStatus
        }

        this.firebase.setDataByDocumentName('reserve-history', this.uid).update(postData);
        this.uid = '';
      }
    })
  }

  getDifferenceInDays() {// Get difference selected datefrom and dateto for calculate room price
    const postData = {
      start_date: moment(this.date.date_from).format("YYYY-MM-DD"),
      end_date: moment(this.date.date_to).format("YYYY-MM-DD")
    }

    this.firebase.setDataByDocumentName("reserve-history", this.uid).update(postData);

    let to: any = new Date(this.date.date_to);
    let from: any = new Date(this.date.date_from);

    const diffInMs = Math.abs(to - from);
    this.diffInMs = diffInMs / (1000 * 60 * 60 * 24);
    this.calculatePrice();
    return this.diffInMs
  }

  calculatePrice() { //Show calculated price in cards
    this.currentHotelRooms['rooms'].forEach((e: any) => {
      e['oldPriceTmp'] = e.oldPriceTmp == undefined ? e.price : e.oldPriceTmp;
      console.log(e['oldPriceTmp']);
      e.price = this.diffInMs * e.oldPriceTmp;
    })
  }

  reserve(item: any) {// confirm reservation or cancel
    const dialogRef = this.dialog.open(ConfirmReserveModalComponent);

    if (this.uid == "") {
      this.createReserveHistory();
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.check.reserveStatus = "Done";
        this.router.navigate(['/']);
        this.openSnackBar(`${item.price} dollars were deducted from your card`, 'OK');
      } else {
        this.check.reserveStatus = "Cancelled"
      }

      const postData = {
        status: this.check.reserveStatus
      }

      this.firebase.setDataByDocumentName("reserve-history", this.uid).update(postData);
    });
  }

  createReserveHistory() {//Create reserve history 
    const postData: HotelReserve = {
      uid: "",
      datetime: moment().format("YYYY-MM-DD HH:mm"),
      end_date: moment().add(1, "days").format("YYYY-MM-DD"),
      start_date: moment().format("YYYY-MM-DD"),
      hotel_id: this.hotelId,
      status: "Active",
      user_id: this.user.uid
    }

    this.uid = this.firebase.createBookHistory(postData)
  }

  getRoomsByHotelId() {// Get room by hotel id 
    this.activatedRoute.params.subscribe((params: any) => {
      this.hotelId = params['id'];
      this.http.getHotelById(this.hotelId).subscribe((res: any) => {
        this.currentHotelRooms = res;
        console.log(this.currentHotelRooms)
      })
    })
  }

  previousImage(item: any) {             // slide image
    item.imgIndex = item.imgIndex ? item.imgIndex : 0;

    if (item.imgIndex != 0) {
      item.imgIndex--;
    } else {
      item.imgIndex = item.images.length - 1
    }
  }

  nextImage(item: any) {             // slide image
    item.imgIndex = item.imgIndex ? item.imgIndex : 0;
    item.imgIndex++;

    if (item.imgIndex > (item.images.length - 1)) {
      item.imgIndex = 0;
    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
