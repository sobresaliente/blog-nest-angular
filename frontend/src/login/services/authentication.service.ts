import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private _httpClient: HttpClient) {
  }

  public login(email: string, password: string) {

    return this._httpClient.post<Token>('/api/users/login', { email, password }).pipe(map((token: Token) => {

      localStorage.setItem('blog-token', token.access_token);
      return token;
    }));
  }

}
