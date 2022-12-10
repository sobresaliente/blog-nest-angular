import { UserRole } from './../models/userRole';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { hasRoles } from 'src/auth/decorators/hasRole.decorator';
import { IError } from './../models/error';
import { IUser } from './../models/userDTO';
import { UserService } from '../services/user.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { catchError, Observable, of, map } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('users')
export class UserController {
  constructor(private _userService: UserService) {}

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  public index(@Query('page') page: number = 1, @Query('limit') limit: number = 15): Observable<Pagination<IUser>> {
    limit = limit > 100 ? 100 : limit;
    return this._userService.paginate({ page, limit, route: 'http://localhost:3000/users' });
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
  public update(@Param() params, @Body() user: IUser) {
    return this._userService.update(params.id, user);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/role')
  public updateRole(@Param() params, @Body() user: IUser) {
    return this._userService.updateRole(params.id, user);
  }

  @Delete(':id')
  public deleteOne(@Param() params) {
    return this._userService.deleteOne(params.id);
  }
}
