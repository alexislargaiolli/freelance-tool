
import { ReflectMetadata } from '@nestjs/common';

export const UserParameter = (userParameter: string) => ReflectMetadata('UserParameter', userParameter);
