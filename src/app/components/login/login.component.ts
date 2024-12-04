import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogRegisterComponent } from '../dialog-register/dialog-register.component';
import { MatDialog } from '@angular/material/dialog';
import { ForgetLoginComponent } from '../forget-login/forget-login.component';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http/http.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogErrorLoginComponent } from '../../Dialogs/dialog-error-login/dialog-error-login.component';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  animations: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private apiService: ApiService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
    });
  }
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
  ngOnInit(): void {}
  updateErrorMessage() {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      this.errorMessage = 'Campo obrigatório*';
    } else if (emailControl?.hasError('email')) {
      this.errorMessage = 'Email não é valido*';
    } else {
      this.errorMessage = '';
    }
  }
  login() {
    const { email, senha } = this.loginForm.value;
    this.httpService.login(email, senha).subscribe(
      (response) => {
        if (!response.erro) {
          console.log('Login realizado com sucesso', response.user);
          this.apiService.storeUserData(response.token, response.user);
          if (response.user.tipo === true) {
            this.router.navigate(['/maiswork/announcement']); 
          } else {
            this.router.navigate(['/maiswork/dashboard']); 
          }
        } else {
          console.error('Credenciais inválidas');
          this.dialog.open(DialogErrorLoginComponent);
        }
      },
      (error) => {
        console.error('Erro ao realizar login', error);
        this.dialog.open(DialogErrorLoginComponent);
      }
    );
  }

  openDialogRegister() {
    this.dialog.open(DialogRegisterComponent, {});
  }
  openDialogForget() {
    this.dialog.open(ForgetLoginComponent, {});
  }

  openRegister() {
    this.openDialogRegister();
  }
  openForget() {
    this.openDialogForget();
  }
}
