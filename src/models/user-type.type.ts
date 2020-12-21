import { registerEnumType } from '@nestjs/graphql';

export enum UserTypeType {
  Normal = 'normal',
  Pro = 'Pro',
}

registerEnumType(UserTypeType, { name: 'UserTypeType' });
