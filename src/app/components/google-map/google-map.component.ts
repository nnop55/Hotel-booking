import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  currentLatLong: any[] = [];

  lat = 41.7151;
  long = 40.8271;
  zoom = 4;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getLatLong();
  }

  getLatLong() {                                          //Get lat and long of hotels
    this.http.getHotelCards().subscribe((res: any) => {
      this.currentLatLong = res;
      console.log(this.currentLatLong)
    })
  }

}
