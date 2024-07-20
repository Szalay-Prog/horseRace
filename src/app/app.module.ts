import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HorseRaceSetupComponent } from './horse-race-setup/horse-race-setup.component';
import { HorseRaceComponent } from './horse-race/horse-race.component';
import { HorseStateService } from './horse-state.service';
import { RaceResultsDialog } from './race-results-dialog/race-results-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HorseRaceSetupComponent,
    HorseRaceComponent,
    RaceResultsDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [HorseStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
