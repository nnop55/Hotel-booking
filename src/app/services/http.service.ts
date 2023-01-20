import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  filteredHotels: any[] = [];

  private hotelCardApi: string = 'http://airbnb-dev.us-east-1.elasticbeanstalk.com/api/Hotel';
  private categoryApi: string = 'http://airbnb-dev.us-east-1.elasticbeanstalk.com/api/Category';

  constructor(private http: HttpClient) { }

  public getHotelCards(): Observable<any> {
    return this.http.get(this.hotelCardApi)
  }

  public getHotelById(id: string): Observable<any> {
    return this.http.get(`${this.hotelCardApi}/${id}`)
  }

  public getCategories(): Observable<any> {
    return this.http.get(this.categoryApi)
  }

  public getFilteredHotels(params: any) {
    let reqUrl = `${this.hotelCardApi}/filter-by-category?`;

    let check = reqUrl.split('?');
    if (params['id'] != undefined) {
      reqUrl += check[1] == '' ? '' : '&';
      reqUrl += 'Id=' + params['id']
    }

    check = reqUrl.split('?');
    if (params['priceFrom'] != undefined) {
      reqUrl += check[1] == '' ? '' : '&';
      reqUrl += 'PriceFrom=' + params['priceFrom'];
    }

    check = reqUrl.split('?');
    if (params['priceTo'] != undefined) {
      reqUrl += check[1] == '' ? '' : '&';
      reqUrl += 'PriceTo=' + params['priceTo'];
    }

    check = reqUrl.split('?');
    if (params['typeOfPlace'] != undefined) {
      reqUrl += check[1] == '' ? '' : '&';
      reqUrl += 'TypeOfPlace=' + params['typeOfPlace'];
    }

    check = reqUrl.split('?');
    if (params['beds'] != undefined) {
      reqUrl += check[1] == '' ? '' : '&';
      reqUrl += 'BedsPerRoomCount=' + params['beds'];
    }

    check = reqUrl.split('?');
    if (params['bathrooms'] != undefined) {
      reqUrl += check[1] == '' ? '' : '&';
      reqUrl += 'BathRoomsCount=' + params['bathrooms'];
    }

    check = reqUrl.split('?');
    if (params['propertyType'] != undefined) {
      reqUrl += check[1] == '' ? '' : '&';
      reqUrl += 'PropertyType=' + params['propertyType'];
    }

    check = reqUrl.split('?');
    if (params['amenities'] != undefined) {
      reqUrl += check[1] == '' ? '' : '&';
      reqUrl += 'Amenities=' + params['amenities'];
    }

    check = reqUrl.split('?');
    if (params['hostLanguage'] != undefined) {
      reqUrl += check[1] == '' ? '' : '&';
      reqUrl += 'HostLanguages=' + params['hostLanguage'];
    }

    return this.http.get(reqUrl)

  }
}
