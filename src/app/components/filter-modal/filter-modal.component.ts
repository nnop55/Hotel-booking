import { Component, OnInit } from '@angular/core';
import { CheckVariablesService } from 'src/app/services/check-variables.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css']
})
export class FilterModalComponent implements OnInit {
  selectedFilters: any = new Object();

  priceRange: any = new Object();
  selectedPlace!: string;

  typeOfPlaceArray: any[] = [
    { name: 'Entire place', text: 'A place all to yourself' },
    { name: 'Shared room', text: 'A sleeping space and common areas that may be shared with others' },
    { name: 'Private room', text: 'Your own room in a home or a hotel, plus some shared common spaces' },
  ];

  bathroomsArray: any[] = [
    { name: 'ANY', clicked: true },
    { name: '1', clicked: false },
    { name: '2', clicked: false },
    { name: '3', clicked: false },
    { name: '4', clicked: false },
    { name: '5', clicked: false },
    { name: '6', clicked: false },
    { name: '7+', clicked: false }
  ];


  bedsArray: any[] = [
    { name: 'ANY', clicked: true },
    { name: '1', clicked: false },
    { name: '2', clicked: false },
    { name: '3', clicked: false },
    { name: '4', clicked: false },
    { name: '5', clicked: false },
    { name: '6', clicked: false },
    { name: '7+', clicked: false }
  ];

  propertyTypeArray: any[] = [
    { name: 'Home', icon: 'ri-home-5-line', clicked: false },
    { name: 'Villa', icon: 'ri-building-line', clicked: false }
  ];

  amenitiesForm: any[] = [
    {
      value: '',
    }
  ];

  hostLanguageArray: any[] = [
    { name: 'English', clicked: false },
    { name: 'Georgia', clicked: false },
    { name: 'Russia', clicked: false },
    { name: 'French', clicked: false },
    { name: 'German', clicked: false },
    { name: 'Italian', clicked: false },
    { name: 'Spanish', clicked: false },
    { name: 'Japanese', clicked: false },
    { name: 'Turkish', clicked: false },
  ]

  constructor(private http: HttpService,
    private check: CheckVariablesService) { }

  ngOnInit(): void {
  }

  addAmenitiesForm() {                            //Add amenities input
    this.amenitiesForm.push({
      value: '',
    });
  }

  removeAmenitiesForm(index: any) {                            //Remove amenities input
    this.amenitiesForm.splice(index, 1)
  }

  bathroomsClick(item: any) {                            //Select only one option
    this.bathroomsArray.forEach((item2: any) => {
      item2.clicked = false;
    })
    item.clicked = true;
  }

  bedsClick(item: any) {                            //Select only one option
    this.bedsArray.forEach((item2: any) => {
      item2.clicked = false;
    })
    item.clicked = true;
  }

  propertyTypeClick(item: any) {                            //Select only one option
    this.propertyTypeArray.forEach((item2: any) => {
      item2.clicked = false
    })
    item.clicked = true;
  }

  filterObj() {                                               //Get selected filter options
    //priceRange
    this.selectedFilters['priceFrom'] = this.priceRange['value_From'];
    this.selectedFilters['priceTo'] = this.priceRange['value_To'];


    //typeOfPlace
    this.selectedFilters['typeOfPlace'] = this.selectedFilters['typeOfPlace']
      == undefined ? '' : this.selectedFilters['typeOfPlace'];
    if (this.selectedFilters['typeOfPlace'] == '') {

      if (this.selectedPlace == undefined) {
        console.log('yleo')
      } else {
        this.selectedFilters['typeOfPlace'] += this.selectedPlace;

      }
    }
    this.selectedFilters['typeOfPlace'] = this.selectedFilters['typeOfPlace']
      == "" ? undefined : this.selectedFilters['typeOfPlace'];


    //bathrooms
    this.bathroomsArray.forEach((e: any) => {
      this.selectedFilters['bathrooms'] = this.selectedFilters['bathrooms']
        == undefined ? '' : this.selectedFilters['bathrooms'];

      if (this.selectedFilters['bathrooms'] == '') {
        this.selectedFilters['bathrooms'] += e.clicked == true ? e.name : '';
      }
    })
    this.selectedFilters['bathrooms'] = this.selectedFilters['bathrooms']
      == "" ? undefined : this.selectedFilters['bathrooms'];
    this.selectedFilters['bathrooms'] = this.selectedFilters['bathrooms']
      == 'ANY' ? undefined : this.selectedFilters['bathrooms'];


    //beds
    this.bedsArray.forEach((e: any) => {
      this.selectedFilters['beds'] = this.selectedFilters['beds']
        == undefined ? '' : this.selectedFilters['beds'];

      if (this.selectedFilters['beds'] == '') {
        this.selectedFilters['beds'] += e.clicked == true ? e.name : '';
      }
    })
    this.selectedFilters['beds'] = this.selectedFilters['beds']
      == "" ? undefined : this.selectedFilters['beds'];
    this.selectedFilters['beds'] = this.selectedFilters['beds']
      == 'ANY' ? undefined : this.selectedFilters['beds'];


    //propertyType
    this.propertyTypeArray.forEach((e: any) => {
      this.selectedFilters['propertyType'] = this.selectedFilters['propertyType']
        == undefined ? "" : this.selectedFilters['propertyType'];

      if (this.selectedFilters['propertyType'] == "") {
        this.selectedFilters['propertyType'] += e.clicked == true ? e.name : '';
      }
    })
    this.selectedFilters['propertyType'] = this.selectedFilters['propertyType']
      == "" ? undefined : this.selectedFilters['propertyType'];


    //amenities
    this.amenitiesForm.forEach((e: any) => {
      this.selectedFilters['amenities'] = this.selectedFilters['amenities']
        == undefined ? "" : this.selectedFilters['amenities'];

      if (this.selectedFilters['amenities'] == "") {
        this.selectedFilters['amenities'] += e.value != '' ? e.value : ''
      } else {
        this.selectedFilters['amenities'] += e.value != '' ? '&Amenities=' + e.value : '';
      }
    })
    this.selectedFilters['amenities'] = this.selectedFilters['amenities']
      == "" ? undefined : this.selectedFilters['amenities'];


    //hostLanguage
    this.hostLanguageArray.forEach((e: any) => {
      this.selectedFilters['hostLanguage'] = this.selectedFilters['hostLanguage']
        == undefined ? "" : this.selectedFilters['hostLanguage'];

      if (this.selectedFilters['hostLanguage'] == "") {
        this.selectedFilters['hostLanguage'] += e.clicked == true ? e.name : '';
      } else {
        this.selectedFilters['hostLanguage'] += e.clicked == true ? '&HostLanguages=' + e.name : '';
      }
    })
    this.selectedFilters['hostLanguage'] = this.selectedFilters['hostLanguage']
      == "" ? undefined : this.selectedFilters['hostLanguage'];

  }

  filterBtn() {                                       //Filter by selected option          
    if (parseInt(this.priceRange['value_From']) > parseInt(this.priceRange['value_To'])) {
      alert('Incorrect range!')
    } else {
      this.filterObj();

      this.http.filteredHotels = [];
      this.http.getFilteredHotels(this.selectedFilters).subscribe((res: any) => {
        this.http.filteredHotels = res;
        this.check.showAllHotelsBtn = true;
        console.log(this.http.filteredHotels)
      })
      console.log(this.selectedFilters)
    }

  }


}
