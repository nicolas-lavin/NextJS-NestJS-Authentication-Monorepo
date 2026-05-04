import { IsEmail, IsString } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  name: string;

  @IsString()
  firstLastName: string;

  @IsString()
  secondLastName: string;

  @IsString()
  @IsEmail()
  email: string;
}
