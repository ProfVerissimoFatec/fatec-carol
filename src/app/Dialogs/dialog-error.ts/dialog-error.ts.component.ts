import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-error.ts',
  standalone: true,
  imports: [],
  template: `
    <div class="divGif">
      <img src="../../../assets/img/gifs/triste.gif" alt="image" class="img" />
    </div>
    <h1 mat-dialog-title>Ocorreu um problema ao realizar o cadastro</h1>
    <div mat-dialog-content class="divP">
      <p>
        Por favor, verifique se todas as informações fornecidas estão corretas.
      </p>
    </div>
    <div mat-dialog-actions class="btn">
      <button mat-button (click)="onClose()">OK</button>
    </div>
  `,

  styleUrl: './dialog-error.ts.component.scss',
})
export class DialogErrorTsComponent {
  constructor(public dialogRef: MatDialogRef<DialogErrorTsComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
