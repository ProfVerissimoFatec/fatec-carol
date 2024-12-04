import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-error-login',
  standalone: true,
  imports: [],
  template: `
    <div class="conteiner">
      <div class="divGif">
        <img
          src="../../../assets/img/gifs/triste.gif"
          alt="image"
          class="img"
        />
      </div>
      <h1 mat-dialog-title>Ocorreu um problema ao realizar o Login</h1>
      <div mat-dialog-content class="divP">
        <p>
          Por favor, verifique se todas as informações fornecidas estão
          corretas.
        </p>
        <p>Caso não possua um cadastro, sugerimos que crie um novo.</p>
      </div>
      <div mat-dialog-actions class="btn">
        <button mat-button (click)="onClose()">OK</button>
      </div>
    </div>
  `,
  styleUrl: './dialog-error-login.component.scss',
})
export class DialogErrorLoginComponent {
  constructor(public dialogRef: MatDialogRef<DialogErrorLoginComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
