import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'refresh-jwt',
  (): JwtSignOptions => ({
    secret: process.env.REFRESH_JWT_SECRET_KEY,
    expiresIn: parseInt(process.env.REFRESH_JWT_EXPIRES_IN, 10) * 24 * 60 * 60, // Convert days to seconds
  }),
);
