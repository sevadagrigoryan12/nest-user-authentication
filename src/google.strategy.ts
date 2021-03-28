import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-strategy';
import { Request } from 'express';
import axios, { AxiosRequestConfig } from 'axios';

class CustomStrategy extends Strategy {
  _getOptions = (accessToken: string): AxiosRequestConfig => ({
    url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    headers: {
      Authorization: accessToken,
    },
  });

  async authenticate(req: Request): Promise<void> {
    try {
      const accessToken: string = req.headers.authorization;
      if (!accessToken) {
        return this.fail(401);
      }
      const user = await axios(this._getOptions(accessToken));
      this.success(user.data);
    } catch (err) {
      return this.fail(401);
    }
  }
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  CustomStrategy,
  'google',
) {}
