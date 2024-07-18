import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceAreaComponent } from './race-area.component';

describe('RaceAreaComponent', () => {
  let component: RaceAreaComponent;
  let fixture: ComponentFixture<RaceAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaceAreaComponent]
    });
    fixture = TestBed.createComponent(RaceAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
