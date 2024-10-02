import { Injectable } from '@angular/core';

// 'root' = Singleton
@Injectable({
  providedIn: 'root'    
})
export class AuthService {

  constructor() { }

  login (username: string, password: string): void {
    console.log('login', username, password)
  }
}
