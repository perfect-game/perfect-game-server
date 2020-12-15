import { Injectable } from '@nestjs/common';
import { CognitoIdentityServiceProvider, Credentials } from 'aws-sdk';
import config from 'config';

@Injectable()
export class CognitoIdentityService {
  private readonly cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
    credentials: new Credentials({
      accessKeyId: config.get<string>('aws.accessKeyId'),
      secretAccessKey: config.get<string>('aws.secretAccessKey'),
    }),
    region: config.get<string>('aws.cognito.region'),
  });

  public getInstance(): CognitoIdentityServiceProvider {
    return this.cognitoIdentityServiceProvider;
  }
}
