import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {
      expiresIn: parseInt(process.env.JWT_EXPIRES_IN, 10) * 24 * 60 * 60, // Convert days to seconds
    },
  }),
);
