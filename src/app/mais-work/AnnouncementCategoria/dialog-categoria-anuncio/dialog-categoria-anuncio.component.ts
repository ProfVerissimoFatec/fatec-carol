import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../../../services/http/http.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog-categoria-anuncio',
  standalone: true,
  imports: [],
  templateUrl: './dialog-categoria-anuncio.component.html',
  styleUrl: './dialog-categoria-anuncio.component.scss'
})
export class DialogCategoriaAnuncioComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private httpService: HttpService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    // Assegura que os FormGroups são inicializados, mas a inicialização já foi feita no construtor
  }

}
