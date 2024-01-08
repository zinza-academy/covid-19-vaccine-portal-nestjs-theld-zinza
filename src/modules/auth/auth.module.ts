import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { MailModule } from '../mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForgotPasswordToken } from 'src/entities/forgotPasswordToken.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ForgotPasswordToken]),
    UserModule,
    MailModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.AUTH_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
