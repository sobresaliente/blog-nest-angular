import { AuthService } from './../auth/services/auth.service';
import { IUser } from './../models/userDTO';
import { UserEntity } from './../models/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable, from, switchMap, map, catchError, throwError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly _userRepository: Repository<UserEntity>,
    private _authService: AuthService,
  ) {}

  public getAll(): Observable<IUser[]> {
    return from(this._userRepository.find());
  }

  public getOne(id: number): Observable<IUser> {
    return from(this._userRepository.findOneBy({ id }));
  }

  public create(user: IUser): Observable<IUser> {
    return this._authService.hashPassword(user.password).pipe(
      switchMap((hashedPassword: string) => {
        let newUser = new UserEntity();
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.username = user.username;
        newUser.password = hashedPassword;
        return from(this._userRepository.save(newUser)).pipe(
          map((user: IUser) => {
            delete user.password;
            return user;
          }),
          catchError((error) => throwError(error)),
        );
      }),
    );
  }

  public update(id: number, user: IUser): Observable<UpdateResult> {
    return from(this._userRepository.update(id, user));
  }

  public deleteOne(id: number): Observable<DeleteResult> {
    return from(this._userRepository.delete(id));
  }
}
