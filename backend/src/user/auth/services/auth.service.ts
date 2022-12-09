import { IUser } from './../../../../dist/user/models/userDTO.d';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly _jwtService: JwtService) {}

  public generateJWT(user: IUser): Observable<string> {
    return from(this._jwtService.sign({ user }));
  }

  public hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 10));
  }

  public comparePasswords(password: string, passwordHash: string): Observable<unknown> {
    return of<unknown>(bcrypt.compare(password, passwordHash));
  }
}
