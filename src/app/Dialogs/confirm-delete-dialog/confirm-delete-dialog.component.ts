import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [],
template:  `
<div class="card">
<h2 mat-dialog-title>Confirmar Exclusão</h2>
<div class="line"></div>
<div mat-dialog-content>
  <p>Tem certeza de que deseja deletar este anúncio?</p>
</div>
<div mat-dialog-actions class="actions">
  <!-- <button mat-button (click)="onCancel()" class="cancel">Cancelar</button> -->
  <button mat-button color="warn" (click)="onConfirm()" class="delet">Deletar</button>
</div>
</div>
`,
  styleUrl: './confirm-delete-dialog.component.scss'
})
export class ConfirmDeleteDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  // onCancel(): void {
  //   this.dialogRef.close(false);
  // }
}
