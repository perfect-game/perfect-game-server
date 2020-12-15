import { GenderType } from '@app/models/gender.type';
import { LocaleType } from '@app/models/locale.type';

export interface ICognitoUserModel {
  userName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  nickname: string;
  locale: LocaleType;
  gender: GenderType;
}
