import { Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService:MailService) {}
  
  @Post('sendHello')
  sendHello() {
    return this.mailService.sendHello();
  }

  @Post('sendToAll')
  sendToAll() {
    return this.mailService.sendToAll();
  }
}
