
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://fatec-pji-2-2024-1-mais-work-7e3r.vercel.app';
  
  get(api: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.request('GET', `${this.apiUrl}/${api}`, { headers });
  }

  post(api: string, body: any = {}): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.request('POST', `${this.apiUrl}/${api}`, { body, headers });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getMensagens(): Observable<any> {
    return this.get('mensagens');
  }
  // Método para enviar uma nova mensagem
  postMensagem(mensagemData: any): Observable<any> {
    return this.post('mensagens', mensagemData);
  }
  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token); 
        }
      })
    );
  }
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro`, data);
  }
  codeVerify(code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/codeVerify`, { code });
  }
  codeVerifyForget(code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/codeVerifyForget`, { code });
  }
  checkEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkEmail`, { email });
  }
  alterarSenha(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/alterarSenha`, { email, senha });
  }

  getCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorias`); // Supondo que a rota seja /categorias
  }

  getAnuncios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/anuncio`);
  }
  getLoginInfo(): Observable<any> {
    return this.get('login-info'); // 'login-info' é a rota definida no backend para obter as informações
  }

  // Atualizar os dados do perfil
  updateUserProfile(profileData: FormData): Observable<any> {
    const token = this.getToken(); // Recupera o token de autenticação
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adiciona o token ao cabeçalho Authorization
    });
  
    return this.http.put(`${this.apiUrl}/perfil`, profileData, { headers });
  }

  postAnuncio(anuncioData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/anuncio`, anuncioData);
  }

  getAnunciosByPerfil(idPerfil: number): Observable<any> {
    const headers = this.createAuthHeaders(); 
    return this.http.get(`${this.apiUrl}/anuncio/perfil/${idPerfil}`, { headers });
  }
  
  getAnunciosCurtidos(idPerfil: number): Observable<any> {
    return this.get(`anuncio/curtidos/${idPerfil}`);
  }

  updateReaction(anuncioId: number, type: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.put(`${this.apiUrl}/anuncio/${anuncioId}/${type}`, {}, { headers });
  }

  deletarAnuncio(idAnuncio: number): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.delete(`${this.apiUrl}/anuncio/${idAnuncio}`, { headers });
  }

  getReacoesTotaisDoPerfil(idPerfil: number): Observable<any> {
    return this.get(`perfil/${idPerfil}/reacoes`);
  }

  getAnunciosMesAtualPorDia(): Observable<any> {
    return this.get('anuncios/mes-atual/dia');
  }

  getAnunciosAnoAtualPorMes(): Observable<any> {
    return this.get('anuncios/ano-atual/mes');
  }

}
