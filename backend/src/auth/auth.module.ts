import { UserService } from 'src/user/services/user.service';
import { UserModule } from './../user/user.module';
import { JwtStrategy } from 'src/auth/guards/jwt-strategy';
import { hasRoles } from 'src/auth/decorators/hasRole.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { JwtAuthGuard } from './guards/jwt-guard';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
