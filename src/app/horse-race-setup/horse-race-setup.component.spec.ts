import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseRaceSetupComponent } from './horse-race-setup.component';

describe('HorseRaceSetupComponent', () => {
  let component: HorseRaceSetupComponent;
  let fixture: ComponentFixture<HorseRaceSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorseRaceSetupComponent]
    });
    fixture = TestBed.createComponent(HorseRaceSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
