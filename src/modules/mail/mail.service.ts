import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendUserForgotPasswordMail(user: User, token: string) {
    const url = `${this.configService.get(
      'CLIENT_DOMAIN',
    )}/auth/forgot-password?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Reset Your Password',
        template: './forgot-password',
        context: {
          name: user.fullName,
          url,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
