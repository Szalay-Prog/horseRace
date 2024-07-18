import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private racersSubject = new BehaviorSubject<any[]>([]);
  racers$ = this.racersSubject.asObservable();
  private raceInterval: any;
  private speedChangeInterval: any;
  private isPaused: boolean = false;
  private availableColors = [
    'red', 'blue', 'green', 'grey', 'orange', 'purple', 'brown', 'pink', 'cyan', 'magenta', 'black', 'gold'
  ];
  private finishLinePosition: number | undefined;
  private raceStartTime: number | undefined;

  getRacers() {
    return this.racersSubject.value;
  }

  startRace(numRacers: number, raceAreaHeight: number, raceAreaWidth: number) {
    const usedColors = new Set();
    const racers = [];
    const spacing = raceAreaHeight / numRacers; // Ensure spacing is correct for all racers
    for (let i = 0; i < numRacers; i++) {
      let color;
      do {
        color = this.getRandomColor();
      } while (usedColors.has(color));
      usedColors.add(color);
  
      racers.push({
        name: `Racer ${i + 1}`,
        color,
        position: 0,
        topPosition: (i * spacing), // Adjust top position to space evenly
        hasFinished: false,
        timer: 0,
        finishTime: null,
        speedFactor: 1
      });
    }
    this.finishLinePosition = raceAreaWidth - (raceAreaWidth * 0.05); // Finish line is 5% from the right edge
    this.racersSubject.next(racers);
    this.raceStartTime = Date.now();
    this.runRace();
    this.changeSpeedPeriodically();
  }
  

  private runRace() {
    this.clearRaceInterval(); // Clear any existing interval

    this.raceInterval = setInterval(() => {
      if (!this.isPaused) {
        let allFinished = true;
        const currentTime = Date.now();
        const racers = this.racersSubject.value.map(racer => {
          if (!racer.hasFinished) {
            racer.position += (Math.random() * 3) * racer.speedFactor;
            if (this.raceStartTime !== undefined) {
              racer.timer = currentTime - this.raceStartTime; // Update timer
            }
            if (this.finishLinePosition !== undefined && racer.position >= this.finishLinePosition) {
              racer.hasFinished = true;
              racer.finishTime = this.raceStartTime !== undefined ? currentTime - this.raceStartTime : null; // Record finish time
              console.log(`${racer.name} has finished!`);
            } else {
              allFinished = false; // At least one racer hasn't finished yet
            }
          }
          return { ...racer };
        });

        this.racersSubject.next(racers);

        if (allFinished) {
          this.clearRaceInterval();
          this.alertFinishOrder(racers);
        }
      }
    }, 100);
  }

  togglePauseResume() {
    this.isPaused = !this.isPaused;
  }

  private clearRaceInterval() {
    if (this.raceInterval) {
      clearInterval(this.raceInterval);
      this.raceInterval = null;
    }
  }

  private changeSpeedPeriodically() {
    this.clearSpeedChangeInterval(); // Clear any existing speed change interval

    this.speedChangeInterval = setInterval(() => {
      const racers = this.racersSubject.value.map(racer => {
        racer.speedFactor = Math.random() * 5; // Random speed factor between 0 and 2
        return { ...racer };
      });

      this.racersSubject.next(racers);
    }, 1000); // Change speed every second
  }

  private clearSpeedChangeInterval() {
    if (this.speedChangeInterval) {
      clearInterval(this.speedChangeInterval);
      this.speedChangeInterval = null;
    }
  }

  private getRandomColor() {
    const index = Math.floor(Math.random() * this.availableColors.length);
    return this.availableColors[index];
  }

  private alertFinishOrder(racers: any[]) {
    const order = racers.sort((a, b) => a.finishTime - b.finishTime) // Sort by finish time
               .map((racer, index) => `#${index + 1}: ${racer.name} (${(racer.finishTime / 1000).toFixed(3)}s)`)
               .join('\n');
    setTimeout(() => alert('The race is over! The order is:\n' + order), 500);
  }
}
