
import { ReflectMetadata } from '@nestjs/common';

export const OwnerFields = (ownerFields: string[]) => ReflectMetadata('OwnerFields', ownerFields);
