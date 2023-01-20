import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckVariablesService {

  showCategories: boolean = true;
  showLoading: boolean = true;
  showAllHotelsBtn: boolean = false;

  reserveStatus: string = 'Active';

  constructor() { }
}
