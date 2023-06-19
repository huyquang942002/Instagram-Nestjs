import { Request } from 'express';
import { verify } from 'jsonwebtoken';

export function verifyToken(req: Request): string {
  let jwtToken = null;
  const token = req.headers?.authorization?.split(' ')[1];
  if (!token) {
    throw new Error("You're unauthenticated");
  }
  try {
    verify(token, 'accessToken', (err, token) => {
      if (err) {
        console.log(err);
      } else {
        jwtToken = token;
      }
    });
    return jwtToken.userId;
  } catch (error) {
    console.log(error);
  }
}
