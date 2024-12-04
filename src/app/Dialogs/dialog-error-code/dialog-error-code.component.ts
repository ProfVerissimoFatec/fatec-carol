import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-error-code',
  standalone: true,
  imports: [],
  template: `
    <div
      style="display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;"
    >
      <div class="divGif">
        <img
          src="../../../assets/img/gifs/atencao.gif"
          alt="image"
          class="img"
        />
      </div>
      <h1 mat-dialog-title>Erro ao enviar o código</h1>
      <div mat-dialog-content class="divP">
        <p style="font-weight: 600;">
          OOPS, parece que esse código não corresponde com o envidado do email!
        </p>
        <p>Por favor, verifique o código novamente.</p>
      </div>
      <div mat-dialog-actions class="btn">
        <button mat-button (click)="onClose()">OK</button>
      </div>
    </div>
  `,
  styleUrl: './dialog-error-code.component.scss',
})
export class DialogErrorCodeComponent {
  constructor(public dialogRef: MatDialogRef<DialogErrorCodeComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
