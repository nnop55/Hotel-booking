import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { InnerComponent } from './components/hotel/inner/inner.component';
import { MainComponent } from './components/hotel/main/main.component';
import { ReservationHistoryComponent } from './components/hotel/reservation-history/reservation-history.component';
import { ReserveHotelComponent } from './components/hotel/reserve-hotel/reserve-hotel.component';
import { ForgotPassComponent } from './components/sign-auth/forgot-pass/forgot-pass.component';
import { ProfileEditComponent } from './components/sign-auth/profile-edit/profile-edit.component';
import { ProfileComponent } from './components/sign-auth/profile/profile.component';
import { AuthGuard } from './guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: MainComponent, },
      { path: 'hotel-inner/:id', component: InnerComponent },
      { path: 'reserve/:id', component: ReserveHotelComponent, canActivate: [AuthGuard] },
      { path: 'reservation-history', component: ReservationHistoryComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'sign', children: [
      { path: 'forgot-pass', component: ForgotPassComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'profile-edit', component: ProfileEditComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'google-map', component: GoogleMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
