import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HorseStateService } from '../horse-state.service';

@Component({
  selector: 'app-horse-race-setup',
  templateUrl: './horse-race-setup.component.html',
  styleUrls: ['./horse-race-setup.component.scss']
})
export class HorseRaceSetupComponent {
  form: FormGroup;
  horses: number[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private horseStateService: HorseStateService
  ) {
    this.form = this.fb.group({
      numberOfHorses: new FormControl(5)
    });
  }

  ngOnInit() {
    this.form.get('numberOfHorses')?.valueChanges.subscribe(value => {
      this.horses = Array.from({ length: value }, (_, i) => i);
      this.horses.forEach((_, i) => {
        if (!this.form.get(`horse${i}`)) {
          this.form.addControl(`horse${i}`, new FormControl(`Horse ${i + 1}`));
        }
      });
    });

    this.form.patchValue({ numberOfHorses: 5 });
  }

  onSubmit() {
    if (this.form.valid) {
      const horseNames = this.horses.map(i => this.form.get(`horse${i}`)?.value);
      console.log('Navigating to race with horses:', horseNames); // Log to verify
      this.horseStateService.setHorses(horseNames);
      this.router.navigate(['/race']);
    }
  }
}
