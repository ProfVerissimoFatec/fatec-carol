import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{
  loginInfo: any;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getLoginInfo().subscribe(
      data => {
        this.loginInfo = data;
        console.log('Informações do login:', data);
      },
      error => {
        console.error('Erro ao buscar informações de login', error);
      }
    );
  }
}
