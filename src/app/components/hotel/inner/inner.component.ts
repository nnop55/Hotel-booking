import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-inner',
  templateUrl: './inner.component.html',
  styleUrls: ['./inner.component.css']
})
export class InnerComponent implements OnInit {

  currentHotel: any;

  constructor(private http: HttpService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCurrentHotelId();
  }

  getCurrentHotel(id: string) {                                     //Get selected hotel info
    this.http.getHotelById(id).subscribe((res: any) => {
      this.currentHotel = res;
      console.log(this.currentHotel)
    })
  }

  getCurrentHotelId() {                                     //Get hotel id which is selected
    this.activatedRoute.params.subscribe((params: any) => {
      let id = params['id'];
      this.getCurrentHotel(id);
    })
  }

  previousImage(item: any) {                               //Slide image
    item.imgIndex = item.imgIndex ? item.imgIndex : 0;

    if (item.imgIndex != 0) {
      item.imgIndex--;
    } else {
      item.imgIndex = item.images.length - 1
    }
  }

  nextImage(item: any) {                               //Slide image
    item.imgIndex = item.imgIndex ? item.imgIndex : 0;
    item.imgIndex++;

    if (item.imgIndex > (item.images.length - 1)) {
      item.imgIndex = 0;
    }

  }
}