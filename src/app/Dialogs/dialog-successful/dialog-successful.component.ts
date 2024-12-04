import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dialog-successful',
  standalone: true,
  imports: [],
  template: `
    <div class="divGif">
      <img src="../../../assets/img/gifs/feliz.gif" alt="image" class="img" />
    </div>
    <h1 mat-dialog-title>Sucesso na verificação !!</h1>
    <div mat-dialog-content class="divP">
      <p style="font-size: 21px;font-weight: 600;">
        Sua autenticação foi um sucesso
      </p>
      <p>Por favor, realize o login novamente</p>
    </div>
    <div mat-dialog-actions class="btn">
      <button mat-button (click)="onClose()">OK</button>
    </div>
  `,
  styleUrl: './dialog-successful.component.scss',
})
export class DialogSuccessfulComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogSuccessfulComponent>,
    private router: Router // Injete o Router aqui
  ) {}
  onClose(): void {
    this.dialogRef.close();
    window.location.reload(); // Força a recarga da página
  }
}
