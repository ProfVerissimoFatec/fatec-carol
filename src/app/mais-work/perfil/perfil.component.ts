import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { HttpService } from '../../services/http/http.service';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { ConfirmDeleteDialogComponent } from '../../Dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { NgxMaskDirective, provideNgxMask, NgxMaskPipe } from 'ngx-mask';
import { Router } from '@angular/router';

interface Anuncio {
  id_anuncio: number;
    titulo_anuncio: string;
    descricao_anuncio: string;
    valor_anuncio: number;
    isLiked?: boolean;     
}
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ MatIconModule,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule, 
    MatMenu,
    NgxMaskDirective,
    NgxMaskPipe,
  MatMenuTrigger],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit{
  profileForm: FormGroup;
  profileImageFile: File | null = null; 
  backgroundImageFile: File | null = null; 
  backgroundImageUrl: string | null = null;   
  errorMessage: string = '';
  imageUrls: string[] = [];
  isEditVisible: boolean = false;
  isAnimating: boolean = false;
  profileImageUrl: string | null = null;
  isIconToggled: boolean = false;
  
  curtidosAnuncios: any[] = [];
  isTipoTrue: boolean = false;
  anunciosTitle: string = 'Meus Anúncios';
  anuncios: any[] = [];



fileInput!: HTMLInputElement; 

  ngOnInit(): void {

    const idPerfil = this.apiService.getUserIdPerfil();
    console.log("ID do Perfil:", idPerfil);

    // this.loadProfileData();
    // this.setAnunciosTitle();

    // this.isTipoTrue = this.apiService.getUserType();


    if (idPerfil) {
      this.loadProfileData();
      this.setAnunciosTitle();
      this.isTipoTrue = this.apiService.getUserType();



      if (this.isTipoTrue) {
          this.loadCurtidosAnuncios();
      } else {
          this.loadProfileAnuncios();
      }
  } else {
      console.error("ID do Perfil não encontrado.");
  }
  }

  constructor(private apiService: ApiService, 
    public dialog: MatDialog, 
    private snackBar: MatSnackBar,
    private httpService: HttpService,
    private formBuilder:FormBuilder,
    private router: Router
  ) {
    this.profileForm = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      descricao: ['', Validators.required],
      regiaoHabita: ['', Validators.required]
    });
  }


  setAnunciosTitle(): void {
    const tipo = this.apiService.getUserType();
    this.anunciosTitle = tipo ? 'Anúncios Curtidos' : 'Meus Anúncios';
  }

  loadProfileAnuncios(): void {
    const idPerfil = this.apiService.getUserIdPerfil();
    if (idPerfil) {
      this.httpService.getAnunciosByPerfil(parseInt(idPerfil, 10)).subscribe(
        (data) => {
          console.log('Anúncios do perfil carregados:', data);
          this.anuncios = data;
        },
        (error) => {
          console.error('Erro ao carregar anúncios do perfil:', error);
        }
      );
    } else {
      console.error('ID do perfil não encontrado.');
    }
  }

  loadCurtidosAnuncios(): void {
    const idPerfil = this.apiService.getUserIdPerfil();
    if (idPerfil) {
      this.httpService.getAnunciosCurtidos(parseInt(idPerfil, 10)).subscribe(
          (data) => {
              this.anuncios = data.map((anuncio: Anuncio) => ({
                  ...anuncio,
                  isLiked: true  // Marca como curtido ao carregar os anúncios curtidos
              }));
          },
          (error) => {
              console.error("Erro ao carregar anúncios curtidos:", error);
          }
      );
  } else {
      console.error("ID do perfil não encontrado.");
  }
  }

  deletarAnuncio(idAnuncio: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Se o usuário confirmou a exclusão
        this.httpService.deletarAnuncio(idAnuncio).subscribe(
          () => {
            this.anuncios = this.anuncios.filter(anuncio => anuncio.id_anuncio !== idAnuncio);
            console.log('Anúncio deletado com sucesso');
          },
          error => {
            console.error('Erro ao deletar anúncio:', error);
          }
        );
      }
    });
  }
  
  toggleCurtida(anuncio: any): void {
    anuncio.isLiked = !anuncio.isLiked;

    this.httpService.updateReaction(anuncio.id_anuncio, 'curtidas').subscribe(
        () => console.log(anuncio.isLiked ? 'Anúncio adicionado aos curtidos' : 'Anúncio removido dos curtidos'),
        error => console.error('Erro ao atualizar curtida', error)
    );

    window.location.reload();
}

addAnuncioCurtido(idAnuncio: number): void {
    this.httpService.updateReaction(idAnuncio, 'curtidas').subscribe(
        () => console.log('Anúncio adicionado aos curtidos'),
        error => console.error('Erro ao adicionar anúncio aos curtidos', error)
    );
}

removeAnuncioCurtido(idAnuncio: number): void {
    this.httpService.updateReaction(idAnuncio, 'curtidas').subscribe(
        () => console.log('Anúncio removido dos curtidos'),
        error => console.error('Erro ao remover anúncio dos curtidos', error)
    );
}
  edit() {
    this.isAnimating = true;
    this.isEditVisible = true; // Mostra a div
    document.querySelector('.edit')?.classList.add('show');
  }

  hideEdit(): void {
    this.isAnimating = false;
    setTimeout(() => {
      this.isEditVisible = false;
      document.querySelector('.edit')?.classList.remove('show');
    }, 500);
  }

  loadProfileData(): void {
    this.apiService.getUserProfileData().subscribe((data: any) => {
      if (data) {
        this.profileForm.patchValue({
          nome: data.nome,               // Nome da tabela login
          telefone: data.telefone,       // Telefone da tabela login
          descricao: data.descricao,     // Descrição da tabela perfil
          regiaoHabita: data.regiaohabita // Região da tabela perfil
        });
  
        // Exibir a imagem de perfil, se existir
        if (data.imagemperfil) {
          const base64String = data.imagemperfil;
          this.profileImageUrl = `data:image/jpeg;base64,${base64String}`;
        }
  
        // Exibir a imagem de fundo, se existir
        if (data.imagemfundo) {
          const base64String = data.imagemfundo;
          this.backgroundImageUrl = `data:image/jpeg;base64,${base64String}`;
        }
      }
    }, error => {
      console.error('Erro ao carregar dados do perfil:', error);
      this.errorMessage = 'Erro ao carregar dados do perfil.';
    });
  }
  
  // Método auxiliar para converter ArrayBuffer em base64 (para exibição da imagem)
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  
  onProfileImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.profileImageFile = file; // Armazena o arquivo da imagem de perfil
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.profileImageUrl = e.target.result; // Armazena a URL da imagem
      };

      reader.onerror = (e) => {
        console.error("Erro ao carregar a imagem de perfil", e);
        this.errorMessage = 'Erro ao carregar a imagem de perfil';
      };

      reader.readAsDataURL(file);
    }
  }
  onBackgroundImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.backgroundImageFile = file; // Armazena o arquivo da imagem de fundo
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.backgroundImageUrl = e.target.result; // Armazena a URL da imagem de fundo
      };

      reader.onerror = (e) => {
        console.error("Erro ao carregar a imagem de fundo", e);
        this.errorMessage = 'Erro ao carregar a imagem de fundo';
      };

      reader.readAsDataURL(file);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement; // Type assertion for input
    this.fileInput = input; // Assign to declared property
    if (input.files) {
      const files = Array.from(input.files);

      if (files.length > 3) {
        this.errorMessage = 'Você pode selecionar no máximo 3 imagens.';
        input.value = ''; // Limpa o input
      } else {
        this.errorMessage = '';
        this.imageUrls = []; // Limpa as URLs anteriores
        files.forEach(file => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageUrls.push(e.target.result);
          };
          reader.readAsDataURL(file);
        });
      }
    }
  }

  removeImage(index: number): void {
    this.imageUrls.splice(index, 1);

    if (this.fileInput && this.fileInput.files) {
      const dt = new DataTransfer();
      Array.from(this.fileInput.files).forEach((file, i) => {
        if (i !== index) {
          dt.items.add(file);
        }
      });
      this.fileInput.files = dt.files;
    }
  }

  removeProfileImage(): void {
    this.profileImageUrl = null;
    this.profileImageFile = null;
    this.fileInput.value = ''; // Limpa o input de arquivos
  }

  removeBackgroundImage(): void {
    this.backgroundImageUrl = null;
    this.backgroundImageFile = null;
    this.fileInput.value = ''; // Limpa o input de arquivos
  }

  saveChanges(): void {
    if (this.profileForm.valid) {
      const formData = new FormData();
  
  
      formData.append('descricao', this.profileForm.get('descricao')?.value);
      formData.append('regiaoHabita', this.profileForm.get('regiaoHabita')?.value);
      formData.append('telefone', this.profileForm.get('telefone')?.value);
  
  
      if (this.profileImageFile) {
        formData.append('profileImage', this.profileImageFile);
      }
      if (this.backgroundImageFile) {
        formData.append('backgroundImage', this.backgroundImageFile);
      }
  
     
      this.httpService.updateUserProfile(formData).subscribe(
        (response) => {
          console.log('Perfil atualizado com sucesso!', response);
          this.snackBar.open('Perfil atualizado com sucesso!', 'Fechar', { duration: 3000 })
          .afterDismissed()
          .subscribe(() => {
            window.location.reload(); // Recarrega a página após o snackBar ser fechado
          });
        
        this.isEditVisible = false;
        },
        (error) => {
          console.error('Erro ao atualizar o perfil:', error);
          this.errorMessage = 'Erro ao atualizar o perfil.';
        }
      );
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
    }
  }

  resetIcon(): void {
    this.isIconToggled = false; // Reseta o estado do ícone para a imagem original
  }
  toggleIcon(): void {
    this.isIconToggled = !this.isIconToggled;  // Alterna o estado do ícone
  }
}
