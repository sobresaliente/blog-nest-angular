import { LoginForm } from '../models/loginForm';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Token } from '../models/token';
import { RegisterForm } from '../models/registerForm';
import { User } from '../../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _httpClient: HttpClient) {}

  public login(loginForm: LoginForm) {
    return this._httpClient
      .post<Token>('/api/users/login', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        map((token: Token) => {
          localStorage.setItem('blog-token', token.access_token);
          return token;
        })
      );
  }

  public register(user: User): Observable<User> {
    console.log(user);
    return this._httpClient
      .post<User>('/api/users', user).pipe(map((user: User) => {
        return user;
      } ));
  }
}
