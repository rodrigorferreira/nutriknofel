import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Tornando apiUrl pública para que possa ser acessada externamente, se necessário
  public apiUrl = 'http://localhost:8000/api/';  // Altere para a URL do seu backend

  constructor(private http: HttpClient, private router: Router) {}

  // Método para realizar o login
  // login(credentials: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}login/`, credentials);
  // }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}login/`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.access);  // Armazena o token JWT
      })
    );
  }

  // Método para realizar o logout
  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  // Verifica se o usuário está autenticado
  isLoggedIn(): boolean {
     return !!localStorage.getItem('access_token');
   }

  // Retorna os headers de autenticação para incluir o token JWT nas requisições
  getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  }


  // Método público para obter a URL base da API (opcional)
  getApiUrl(): string {
    return this.apiUrl;
  }

  // Getter para o token armazenado no localStorage
  // get token(): string | null {
  //   return localStorage.getItem('access_token');
  // }
}
