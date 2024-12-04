import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://fatec-pji-2-2024-1-mais-work-7e3r.vercel.app'; // URL da sua API

  constructor(private router: Router,private http: HttpClient) { }

  // Método para fazer login e armazenar o usuário e token
  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, senha });
  }

  // Armazenar o usuário e token no localStorage
  storeUserData(token: string, user: any) {
    // console.log('Armazenando dados do usuário:', user);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', user.nickname); 
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('id_perfil', user.id_perfil);
    localStorage.setItem('tipo', JSON.stringify(user.tipo));
  }
  
  getUserName(): string | null {
    const userName = localStorage.getItem('userName');
    // console.log('Nome do usuário obtido:', userName); 
    return userName;
  }
  getUserIdPerfil(): string | null {
    const idPerfil = localStorage.getItem('id_perfil');
    // console.log('ID do Perfil recuperado:', idPerfil); 
    return idPerfil;
  }

    getUserProfileData(): Observable<any> {
      const token = this.getToken(); 
      if (!token) {
        return throwError('Token de autenticação não encontrado');
      }
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` 
      });
  
      return this.http.get(`${this.apiUrl}/perfil`, { headers })
        .pipe(
          catchError(this.handleError) // Captura e trata erros
        );
    }

    getUserType(): boolean {
      const tipo = JSON.parse(localStorage.getItem('tipo') || 'false');
      // console.log('Valor lido de tipo:', tipo);
      return tipo;
    }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken'); 
    localStorage.removeItem('userName');
    localStorage.removeItem('accountId');
    localStorage.removeItem('user');
    localStorage.removeItem('id_perfil');
    localStorage.removeItem('tipo');
    this.router.navigate(['/login']);
  }

 getToken(): string | null {
  return localStorage.getItem('authToken');
}


 // Verificar se o usuário está autenticado
 isAuthenticated(): boolean {
  return !!this.getToken(); // Retorna true se o token existir
}
private handleError(error: any) {
  // console.error('Erro na API:', error);
  return throwError('Erro na comunicação com o servidor. Tente novamente mais tarde.');
}


}
