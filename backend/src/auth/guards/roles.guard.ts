import { IUser } from './../../user/models/userDTO';
import { UserService } from 'src/user/services/user.service';
import { Injectable, CanActivate, ExecutionContext, forwardRef, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private _reflector: Reflector,
    @Inject(forwardRef(() => UserService))
    private _userService: UserService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this._reflector.get('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user.user;

    return this._userService.getOne(user.id).pipe(
      map((user: IUser) => {
        if (roles.includes(user.role)) {
          return true;
        }
        return false;
      }),
    );

    return true;
  }
}
