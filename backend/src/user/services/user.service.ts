import { AuthService } from '../../auth/services/auth.service';
import { IUser } from './../models/userDTO';
import { UserEntity } from './../models/user.entity';
import { Injectable, Param } from '@nestjs/common';
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
    return from(this._userRepository.find()).pipe(
      map((users: IUser[]) => {
        users.forEach((user) => {
          return delete user.password;
        });

        return users;
      }),
    );
  }

  public getOne(id: number): Observable<IUser> {
    return from(this._userRepository.findOneBy({ id })).pipe(
      map((user: IUser) => {
        delete user.password;
        return user;
      }),
    );
  }

  public create(user: IUser): Observable<IUser> {
    return this._authService.hashPassword(user.password).pipe(
      switchMap((hashedPassword: string) => {
        let newUser = new UserEntity();
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.username = user.username;
        newUser.password = hashedPassword;
        newUser.role = user.role;

        return from(this._userRepository.save(newUser)).pipe(
          map((user: IUser) => {
            const { password, ...result } = user;
            return result;
          }),
          catchError((error) => throwError(error)),
        );
      }),
    );
  }

  public update(id: string, user: IUser): Observable<UpdateResult> {
    delete user.email;
    delete user.password;
    delete user.username;

    return from(this._userRepository.update(id, user));
  }

  public updateRole(id: string, user: IUser): Observable<UpdateResult> {
    return from(this._userRepository.update(id, user));
  }

  public deleteOne(id: number): Observable<DeleteResult> {
    return from(this._userRepository.delete(id));
  }

  public login(user: IUser): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: IUser) => {
        if (user) {
          return this._authService.generateJWT(user).pipe(
            map((jwt: string) => {
              return jwt;
            }),
          );
        } else {
          return 'Wrong credentials';
        }
      }),
    );
  }

  public validateUser(email: string, password: string): Observable<IUser> {
    return this.findUserByEmail(email).pipe(
      switchMap((user: IUser) => {
        return this._authService.comparePasswords(password, user.password).pipe(
          map((isEqual: boolean) => {
            if (isEqual) {
              delete user.password;
              return user;
            } else {
              throw Error;
            }
          }),
        );
      }),
    );
  }

  public findUserByEmail(email: string): Observable<IUser> {
    return from(this._userRepository.findOneBy({ email }));
  }
}
