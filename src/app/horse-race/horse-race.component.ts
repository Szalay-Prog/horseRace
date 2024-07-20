import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HorseStateService } from '../horse-state.service';

import { RaceResultsDialog } from '../race-results-dialog/race-results-dialog.component';

@Component({
  selector: 'app-horse-race',
  templateUrl: './horse-race.component.html',
  styleUrls: ['./horse-race.component.scss']
})
export class HorseRaceComponent implements OnInit {
  horses: string[] = [];
  positions: number[] = [];
  times: number[] = [];
  finishStates: string[] = [];
  raceInterval: any;
  startTime: number = 0;
  raceStarted: boolean = false;
  racePaused: boolean = false;
  raceFinished: boolean = false;
  speedFactors: number[] = []; // Array to store speed factors for each horse

  constructor(
    private router: Router,
    private horseStateService: HorseStateService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.horses = this.horseStateService.getHorses();
    this.positions = Array(this.horses.length).fill(0);
    this.times = Array(this.horses.length).fill(0);
    this.finishStates = Array(this.horses.length).fill('');
    this.speedFactors = Array(this.horses.length).fill(1); // Initialize speed factors

    // Dynamically set the height of the race track
    const raceTrack = this.elRef.nativeElement.querySelector('.race-track');
    this.renderer.setStyle(raceTrack, 'height', `${this.horses.length * 51}px`);

    // Log to verify horses and positions
    console.log('Horses:', this.horses);
    console.log('Positions:', this.positions);
  }

  startRace() {
    if (this.raceInterval) {
      clearInterval(this.raceInterval);
    }

    this.raceStarted = true;
    this.raceFinished = false; // Reset the flag when the race starts
    this.racePaused = false; // Ensure race is not paused when starting
    this.startTime = Date.now();
    this.raceInterval = setInterval(() => {
      let allFinished = true;
      for (let i = 0; i < this.positions.length; i++) {
        if (this.positions[i] < 100) {
          this.speedFactors[i] = this.getSpeedFactor(); // Update speed factor
          this.positions[i] += Math.random() * this.speedFactors[i]; // Adjust increment value to make the race take longer
          this.times[i] = Date.now() - this.startTime;
          if (this.positions[i] >= 100) {
            this.positions[i] = 100;
            this.finishStates[i] = 'finished';
          }
          allFinished = false;
        }
      }

      // Log to verify positions update
      console.log('Updated Positions:', this.positions);

      if (allFinished) {
        clearInterval(this.raceInterval);
        this.assignMedals();
        this.openResultsDialog();
        this.raceFinished = true; // Set the flag when the race is finished
        this.raceStarted = false;
        console.log('Race finished!');
      }
    }, 100);
  }

  getSpeedFactor() {
    return Math.random() * 0.75;
  }

  pauseResumeRace() {
    if (this.racePaused) {
      // Resume the race
      this.racePaused = false;
      this.startTime = Date.now() - this.times[0]; // Adjust the start time
      this.startRace();
    } else {
      // Pause the race
      if (this.raceInterval) {
        clearInterval(this.raceInterval);
        this.racePaused = true;
      }
    }
  }

  assignMedals() {
    const results = this.horses.map((name, i) => ({
      name,
      time: this.times[i],
      index: i
    })).sort((a, b) => a.time - b.time);

    if (results[0]) this.finishStates[results[0].index] = 'gold';
    if (results[1]) this.finishStates[results[1].index] = 'silver';
    if (results[2]) this.finishStates[results[2].index] = 'bronze';

    for (let i = 3; i < results.length; i++) {
      this.finishStates[results[i].index] = 'shaded';
    }
  }

  openResultsDialog(): void {
    const results = this.horses.map((name, i) => ({
      name,
      time: this.times[i]
    })).sort((a, b) => a.time - b.time);

    const dialogRef = this.dialog.open(RaceResultsDialog, {
      width: '300px',
      data: { results }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  formatTime(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(3);
    return `${minutes}:${seconds.padStart(6, '0')}`;
  }

  setup() {
    this.router.navigate(['/setup']);
  }
}
