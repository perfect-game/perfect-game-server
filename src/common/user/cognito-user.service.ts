import { Injectable } from '@nestjs/common';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

import { getEnumKeyByEnumValue, getEnumValueByEnumKey, isEmpty } from '@app/utils';

import { ICognitoUserModel, IUpdateCognitoUserInputModel } from '@app/common/user/data-models';
import { LocaleType } from '@app/models/locale.type';
import { GenderType } from '@app/models/gender.type';

import { CognitoService } from '@app/modules/aws/cognito';

@Injectable()
export class CognitoUserService {
  constructor(private readonly cognitoService: CognitoService) {}

  public async getCognitoUserByUserName(cognitoUserName: string): Promise<ICognitoUserModel> {
    const cognitoUser = await this.cognitoService.getUserByUserName(cognitoUserName);
    const cognitoUserModel = this.convertCognitoUserToModel(cognitoUser);

    return cognitoUserModel;
  }

  public async getCognitoUserByAccessToken(accessToken: string): Promise<ICognitoUserModel> {
    const cognitoUser = await this.cognitoService.getUserByAccessToken(accessToken);
    const cognitoUserModel = this.convertCognitoUserToModel(cognitoUser);

    return cognitoUserModel;
  }

  public async updateCognitoUser(
    cognitoUserName: string,
    updateCognitoUserInputModel: Partial<IUpdateCognitoUserInputModel>,
  ): Promise<ICognitoUserModel> {
    const cognitoUserAttributes = this.convertUpdateCognitoUserInputModelToCognitoUserAttributes(
      updateCognitoUserInputModel,
    );
    await this.cognitoService.updateUserAttributes(cognitoUserName, cognitoUserAttributes);
    const cognitoUserModel = await this.getCognitoUserByUserName(cognitoUserName);

    return cognitoUserModel;
  }

  public async enableUser(cognitoUserName: string): Promise<boolean> {
    await this.cognitoService.enableUser(cognitoUserName);

    return true;
  }

  public async disableUser(cognitoUserName: string): Promise<boolean> {
    await this.cognitoService.disableUser(cognitoUserName);

    return true;
  }

  public async deleteUser(cognitoUserName: string): Promise<boolean> {
    await this.cognitoService.deleteUser(cognitoUserName);

    return true;
  }

  private convertCognitoUserToModel(
    cognitoUser: CognitoIdentityServiceProvider.AdminGetUserResponse | CognitoIdentityServiceProvider.GetUserResponse,
  ): ICognitoUserModel {
    if (!cognitoUser.UserAttributes || cognitoUser.UserAttributes.length < 1) {
      throw new Error('The Cognito user has no user attributes.');
    }

    const emailAttribute = cognitoUser.UserAttributes.find((userAttribute) => userAttribute.Name === 'email');
    const emailVerifiedAttribute = cognitoUser.UserAttributes.find(
      (userAttribute) => userAttribute.Name === 'email_verified',
    );
    const phoneNumberAttribute = cognitoUser.UserAttributes.find(
      (userAttribute) => userAttribute.Name === 'phone_number',
    );
    const phoneNumberVerifiedAttribute = cognitoUser.UserAttributes.find(
      (userAttribute) => userAttribute.Name === 'phone_number_verified',
    );
    const nicknameAttribute = cognitoUser.UserAttributes.find((userAttribute) => userAttribute.Name === 'nickname');
    const localeAttribute = cognitoUser.UserAttributes.find((userAttribute) => userAttribute.Name === 'locale');
    const genderAttribute = cognitoUser.UserAttributes.find((userAttribute) => userAttribute.Name === 'gender');

    const userName = cognitoUser.Username;
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

    const model: ICognitoUserModel = {
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

  private convertUpdateCognitoUserInputModelToCognitoUserAttributes(
    updateCognitoUserInputModel: Partial<IUpdateCognitoUserInputModel>,
  ): CognitoIdentityServiceProvider.AttributeType[] {
    const phoneNumber = updateCognitoUserInputModel.phoneNumber;
    const nickname = updateCognitoUserInputModel.nickname;
    const locale = updateCognitoUserInputModel.locale;
    const gender = updateCognitoUserInputModel.gender;

    const cognitoUserAttributes: CognitoIdentityServiceProvider.AttributeType[] = [
      { Name: 'phone_number', Value: !isEmpty(phoneNumber) ? String(phoneNumber) : undefined },
      { Name: 'nickname', Value: !isEmpty(nickname) ? String(nickname) : undefined },
      { Name: 'locale', Value: !isEmpty(locale) ? String(locale) : undefined },
      { Name: 'gender', Value: !isEmpty(gender) ? String(gender) : undefined },
    ].filter((cognitoUserAttribute) => !!cognitoUserAttribute.Value);

    return cognitoUserAttributes;
  }
}
