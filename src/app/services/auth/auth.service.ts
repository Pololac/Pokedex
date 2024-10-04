import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

// 'root' = Singleton
@Injectable({
  providedIn: 'root'    
})
export class AuthService {
  private readonly http = inject(HttpClient)
  private _token: string | undefined   // sécurité

  get token(): string | undefined {
    return this._token
  }

  get isAuthenticated (): boolean {
    return !!this._token   // Transforme en boolean le contenu de la valeur (si undefined -> false)
  }

  //URL d'un autre site car API Pokemon en accès libre
  async login (username: string, password: string): Promise<void> {
    const req = this.http.post<{ access_token: string, refresh_token: string }>('https://api.escuelajs.co/api/v1/auth/login',
      {
        email: username,
        password: password
      }
    )
    const res = await lastValueFrom(req)
    this._token = res.access_token
  }

  logout (): void {
    this._token = undefined
  }
}
