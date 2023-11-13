import {
  AutoMap,
  MappedType,
  MappedValue,
  RawType,
  RawValue,
  getAutoMap,
} from ".";
import { AutoMapMetaAny, AutoMapType, AutoMapTypeAny } from "../meta";

export type PrimitiveToRaw<T extends AutoMapTypeAny> =
  AutoMap<T>["state"] extends "mapped" ? RawType<AutoMap<T>> : T;

export type PrimitiveToMapped<T extends AutoMapTypeAny> =
  AutoMap<T>["state"] extends "raw" ? MappedType<AutoMap<T>> : T;

/**
 *
 */
export const primitiveToRaw = <T extends AutoMapType<AutoMapMetaAny>>(
  type: T
) => {
  const autoMap = getAutoMap(type);
  return (
    autoMap ? (autoMap.state === "mapped" ? autoMap.mapper.raw() : type) : type
  ) as PrimitiveToRaw<T>;
};

/**
 *
 */
export const primitiveToMapped = <T extends AutoMapType<AutoMapMetaAny>>(
  type: T
) => {
  const autoMap = getAutoMap(type);
  return (
    autoMap ? (autoMap.state === "raw" ? autoMap.mapper.mapped() : type) : type
  ) as PrimitiveToMapped<T>;
};

/**
 *
 */
export const primitiveToRawValue = <T extends AutoMapType<AutoMapMetaAny>>(
  type: T,
  value: RawValue<MappedValue<AutoMap<T>>> | MappedValue<AutoMap<T>>
): RawValue<AutoMap<T>> => {
  const autoMap = getAutoMap(type);
  return autoMap
    ? autoMap.state === "mapped"
      ? autoMap.mapper.toRaw(value)
      : value
    : value;
};

/**
 *
 */
export const primitiveToMappedValue = <T extends AutoMapType<AutoMapMetaAny>>(
  type: T,
  value: RawValue<MappedValue<AutoMap<T>>> | MappedValue<AutoMap<T>>
): MappedValue<AutoMap<T>> => {
  const autoMap = getAutoMap(type);
  return autoMap
    ? autoMap.state === "raw"
      ? autoMap.mapper.toMapped(value)
      : value
    : value;
};
