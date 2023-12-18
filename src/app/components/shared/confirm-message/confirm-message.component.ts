import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-message',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-message.component.html',
  styleUrl: './confirm-message.component.css',
})
export class ConfirmMessageComponent {
  message: string;
  btn = 'accept';
  constructor(
    public dialogRef: MatDialogRef<ConfirmMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data.message;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
