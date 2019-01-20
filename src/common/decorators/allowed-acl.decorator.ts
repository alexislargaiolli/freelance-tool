
import { ReflectMetadata } from '@nestjs/common';
import { CrudActions } from '@nestjsx/crud';

export const AllowedACL = (...allowedACL: CrudActions[]) => ReflectMetadata('AllowedACL', allowedACL);
