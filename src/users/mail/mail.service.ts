import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService, private readonly usersService: UsersService) {}

  async sendHello() {
     await this.mailerService
      .sendMail({
        to: 'hyunjun.ko1021@gmail.com',
        from: 'hyunjun.ko1021@gmail.com',
        subject: 'Hello',
        text: 'Hello World',
        html: '<b>Hello World</b>',
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        new ConflictException(error);
      });
  }

  async sendToAll() {
        const users = this.usersService.getAll();
        const mailList = (await users).map((user)=> user.email);
        await this.mailerService.sendMail({
            to: mailList,
            subject: "watashi",
            text: 'hihi',
            html: '<b>hello me</b>'
        })
    }
}