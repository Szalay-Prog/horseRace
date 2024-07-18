import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RacerComponent } from './components/racer/racer.component';
import { RaceAreaComponent } from './components/race-area/race-area.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FormsModule } from '@angular/forms';
import { RaceService } from './services/race/race.service';

@NgModule({
  declarations: [
    AppComponent,
    RacerComponent,
    RaceAreaComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
