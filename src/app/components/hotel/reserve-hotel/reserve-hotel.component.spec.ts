import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveHotelComponent } from './reserve-hotel.component';

describe('ReserveHotelComponent', () => {
  let component: ReserveHotelComponent;
  let fixture: ComponentFixture<ReserveHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
