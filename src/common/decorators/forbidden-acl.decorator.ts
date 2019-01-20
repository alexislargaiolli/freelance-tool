
import { ReflectMetadata } from '@nestjs/common';
import { CrudActions } from '@nestjsx/crud';

export const ForbiddenACL = (...forbiddenACL: CrudActions[]) => ReflectMetadata('ForbiddenACL', forbiddenACL);
