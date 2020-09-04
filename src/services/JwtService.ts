import { JwtPayload, sign, verify } from "jsonwebtoken";

export const signAccessToken = (payload: { [key: string]: any }) => ({ accessToken: sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }), tokenType: 'bearer' });
export const signRefreshToken = (payload: { [key: string]: any }) => sign(payload, process.env.REFRESH_TOKEN_SECRET);
export const signCodeToken = (payload: { [key: string]: any }) => ({ codeToken: sign(payload, process.env.CODE_TOKEN_SECRET, { expiresIn: '10m' }), tokenType: 'bearer' });
export const verifyAccessToken = (token: string) => verify(token, process.env.ACCESS_TOKEN_SECRET) as JwtPayload;
export const verifyRefreshToken = (token: string) => verify(token, process.env.REFRESH_TOKEN_SECRET) as JwtPayload;
export const verifyCodeToken = (token: string) => verify(token, process.env.CODE_TOKEN_SECRET) as JwtPayload;