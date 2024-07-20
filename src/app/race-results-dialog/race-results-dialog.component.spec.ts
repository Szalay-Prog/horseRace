import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceResultsDialogComponent } from './race-results-dialog.component';

describe('RaceResultsDialogComponent', () => {
  let component: RaceResultsDialogComponent;
  let fixture: ComponentFixture<RaceResultsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaceResultsDialogComponent]
    });
    fixture = TestBed.createComponent(RaceResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
