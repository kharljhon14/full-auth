import jwt from 'jsonwebtoken';

const { ACTIVATION_TOKEN_SECRET, RESET_TOKEN_SECRET } = process.env;

export function createActivationToken(payload: any) {
  return jwt.sign(payload, ACTIVATION_TOKEN_SECRET!, { expiresIn: '1d' });
}

export function resetToken(payload: any) {
  return jwt.sign(payload, RESET_TOKEN_SECRET!, { expiresIn: '6H' });
}
