import { IError } from './../models/error';
import { IUser } from './../models/userDTO';
import { UserService } from '../services/user.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { catchError, Observable, of, map } from 'rxjs';

@Controller('users')
export class UserController {
  constructor(private _userService: UserService) {}

  @Get()
  public getAll(): Observable<IUser[]> {
    return this._userService.getAll();
  }

  @Get(':id')
  public getOne(@Param() params): Observable<IUser> {
    return this._userService.getOne(params.id);
  }

  @Post()
  public create(@Body() user: IUser): Observable<IUser | IError> {
    return this._userService.create(user).pipe(
      map((user: IUser) => user),
      catchError((error) => {
        return of({ error: error.message });
      }),
    );
  }

  @Post('login')
  public login(@Body() user: IUser): Observable<any> {
    let jwtToken = '';
    return this._userService.login(user).pipe(
      map((jwt: string) => {
        jwtToken = jwtToken + jwt;

        return { access_token: jwtToken };
      }),
    );
  }

  @Put(':id')
  public update(@Param() params, @Body() body) {
    return this._userService.update(params.id, body);
  }

  @Delete(':id')
  public deleteOne(@Param() params) {
    return this._userService.deleteOne(params.id);
  }
}
