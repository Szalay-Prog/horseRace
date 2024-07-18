import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { RaceService } from 'src/app/services/race/race.service';

@Component({
  selector: 'app-race-area',
  templateUrl: './race-area.component.html',
  styleUrls: ['./race-area.component.scss']
})
export class RaceAreaComponent implements OnInit {
  racers$: Observable<any[]>;
  @ViewChild('raceArea', { static: true })
  raceArea!: ElementRef;

  constructor(private raceService: RaceService) { 
    this.racers$ = this.raceService.racers$;
  }

  ngOnInit(): void {
    this.adjustRaceArea();
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustRaceArea();
  }

  startRace(numRacers: number): void {
    const raceAreaElement = this.raceArea.nativeElement;
    const raceAreaHeight = raceAreaElement.clientHeight;
    const raceAreaWidth = raceAreaElement.clientWidth;
    this.raceService.startRace(numRacers, raceAreaHeight, raceAreaWidth);
  }

  private adjustRaceArea() {
    const raceAreaElement = this.raceArea.nativeElement;
    const raceAreaHeight = raceAreaElement.clientHeight;
    const raceAreaWidth = raceAreaElement.clientWidth;
  }
}
