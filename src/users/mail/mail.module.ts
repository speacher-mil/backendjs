import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { config } from '@/config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';
@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    host: config.MAIL_HOST, 
                    port: config.MAIL_PORT, 
                    auth: {
                        user: config.MAIL_USER,
                        pass: config.MAIL_PASSWORD,
                    }
                },
                defaults: {
                    from: '"nest-modules" <modules@nestjs.com>'
                }
            })
        }),
        UsersModule
    ], 
    providers: [MailService],
    exports: [MailService],
    controllers: [MailController]
})
export class MailModule {}