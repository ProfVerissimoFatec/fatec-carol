import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { HttpService } from '../../services/http/http.service';
import { DialogErrorForgetComponent } from '../../Dialogs/dialog-error-forget/dialog-error-forget.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from '../../password-match.validator';
import { DialogErrorCodeComponent } from '../../Dialogs/dialog-error-code/dialog-error-code.component';
@Component({
  selector: 'app-forget-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './forget-login.component.html',
  styleUrl: './forget-login.component.scss',
})
export class ForgetLoginComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  threeFormGroup: FormGroup;
  isLinear = true;
  code: string[] = ['', '', '', '', '', ''];
  constructor(
    private _formBuilder: FormBuilder,
    private httpService: HttpService,
    private dialog: MatDialog
  ) {
    // Inicialização dos FormGroups no construtor
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', [Validators.required, Validators.email]], // Adiciona validação de email
    });
    this.secondFormGroup = this._formBuilder.group({
      code1: ['', [Validators.required, Validators.maxLength(1)]],
      code2: ['', [Validators.required, Validators.maxLength(1)]],
      code3: ['', [Validators.required, Validators.maxLength(1)]],
      code4: ['', [Validators.required, Validators.maxLength(1)]],
      code5: ['', [Validators.required, Validators.maxLength(1)]],
      code6: ['', [Validators.required, Validators.maxLength(1)]],
    });

    this.threeFormGroup = this._formBuilder.group(
      {
        senha: ['', [Validators.required]],
        confirmSenha: ['', Validators.required],
      },
      { validator: passwordMatchValidator }
    );
  }
  ngOnInit() {
    // Assegura que os FormGroups são inicializados, mas a inicialização já foi feita no construtor
  }

  onCheckEmail(stepper: MatStepper) {
    const email = this.firstFormGroup.value.firstCtrl;
    if (email) {
      this.httpService.checkEmail(email).subscribe(
        (response) => {
          if (response.exists) {
            console.log('Email existe');
            // Avança para o próximo passo manualmente
            stepper.next();
          } else {
            console.log('Email não existe');
            this.dialog.open(DialogErrorForgetComponent);
            const firstCtrl = this.firstFormGroup.get('firstCtrl');
            if (firstCtrl) {
              firstCtrl.setErrors({ invalidEmail: true });
            }
          }
        },
        (error) => {
          console.error('Erro ao verificar email', error);
        }
      );
    } else {
      console.error('Email inválido');
      const firstCtrl = this.firstFormGroup.get('firstCtrl');
      if (firstCtrl) {
        firstCtrl.setErrors({ invalidEmail: true });
      }
      this.dialog.open(DialogErrorForgetComponent);
    }
  }

  async onCheckCode(stepper: MatStepper) {
    const code = this.code.join('');
    console.log('Generated code:', code); // Adicione um log para verificar o código gerado
    try {
      const response: any = await this.httpService
        .codeVerifyForget(code)
        .toPromise();
      if (!response.erro) {
        console.log('Código correto');
        stepper.next();
      } else {
        console.log('Código incorreto');
        this.dialog.open(DialogErrorCodeComponent);
        if (this.secondFormGroup.controls) {
          this.secondFormGroup.setErrors({ invalidEmail: true });
        }
      }
    } catch (error) {
      console.error('Erro ao verificar código:', error);
    }
  }
  async alterarSenha() {
    const email = this.firstFormGroup.get('firstCtrl')?.value;
    const senha = this.threeFormGroup.get('senha')?.value;

    if (!email || !senha) {
      console.error('Email ou senha não fornecidos');
      return;
    }

    try {
      const response: any = await this.httpService
        .alterarSenha(email, senha)
        .toPromise();
      if (response.sucesso) {
        console.log('Senha alterada com sucesso');
        // Você pode adicionar qualquer lógica adicional aqui, como redirecionar ou mostrar uma mensagem
      } else {
        console.error('Erro ao alterar a senha:', response.mensagem);
        this.dialog.open(DialogErrorForgetComponent);
        if (this.threeFormGroup.controls) {
          this.threeFormGroup.setErrors({ invalidEmail: true });
        }
      }
    } catch (error) {
      console.error('Erro ao alterar a senha:', error);
      // Adicione lógica para tratar o erro
    }
  }
}
