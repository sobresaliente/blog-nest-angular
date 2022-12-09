import { IUser } from './../models/userDTO';
import { UserEntity } from './../models/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable, from } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly _userRepository: Repository<UserEntity>) {}

  public getAll(): Observable<IUser[]> {
    return from(this._userRepository.find());
  }

  public getOne(id: number): Observable<IUser> {
    return from(this._userRepository.findOneBy({ id }));
  }

  public create(user: IUser): Observable<IUser> {
    return from(this._userRepository.save(user));
  }

  public update(id: number, user: IUser): Observable<UpdateResult> {
    return from(this._userRepository.update(id, user));
  }

  public deleteOne(id: number): Observable<DeleteResult> {
    return from(this._userRepository.delete(id));
  }
}
