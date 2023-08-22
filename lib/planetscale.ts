import 'server-only';
import { Generated, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface User {
  user_id: Generated<number>;
  first_name: string;
  username: string;
  last_name: string;
  email: string;
  phone_number: number;
  gender: string;
  type: string;
}

interface Database {
  User: User;
  // https://github.com/nextauthjs/next-auth/issues/4922
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL
  })
});
