import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueReservationModalComponent } from './continue-reservation-modal.component';

describe('ContinueReservationModalComponent', () => {
  let component: ContinueReservationModalComponent;
  let fixture: ComponentFixture<ContinueReservationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinueReservationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinueReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
