import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-error-forget',
  standalone: true,
  imports: [],
  template: `
    <div class="divGif">
      <img src="../../../assets/img/gifs/atencao.gif" alt="image" class="img" />
    </div>
    <h1 mat-dialog-title>Erro ao enviar o Email</h1>
    <div mat-dialog-content class="divP">
      <p>OOPS, parece que esse email não está cadastrado!</p>
    </div>
    <div mat-dialog-actions class="btn">
      <button mat-button (click)="onClose()">OK</button>
    </div>
  `,
  styleUrl: './dialog-error-forget.component.scss',
})
export class DialogErrorForgetComponent {
  constructor(public dialogRef: MatDialogRef<DialogErrorForgetComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
