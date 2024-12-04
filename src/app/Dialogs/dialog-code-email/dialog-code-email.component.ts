import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpService } from '../../services/http/http.service';
import { DialogSuccessfulComponent } from '../dialog-successful/dialog-successful.component';
import { DialogErrorCodeComponent } from '../dialog-error-code/dialog-error-code.component';
@Component({
  selector: 'app-dialog-code-email',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dialog-code-email.component.html',
  styleUrl: './dialog-code-email.component.scss',
})
export class DialogCodeEmailComponent {
  code: string[] = ['', '', '', '', '', ''];

  constructor(
    private httpService: HttpService,
    private dialogRef: MatDialogRef<DialogCodeEmailComponent>,
    public dialog: MatDialog
  ) {}

  async onClose() {
    const verificationCode = this.code.join('');
    try {
      const response: any = await this.httpService
        .codeVerify(verificationCode)
        .toPromise();
      if (!response.erro) {
        console.log('Código correto');
        this.dialog.open(DialogSuccessfulComponent);
        this.dialogRef.close();
      } else {
        this.dialog.open(DialogErrorCodeComponent);
        console.log('Código incorreto');
      }
    } catch (error) {
      console.error('Erro ao verificar código:', error);
    }
  }
}
