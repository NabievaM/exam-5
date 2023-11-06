import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendAdminConfirmation(admin: Admin): Promise<void> {
    const url = `${process.env.API_HOST}/admin/activate/${admin.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Welcome to Elektron library App! Confirm your Email!',
      template: './confirmation',
      context: {
        name: admin.firstName,
        url,
      },
    });
  }
}
