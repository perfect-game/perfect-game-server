import { Injectable } from '@nestjs/common';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import config from 'config';

import { CognitoIdentityService } from './cognito-identity.service';

@Injectable()
export class CognitoService {
  private userPoolId: string = config.get<string>('aws.cognito.userPoolId');

  constructor(private readonly cognitoIdentityService: CognitoIdentityService) {}

  public async getUserByUserName(userName: string): Promise<CognitoIdentityServiceProvider.AdminGetUserResponse> {
    const cognitoIdentityProvider = this.cognitoIdentityService.getInstance();
    const result = await cognitoIdentityProvider
      .adminGetUser({
        UserPoolId: this.userPoolId,
        Username: userName,
      })
      .promise();

    if (!result) {
      throw new Error(`Cannot find user ${userName}.`);
    }

    return result;
  }

  public async getUserByAccessToken(accessToken: string): Promise<CognitoIdentityServiceProvider.GetUserResponse> {
    const cognitoIdentityProvider = this.cognitoIdentityService.getInstance();
    const result = await cognitoIdentityProvider.getUser({ AccessToken: accessToken }).promise();

    if (!result) {
      throw new Error('Invalid access token.');
    }

    return result;
  }

  public async updateUserAttributes(
    userName: string,
    userAttributes: CognitoIdentityServiceProvider.AttributeType[],
  ): Promise<CognitoIdentityServiceProvider.AdminUpdateUserAttributesResponse> {
    const cognitoIdentityProvider = this.cognitoIdentityService.getInstance();
    const result = await cognitoIdentityProvider
      .adminUpdateUserAttributes({
        UserPoolId: this.userPoolId,
        Username: userName,
        UserAttributes: userAttributes,
      })
      .promise();

    return result;
  }

  public async enableUser(userName: string): Promise<CognitoIdentityServiceProvider.AdminEnableUserResponse> {
    const cognitoIdentityProvider = this.cognitoIdentityService.getInstance();
    const result = await cognitoIdentityProvider
      .adminEnableUser({
        UserPoolId: this.userPoolId,
        Username: userName,
      })
      .promise();

    return result;
  }

  public async disableUser(userName: string): Promise<CognitoIdentityServiceProvider.AdminDisableUserResponse> {
    const cognitoIdentityProvider = this.cognitoIdentityService.getInstance();
    const result = await cognitoIdentityProvider
      .adminDisableUser({
        UserPoolId: this.userPoolId,
        Username: userName,
      })
      .promise();

    return result;
  }

  public async deleteUser(userName: string): Promise<boolean> {
    const cognitoIdentityProvider = this.cognitoIdentityService.getInstance();
    const result = await cognitoIdentityProvider
      .adminDeleteUser({
        UserPoolId: this.userPoolId,
        Username: userName,
      })
      .promise();

    if (!result) {
      throw new Error('Failed to delete the Cognito user.');
    }

    return true;
  }
}
