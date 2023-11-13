import { z } from 'zod';
import { AutoMapMeta, AutoMapType, AutoMapTypeAny } from '../meta';
import {
  PrimitiveToMapped,
  PrimitiveToRaw,
  primitiveToMapped,
  primitiveToMappedValue,
  primitiveToRaw,
  primitiveToRawValue,
} from './primitive';
import {
  ObjectToMapped,
  ObjectToRaw,
  objectToMapped,
  objectToMappedValue,
  objectToRaw,
  objectToRawValue,
} from './object';
import {
  ArrayToMapped,
  ArrayToRaw,
  arrayToMapped,
  arrayToMappedValue,
  arrayToRaw,
  arrayToRawValue,
} from './array';

export * from './array';
export * from './object';
export * from './primitive';

export type AutoMap<T extends AutoMapType> = T['_def']['autoMap'];
export type MappedType<T extends AutoMapMeta> = ReturnType<
  T['mapper']['mapped']
>;
export type RawType<T extends AutoMapMeta> = ReturnType<T['mapper']['raw']>;
export type MappedValue<T extends AutoMapMeta> = z.infer<MappedType<T>>;
export type RawValue<T extends AutoMapMeta> = z.infer<RawType<T>>;

export const getAutoMap = <T extends AutoMapType>(type: T): AutoMap<T> =>
  type._def.autoMap;

export type ToRaw<T> = T extends z.SomeZodObject
  ? ObjectToRaw<T>
  : T extends z.ZodArray<z.ZodTypeAny>
  ? ArrayToRaw<T>
  : T extends AutoMapTypeAny
  ? PrimitiveToRaw<T>
  : T;

export type ToMapped<T> = T extends z.SomeZodObject
  ? ObjectToMapped<T>
  : T extends z.ZodArray<z.ZodTypeAny>
  ? ArrayToMapped<T>
  : T extends AutoMapTypeAny
  ? PrimitiveToMapped<T>
  : T;

/**
 *
 */
export const toRaw = <T extends z.ZodTypeAny>(type: T): ToRaw<T> => {
  switch (type._def.typeName) {
    case z.ZodFirstPartyTypeKind.ZodObject:
      return objectToRaw(type as any) as T extends z.SomeZodObject
        ? ObjectToRaw<T>
        : never;
    case z.ZodFirstPartyTypeKind.ZodArray:
      return arrayToRaw(type as any) as any;
    default:
      return type._def.autoMap ? primitiveToRaw(type as any) : type;
  }
};

/**
 *
 */
export const toMapped = <T extends z.ZodTypeAny>(type: T): ToMapped<T> => {
  switch (type._def.typeName) {
    case z.ZodFirstPartyTypeKind.ZodObject:
      return objectToMapped(type as any) as T extends z.SomeZodObject
        ? ObjectToMapped<T>
        : never;
    case z.ZodFirstPartyTypeKind.ZodArray:
      return arrayToMapped(type as any) as any;
    default:
      return type._def.autoMap ? primitiveToMapped(type as any) : type;
  }
};

/**
 *
 */
export const toRawValue = <T extends z.ZodTypeAny>(
  type: T,
  value: z.infer<T>
): z.infer<ToRaw<T>> => {
  switch (type._def.typeName) {
    case z.ZodFirstPartyTypeKind.ZodObject:
      return objectToRawValue(type as any, value);
    case z.ZodFirstPartyTypeKind.ZodArray:
      return arrayToRawValue(type as any, value);
    default:
      return type._def.autoMap ? primitiveToRawValue(type, value) : value;
  }
};

/**
 *
 */
export const toMappedValue = <T extends z.ZodTypeAny>(
  type: T,
  value: z.infer<T>
): z.infer<ToMapped<T>> => {
  switch (type._def.typeName) {
    case z.ZodFirstPartyTypeKind.ZodObject:
      return objectToMappedValue(type as any, value);
    case z.ZodFirstPartyTypeKind.ZodArray:
      return arrayToMappedValue(type as any, value);
    default:
      return type._def.autoMap ? primitiveToMappedValue(type, value) : value;
  }
};
