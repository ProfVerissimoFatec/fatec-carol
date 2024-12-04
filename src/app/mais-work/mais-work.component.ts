import { Component, computed, signal } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-mais-work',
  standalone: false,
  templateUrl: './mais-work.component.html',
  styleUrl: './mais-work.component.scss',
})
export class MaisWorkComponent {
  collapsed = signal(false);
  isIconToggled: boolean = false;
  userName: string | null = '';
  profileImageUrl: string | null = ''; // Adicionar a variável para a URL da imagem de perfil
  isDarkMode: boolean = false;

  constructor(private apiService: ApiService) {
    this.userName = this.apiService.getUserName();
  }

  sidenavWidth = computed(() => (this.collapsed() ? '78px' : '250px'));

 

  ngOnInit() {
    this.loadProfileImage();
    
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.updateTheme();
  }

  loadProfileImage() {
    this.apiService.getUserProfileData().subscribe((data: any) => {
      if (data && data.imagemperfil) {
        const base64String = data.imagemperfil;
        this.profileImageUrl = `data:image/jpeg;base64,${base64String}`;
      } else {
        this.profileImageUrl = null;
      }
    });
  }

  toggleIcon(): void {
    this.isIconToggled = !this.isIconToggled;  
  }

  resetIcon(): void {
    this.isIconToggled = false;
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode; 
    this.updateTheme();
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }
  onLogout(): void {
    this.apiService.logout(); 
  }

  updateTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}