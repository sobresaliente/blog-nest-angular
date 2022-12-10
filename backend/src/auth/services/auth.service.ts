import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { IUser } from '../../user/models/userDTO';

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
    return from(bcrypt.compare(password, passwordHash));
  }
}
