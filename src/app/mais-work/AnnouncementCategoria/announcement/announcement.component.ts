import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogCategoriaAnuncioComponent } from '../dialog-categoria-anuncio/dialog-categoria-anuncio.component';
import { HttpService } from '../../../services/http/http.service';
import { Router } from '@angular/router';

interface Anuncio {
  id_anuncio: number;
  titulo_anuncio: string;
  descricao_anuncio: string;
  valor_anuncio: number;
  curtidas: number[];       // Alterado para refletir um array de números
  likes: number[];
  deslikes: number[];
  curtidas_count: number;    // Número para armazenar a contagem de curtidas
  likes_count: number;
  deslikes_count: number;
}
@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss',
})
export class AnnouncementComponent implements OnInit {
  fileInput: HTMLInputElement | undefined;
  categorias: any[] = [];
  errorMessage: string = '';
  imageUrls: string[] = [];
  isEditVisible: boolean = false;
  isAnimating: boolean = false;
  userName: string | null = '';
  anuncios: any[] = [];
  categoriaSelecionada: any = null;
  anunciosOriginais: any[] = [];

  isTipoTrue: boolean = false;

  currentUserId: string = '';



  constructor(
    public apiService: ApiService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.userName = this.apiService.getUserName();
    this.announcement = this.formBuilder.group({
      tituloAnuncio: ['', [Validators.required]],
      descricaoAnuncio: ['', [Validators.required]],
      valorAnuncio: ['', [Validators.required]],
    });
  }
  imagesToUpload: File[] = [];
  announcement: FormGroup;
  selectedCategorias: any[] = [];

  clickedCurtidas: { [key: number]: boolean } = {};
  clickedLikes: { [key: number]: boolean } = {};
  clickedDeslikes: { [key: number]: boolean } = {};

  ngOnInit(): void {

    this.currentUserId = this.apiService.getUserIdPerfil() || '';
    this.getCategorias();
    this.loadAnuncios();


    this.isTipoTrue = this.apiService.getUserType();

    this.anuncios = this.anuncios.map(anuncio => ({
      ...anuncio,
      curtidas: anuncio.curtidas ? JSON.parse(anuncio.curtidas).length : 0,
      likes: anuncio.likes ? JSON.parse(anuncio.likes).length : 0,
      deslikes: anuncio.deslikes ? JSON.parse(anuncio.deslikes).length : 0
    }));
    console.log("this.anuncios", this.anuncios);
  }
  getHave(anuncio: any, type: number) {
    switch (type) {
      case 1:
        if (anuncio.curtidas && anuncio.curtidas.curtidas.length != 0)
          return anuncio.curtidas.curtidas.find((e: number | null) => e === this.apiService.getUserIdPerfil()) == null
        else return false
        break;
      case 2:
        if (anuncio.likes && anuncio.likes.likes.length != 0)
          return anuncio.likes.likes.find((e: number | null) => e === this.apiService.getUserIdPerfil()) == null
        else return false
        break;
      case 3:
        if (anuncio.deslikes && anuncio.deslikes.deslikes.length != 0)
          return anuncio.deslikes.deslikes.find((e: number | null) => e === this.apiService.getUserIdPerfil()) == null
        else return false
        break;
    }
    return false
  }

  updateReaction(idAnuncio: number, type: 'curtidas' | 'likes' | 'deslikes') {
    this.httpService.updateReaction(idAnuncio, type).subscribe(() => {
      // Alterna o estado de clique de acordo com o tipo
      if (type === 'curtidas') {
        this.clickedCurtidas[idAnuncio] = !this.clickedCurtidas[idAnuncio];
      } else if (type === 'likes') {
        this.clickedLikes[idAnuncio] = !this.clickedLikes[idAnuncio];
      } else if (type === 'deslikes') {
        this.clickedDeslikes[idAnuncio] = !this.clickedDeslikes[idAnuncio];
      }

      this.loadAnuncios();
    },
      (error) => {
        console.error(`Erro ao atualizar ${type}:`, error);
      });
  }

  loadAnuncios(): void {
    this.httpService.getAnuncios().subscribe(
      (data: Anuncio[]) => {
        console.log("Dados recebidos do back-end:", data);

        this.anuncios = data.map((anuncio: Anuncio) => ({
          ...anuncio,
          // curtidas: Array.isArray(anuncio.curtidas) ? anuncio.curtidas : [],
          // likes: Array.isArray(anuncio.likes) ? anuncio.likes : [],
          // deslikes: Array.isArray(anuncio.deslikes) ? anuncio.deslikes : [],
          curtidas_count: anuncio.curtidas_count || 0,
          likes_count: anuncio.likes_count || 0,
          deslikes_count: anuncio.deslikes_count || 0,
        }));

        // Inicializa os estados de clique com base nos dados do backend
        this.clickedCurtidas = {};
        this.clickedLikes = {};
        this.clickedDeslikes = {};

        this.anunciosOriginais = [...data];

        this.anuncios.forEach((anuncio) => {
          this.clickedCurtidas[anuncio.id_anuncio] = anuncio.user_has_curtido;
          this.clickedLikes[anuncio.id_anuncio] = anuncio.user_has_liked;
          this.clickedDeslikes[anuncio.id_anuncio] = anuncio.user_has_disliked;
        });

        console.log("Estados de clique inicializados:", {
          curtidas: this.clickedCurtidas,
          likes: this.clickedLikes,
          deslikes: this.clickedDeslikes,
        });
      },
      (error) => {
        console.error('Erro ao carregar anúncios', error);
      }
    );
  }

  buscarAnuncio(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.anuncios = this.anunciosOriginais.filter(anuncio =>
      anuncio.titulo_anuncio.toLowerCase().includes(input)
    );
  }

  limparFiltro() {
    this.categoriaSelecionada = null;
    this.anuncios = [...this.anunciosOriginais];
  }

  filtrarPorCategoria(categoria: any) {
    this.categoriaSelecionada = categoria;
    const anunciosFiltrados = this.anunciosOriginais.filter(anuncio => {
        return anuncio.categorias.some((cat: any) => cat.nome_categoria === this.categoriaSelecionada.nome_categoria);
    });
  
    console.log("Anúncios Originais:", this.anunciosOriginais);
    console.log("Categoria Selecionada:", this.categoriaSelecionada);
    console.log("Anúncios Filtrados:", anunciosFiltrados);
  
    this.anuncios = anunciosFiltrados;
  }

  getCategorias(): void {
    this.httpService.getCategorias().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Erro ao carregar categorias', error);
      }
    );
  }

  newPost() {
    this.isAnimating = true;
    this.isEditVisible = true;
    document.querySelector('.edit')?.classList.add('show');
  }

  hideEdit(): void {
    this.isAnimating = false;
    setTimeout(() => {
      this.isEditVisible = false;
      document.querySelector('.edit')?.classList.remove('show');
    }, 500);
  }
  openCategoria() {
    this.dialog.open(DialogCategoriaAnuncioComponent, {});
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fileInput = input;
    if (input.files) {
      const files = Array.from(input.files);

      if (files.length > 3) {
        this.errorMessage = 'Você pode selecionar no máximo 3 imagens.';
        input.value = '';
      } else {
        this.errorMessage = '';
        this.imageUrls = [];
        this.imagesToUpload = [];

        files.forEach(file => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageUrls.push(e.target.result);
          };
          reader.readAsDataURL(file);

          this.imagesToUpload.push(file);
        });
      }
    }
  }

  removeImage(index: number): void {
    this.imageUrls.splice(index, 1);

    if (this.fileInput && this.fileInput.files) {
      const dt = new DataTransfer();

      Array.from(this.fileInput.files)
        .forEach((file, i) => {
          if (i !== index) {
            dt.items.add(file);
          }
        });

      this.fileInput.files = dt.files;
    }
  }
  toggleCategoria(categoria: any): void {
    const index = this.selectedCategorias.findIndex(c => c.id_categoria === categoria.id_categoria);
    if (index > -1) {
      this.selectedCategorias.splice(index, 1);
    } else {
      this.selectedCategorias.push(categoria);
    }
  }

  abrirWhatsapp(telefone: string | undefined): void {
    if (!telefone) {
        console.error("Telefone não disponível para esse anúncio.");
        return;
    }
    // Remove caracteres não numéricos e cria o link
    const telefoneFormatado = telefone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${telefoneFormatado}`;
    window.open(whatsappUrl, '_blank');
}

  createAnuncio() {
    const formData = new FormData();
    formData.append('tituloAnuncio', this.announcement.get('tituloAnuncio')?.value);
    formData.append('descricaoAnuncio', this.announcement.get('descricaoAnuncio')?.value || '');
    formData.append('valorAnuncio', this.announcement.get('valorAnuncio')?.value);
    const idCategorias = this.selectedCategorias.map(c => c.id_categoria);
    formData.append('idCategoria', JSON.stringify(idCategorias));

    const idPerfil = this.apiService.getUserIdPerfil();
    if (idPerfil) {
      formData.append('idPerfil', idPerfil);
    } else {
      console.error('ID do perfil não encontrado. Verifique o armazenamento do id_perfil.');
      return;
    }

    this.imagesToUpload.forEach((file, index) => {
      formData.append('imagens', file, file.name);
    });

    this.httpService.postAnuncio(formData).subscribe(
      (response) => {
        this.snackBar.open('Anúncio criado com sucesso!', 'Fechar', { duration: 3000 });
        this.hideEdit();
        window.location.reload();
      },
      (error) => {
        console.error('Erro ao criar anúncio:', error);
        this.snackBar.open('Erro ao criar anúncio.', 'Fechar', { duration: 3000 });
      }
    );
  }
}
