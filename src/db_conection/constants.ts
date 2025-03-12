import 'dotenv/config';
export const PG_CONNECTION = 'PG_CONNECTION';
export const JWTsecret = process.env.JWT_SECRET;


export enum Role{
    User = 'user',
    ADMIN = 'ADMIN',
}