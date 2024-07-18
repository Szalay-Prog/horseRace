import { Component, ViewChild } from '@angular/core';
import { RaceAreaComponent } from './components/race-area/race-area.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'horse-race-app';
  
  @ViewChild('raceArea') raceArea: RaceAreaComponent | undefined;

  startRace(numRacers: number) {
    if (this.raceArea) {
      this.raceArea.startRace(numRacers);
    }
  }
}
