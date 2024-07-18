import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-racer',
  templateUrl: './racer.component.html',
  styleUrls: ['./racer.component.scss']
})
export class RacerComponent {
  @Input() racer: any;

  getColorFilter(color: string): string {
    // Convert the color to a filter string (this example assumes the color is in hex format)
    return this.hexToFilter(color);
  }

  hexToFilter(hex: string): string {
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // Convert RGB to CSS filter
    return `invert(100%) sepia(100%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)
            drop-shadow(0 0 0 rgb(${r},${g},${b}))`;
  }
}
