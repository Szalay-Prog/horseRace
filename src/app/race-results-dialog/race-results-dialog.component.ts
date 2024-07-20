import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'race-results-dialog',
  templateUrl: 'race-results-dialog.component.html',
})
export class RaceResultsDialog {
  constructor(
    public dialogRef: MatDialogRef<RaceResultsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { results: { name: string, time: number }[] }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
