import { registerAs } from '@nestjs/config';

export default registerAs('linkedin', () => ({
  apiKey: process.env.LINKEDIN_API_KEY,
  clientId: process.env.PUBLIC_LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
}));
