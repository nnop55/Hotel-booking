import { Component, OnInit } from '@angular/core';
import { CheckVariablesService } from 'src/app/services/check-variables.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public http: HttpService,
    public check: CheckVariablesService) { }

  ngOnInit(): void {
    this.getAllHotels();
  }

  getAllHotels() {                                          //Get all hotels data
    this.check.showLoading = true;
    this.http.getHotelCards().subscribe((res: any) => {
      this.http.filteredHotels = res;
      this.check.showLoading = false;
      console.log(this.http.filteredHotels)
    })
  }

  showAllHotels() {                                          //Show all hotels if filtered
    this.getAllHotels();
    this.check.showAllHotelsBtn = false;
  }


}
