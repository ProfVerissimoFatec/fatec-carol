import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../services/api.service';

export type MenuItem = {
  icon: string;
  label: string;
  router: string;
};

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class MenuComponent {
  sideNavCollapsed = signal(false);
  userName = computed(() => this.authService.getUserName() || 'Usuário');
  tipo = this.authService.getUserType(); 

  constructor(private router: Router, private authService: ApiService) {
    this.updateMenuItems();
  }

  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '60' : '100'));

  sideImageName = computed(()=> (this.sideNavCollapsed() ? '60' : '117'));

  menuItems = signal<MenuItem[]>([]);

  updateMenuItems() {
    const items = [
      {
        icon: 'campaign',
        label: 'Anúncios',
        router: 'announcement',
      },
      // {
      //   icon: 'chat',
      //   label: 'Chat',
      //   router: 'chat',
      // },
      {
        icon: 'account_circle',
        label: 'Perfil',
        router: 'perfil',
      },
    ];

    if (!this.tipo) {
      items.unshift({
        icon: 'home',
        label: 'Visão Geral',
        router: 'dashboard',
      });
    }

    this.menuItems.set(items);
  }

  logout(): void {
    this.authService.logout();
  }
}