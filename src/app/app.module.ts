// src/app/app.module.ts
// src/app/app.module.ts
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { NgxMaskDirective, provideNgxMask, NgxMaskPipe } from 'ngx-mask';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';


import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaisWorkComponent } from './mais-work/mais-work.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MenuComponent } from './mais-work/menu/menu.component';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [AppComponent, MaisWorkComponent],
  imports: [
    MenuComponent,
    BrowserModule,
    RouterModule.forRoot(routes), // Importar as rotas aqui
    NgxMaskDirective,
    NgxMaskPipe,
    MatFormField,
    MatInputModule,
    FormsModule, // Adicionando FormsModule
    ReactiveFormsModule, // Adicionando ReactiveFormsModule
    BrowserAnimationsModule, // Adicionar BrowserAnimationsModule
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    CommonModule,
    MatMenuModule  
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent],

  providers: [provideNgxMask(), provideAnimationsAsync()],
})
export class AppModule {}
