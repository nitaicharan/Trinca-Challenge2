import { JwtPayload, sign, verify } from "jsonwebtoken";

export const signAccessToken = (payload: { [key: string]: any }) => signToken(payload, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRES_IN);
export const signRefreshToken = (payload: { [key: string]: any }) => signToken(payload, process.env.REFRESH_TOKEN_SECRET);

export const verifyAccessToken = (token: string) => verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
export const verifyRefreshToken = (token: string) => verifyToken(token, process.env.ACCESS_TOKEN_SECRET);


export const verifyToken = (token: string, secret: string) => verify(token, secret) as JwtPayload;

export const signToken = (payload: { [key: string]: any }, secret: string, expires_in?: string) => {
    const token = sign(payload, secret, expires_in && { expiresIn: expires_in });
    return expires_in ? { token, expires_in } : { token };
};
