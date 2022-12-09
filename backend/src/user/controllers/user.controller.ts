import { IUser } from './../models/userDTO';
import { UserService } from '../services/user.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';

@Controller('user')
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
  public create(@Body() user: IUser): Observable<IUser> {
    return this._userService.create(user);
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
