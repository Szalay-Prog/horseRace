import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HorseStateService {
  private horses: string[] = [];

  setHorses(horses: string[]) {
    this.horses = horses;
  }

  getHorses(): string[] {
    return this.horses;
  }
}
