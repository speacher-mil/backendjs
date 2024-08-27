import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from '@/config';
import { JwtStrategy } from '@/auth/strategies/JwtStrategy';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: {
        expiresIn: '60s'
      },
    })
  ],
  providers: [JwtStrategy]
})
export class AuthModule {}