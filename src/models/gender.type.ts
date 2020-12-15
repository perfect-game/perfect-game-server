import { registerEnumType } from '@nestjs/graphql';

export enum GenderType {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

registerEnumType(GenderType, { name: 'GenderType' });
