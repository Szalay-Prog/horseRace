import { Component, Output, EventEmitter } from '@angular/core';
import { RaceService } from 'src/app/services/race/race.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  numRacers: number = 1;

  @Output() raceStarted = new EventEmitter<number>();

  constructor(private raceService: RaceService) { }

  startRace() {
    console.log('SettingsComponent startRace called');
    this.raceStarted.emit(this.numRacers);
  }

  togglePauseResume() {
    this.raceService.togglePauseResume();
  }
}
