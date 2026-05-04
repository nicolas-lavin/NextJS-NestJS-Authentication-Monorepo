import { IsEmail, IsString } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  secondLastName: string;

  @IsString()
  @IsEmail()
  email: string;
}
