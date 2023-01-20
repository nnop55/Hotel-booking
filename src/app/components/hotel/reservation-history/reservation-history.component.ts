import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.css']
})
export class ReservationHistoryComponent implements OnInit {

  reservedHotelsData: any[] = [];
  user: any;

  constructor(private firebase: FirebaseService,
    private http: HttpService) { }

  ngOnInit(): void {
    this.checkUser();
  }

  checkUser() {                                   //Chek user data
    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user);
    if (this.user) {
      this.checkHistory();
    }
  }

  checkHistory() {                                   //Chek history data of user
    this.firebase.getDataByDocumentName('reserve-history').valueChanges().pipe(
      map((items: any) =>
        items.filter((item: any) => item.user_id == this.user.uid))
    ).subscribe((filteredData: any) => {
      filteredData.forEach((history: any) => {
        this.http.getHotelById(history.hotel_id).subscribe((hotel: any) => {
          const data = {
            startDate: history.start_date,
            endDate: history.end_date,
            status: history.status,
            hotelImg: hotel.mainImages[0],
            hotelName: hotel.name,
            hotelId: hotel.id
          }
          this.reservedHotelsData.push(data);
        })
      })
    })
  }

}
