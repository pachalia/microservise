import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(userName: string) {
    return userName === 'pachalia';
  }
}
