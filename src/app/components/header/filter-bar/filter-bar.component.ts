import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckVariablesService } from 'src/app/services/check-variables.service';
import { HttpService } from 'src/app/services/http.service';
import { FilterModalComponent } from '../../filter-modal/filter-modal.component';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  @ViewChild('widgetsContent') widgetsContent: ElementRef<any> | any;


  categoriesData: any[] = [];

  constructor(private http: HttpService,
    public dialog: MatDialog,
    private check: CheckVariablesService) { }

  ngOnInit(): void {
    this.getCategoriesData();
  }

  getCategoriesData() {                                         //Get filter categories data
    this.http.getCategories().subscribe((res: any) => {
      this.categoriesData = res;
      console.log(this.categoriesData)
    })
  }

  scrollRight(): void {                                          // slide right
    this.widgetsContent.nativeElement.scrollTo(
      { left: (this.widgetsContent.nativeElement.scrollLeft + 300), behavior: 'smooth' });
  }

  scrollLeft(): void {                                           //slide left
    this.widgetsContent.nativeElement.scrollTo(
      { left: (this.widgetsContent.nativeElement.scrollLeft - 300), behavior: 'smooth' });
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(FilterModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getByCategoryData(id: string) {                              // Filter by category which is clicked
    this.http.getFilteredHotels({ id: id }).subscribe((res: any) => {
      this.http.filteredHotels = res;
      this.check.showAllHotelsBtn = true;
      console.log(this.http.filteredHotels);
    })
  }


}
