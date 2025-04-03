import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
    sub: string;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
    exp: number;
}