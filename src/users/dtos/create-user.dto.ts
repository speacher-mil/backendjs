import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsString({ each: true })
  readonly purposes: String[];
}
