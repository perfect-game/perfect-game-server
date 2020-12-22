import { Injectable } from '@nestjs/common';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

import { CognitoService } from '@app/modules/aws/cognito';
import { getEnumKeyByEnumValue, getEnumValueByEnumKey, isEmpty } from '@app/utils';
import { LocaleType } from '@app/models/locale.type';
import { GenderType } from '@app/models/gender.type';

import { ICloudUserModel, IUpdateCloudUserInputModel } from './data-models';

@Injectable()
export class CommonCloudUserService {
  constructor(private readonly cognitoService: CognitoService) {}

  public async getCloudUserByUserName(cloudUserName: string): Promise<ICloudUserModel> {
    const cloudUser = await this.cognitoService.getUserByUserName(cloudUserName);
    const cloudUserModel = this.convertCloudUserToModel(cloudUser);

    return cloudUserModel;
  }

  public async getCloudUserByAccessToken(accessToken: string): Promise<ICloudUserModel> {
    const cloudUser = await this.cognitoService.getUserByAccessToken(accessToken);
    const cloudUserModel = this.convertCloudUserToModel(cloudUser);

    return cloudUserModel;
  }

  public async updateCloudUser(
    cloudUserName: string,
    updateCloudUserInputModel: Partial<IUpdateCloudUserInputModel>,
  ): Promise<ICloudUserModel> {
    const cloudUserAttributes = this.convertUpdateCloudUserInputModelToCloudUserAttributes(updateCloudUserInputModel);
    await this.cognitoService.updateUserAttributes(cloudUserName, cloudUserAttributes);
    const cloudUserModel = await this.getCloudUserByUserName(cloudUserName);

    return cloudUserModel;
  }

  public async enableUser(cloudUserName: string): Promise<boolean> {
    await this.cognitoService.enableUser(cloudUserName);

    return true;
  }

  public async disableUser(cloudUserName: string): Promise<boolean> {
    await this.cognitoService.disableUser(cloudUserName);

    return true;
  }

  public async deleteUser(cloudUserName: string): Promise<boolean> {
    await this.cognitoService.deleteUser(cloudUserName);

    return true;
  }

  private convertCloudUserToModel(
    cloudUser: CognitoIdentityServiceProvider.AdminGetUserResponse | CognitoIdentityServiceProvider.GetUserResponse,
  ): ICloudUserModel {
    if (!cloudUser.UserAttributes || cloudUser.UserAttributes.length < 1) {
      throw new Error('The Cognito user has no user attributes.');
    }

    const emailAttribute = cloudUser.UserAttributes.find((userAttribute) => userAttribute.Name === 'email');
    const emailVerifiedAttribute = cloudUser.UserAttributes.find(
      (userAttribute) => userAttribute.Name === 'email_verified',
    );
    const phoneNumberAttribute = cloudUser.UserAttributes.find(
      (userAttribute) => userAttribute.Name === 'phone_number',
    );
    const phoneNumberVerifiedAttribute = cloudUser.UserAttributes.find(
      (userAttribute) => userAttribute.Name === 'phone_number_verified',
    );
    const nicknameAttribute = cloudUser.UserAttributes.find((userAttribute) => userAttribute.Name === 'nickname');
    const localeAttribute = cloudUser.UserAttributes.find((userAttribute) => userAttribute.Name === 'locale');
    const genderAttribute = cloudUser.UserAttributes.find((userAttribute) => userAttribute.Name === 'gender');

    const userName = cloudUser.Username;
    const email = emailAttribute?.Value;
    const emailVerified = emailVerifiedAttribute?.Value === 'true';
    const phoneNumber = phoneNumberAttribute?.Value;
    const phoneNumberVerified = phoneNumberVerifiedAttribute?.Value === 'true';
    const nickname = nicknameAttribute?.Value;
    const locale = localeAttribute?.Value;
    const gender = genderAttribute?.Value;
    const localeEnumValue = getEnumValueByEnumKey(LocaleType, getEnumKeyByEnumValue(LocaleType, locale));
    const genderEnumValue = getEnumValueByEnumKey(GenderType, getEnumKeyByEnumValue(GenderType, gender));

    if (!email) {
      throw new Error('Invalid email.');
    }
    if (!phoneNumber) {
      throw new Error('Invalid phone_number.');
    }
    if (!nickname) {
      throw new Error('Invalid nickname.');
    }
    if (!locale || !localeEnumValue) {
      throw new Error('Invalid locale.');
    }
    if (!gender || !genderEnumValue) {
      throw new Error('Invalid gender.');
    }

    const model: ICloudUserModel = {
      userName,
      email,
      emailVerified,
      phoneNumber,
      phoneNumberVerified,
      nickname,
      locale: localeEnumValue,
      gender: genderEnumValue,
    };

    return model;
  }

  private convertUpdateCloudUserInputModelToCloudUserAttributes(
    updateCloudUserInputModel: Partial<IUpdateCloudUserInputModel>,
  ): CognitoIdentityServiceProvider.AttributeType[] {
    const phoneNumber = updateCloudUserInputModel.phoneNumber;
    const nickname = updateCloudUserInputModel.nickname;
    const locale = updateCloudUserInputModel.locale;
    const gender = updateCloudUserInputModel.gender;

    const cloudUserAttributes: CognitoIdentityServiceProvider.AttributeType[] = [
      { Name: 'phone_number', Value: !isEmpty(phoneNumber) ? String(phoneNumber) : undefined },
      { Name: 'nickname', Value: !isEmpty(nickname) ? String(nickname) : undefined },
      { Name: 'locale', Value: !isEmpty(locale) ? String(locale) : undefined },
      { Name: 'gender', Value: !isEmpty(gender) ? String(gender) : undefined },
    ].filter((cloudUserAttribute) => !!cloudUserAttribute.Value);

    return cloudUserAttributes;
  }
}
