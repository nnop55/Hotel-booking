import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { CardComponent } from './components/hotel/card/card.component';
import { MainComponent } from './components/hotel/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { InnerComponent } from './components/hotel/inner/inner.component';
import { FilterBarComponent } from './components/header/filter-bar/filter-bar.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SignInComponent } from './components/sign-auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-auth/sign-up/sign-up.component';
import { ForgotPassComponent } from './components/sign-auth/forgot-pass/forgot-pass.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { AgmCoreModule } from '@agm/core';
import { ProfileComponent } from './components/sign-auth/profile/profile.component';
import { ProfileEditComponent } from './components/sign-auth/profile-edit/profile-edit.component';
import { ReserveHotelComponent } from './components/hotel/reserve-hotel/reserve-hotel.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { FirebaseService } from './services/firebase.service';
import { ContinueReservationModalComponent } from './components/continue-reservation-modal/continue-reservation-modal.component';
import { ConfirmReserveModalComponent } from './components/confirm-reserve-modal/confirm-reserve-modal.component';
import { ReservationHistoryComponent } from './components/hotel/reservation-history/reservation-history.component';



const materialModules = [
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatInputModule,
  MatRadioModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatDividerModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
];

const firebaseModules = [
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule,
  AngularFirestoreModule,
  AngularFireStorageModule,
  AngularFireDatabaseModule,
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CardComponent,
    MainComponent,
    InnerComponent,
    FilterBarComponent,
    LoadingComponent,
    FilterModalComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPassComponent,
    GoogleMapComponent,
    ProfileComponent,
    ProfileEditComponent,
    ReserveHotelComponent,
    ContinueReservationModalComponent,
    ConfirmReserveModalComponent,
    ReservationHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    materialModules,
    HttpClientModule,
    FormsModule,
    firebaseModules,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
    })
  ],
  providers: [AuthGuard, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
