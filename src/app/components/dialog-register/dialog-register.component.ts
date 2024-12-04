import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask, NgxMaskPipe } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { HttpService } from '../../services/http/http.service';
import { MatDialog } from '@angular/material/dialog';
import { passwordMatchValidator } from '../../password-match.validator';
import { DialogCodeEmailComponent } from '../../Dialogs/dialog-code-email/dialog-code-email.component';
import { DialogErrorTsComponent } from '../../Dialogs/dialog-error.ts/dialog-error.ts.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-register',
  templateUrl: './dialog-register.component.html',
  styleUrl: './dialog-register.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CommonModule,
    MatRadioModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [provideNgxMask()],
  animations: [],
})
export class DialogRegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    public dialog: MatDialog
  ) {
    this.registerForm = this.formBuilder.group(
      {
        nome: ['', [Validators.required, Validators.minLength(2)]],
        nickname: ['', [Validators.required, Validators.minLength(2)]],
        telefone: ['', [Validators.required]],
        selectedOption: ['', Validators.required],
        documento: [''],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]],
        confirmSenha: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator }
    );
  }

  ngOnInit(): void {}
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
  cadastrar() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      formData.tipo =
        this.registerForm.value.selectedOption === '1' ? true : false;
      this.httpService.register(formData).subscribe(
        (response) => {
          if (response.sucesso) {
            // this.router.navigate(['/']);
            const dialogRef = this.dialog.open(DialogCodeEmailComponent, {
              data: { code: response.codigoGerado },
            });
            dialogRef.afterClosed().subscribe();
          } else {
            console.log(response.mensagem);
            this.dialog.open(DialogErrorTsComponent);
          }
        },
        (error) => {
          console.error(error);
          this.dialog.open(DialogErrorTsComponent);
        }
      );
    } else {
      this.dialog.open(DialogErrorTsComponent);
    }
  }
}
