import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { UserAuthService } from './user-auth.service';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private userAuthService: UserAuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('authorization');

    if (!authHeader) {
      throw new HttpException(
        'No authorization header',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const token = await this.userAuthService.verifyToken(authHeader);
      console.log(token);
      res.locals['token'] = token;
    } catch (e) {
      throw new HttpException('Token invalid', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
