import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './mais-work/dashboard/dashboard.component';
import { MaisWorkComponent } from './mais-work/mais-work.component';
import { AuthGuard } from './auth.guard';
import { AnnouncementComponent } from './mais-work/AnnouncementCategoria/announcement/announcement.component';
import { PerfilComponent } from './mais-work/perfil/perfil.component';
import { SettingsComponent } from './mais-work/settings/settings.component';
export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'maiswork',
    component: MaisWorkComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'announcement',
        component: AnnouncementComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard]
      },
    ],
  },
];
