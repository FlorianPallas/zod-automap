import { z } from "zod";
import { ToMapped, ToRaw, toMapped, toMappedValue, toRaw, toRawValue } from ".";

export type ObjectToRaw<T extends z.SomeZodObject> = z.ZodObject<{
  [K in keyof T["shape"]]: ToRaw<T["shape"][K]>;
}>;

export type ObjectToMapped<T extends z.SomeZodObject> = z.ZodObject<{
  [K in keyof T["shape"]]: ToMapped<T["shape"][K]>;
}>;

/**
 *
 */
export const objectToRaw = <T extends z.SomeZodObject>(object: T) =>
  z.object(
    Object.entries(object.shape).reduce(
      (acc, [key, type]) => ({ ...acc, [key]: toRaw(type) }),
      {} as ObjectToRaw<T>["shape"]
    )
  ) as ObjectToRaw<T>;

/**
 *
 */
export const objectToMapped = <T extends z.SomeZodObject>(object: T) =>
  z.object(
    Object.entries(object.shape).reduce(
      (acc, [key, type]) => ({ ...acc, [key]: toMapped(type) }),
      {} as ObjectToMapped<T>["shape"]
    )
  ) as ObjectToMapped<T>;

/**
 *
 */
export const objectToRawValue = <T extends z.SomeZodObject>(
  type: T,
  value: z.infer<T>
) =>
  Object.entries(value).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: toRawValue(type.shape[key]!, value),
    }),
    {} as z.infer<ObjectToRaw<T>>
  );

/**
 *
 */
export const objectToMappedValue = <T extends z.SomeZodObject>(
  type: T,
  value: z.infer<T>
) =>
  Object.entries(value).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: toMappedValue(type.shape[key]!, value),
    }),
    {} as z.infer<ObjectToMapped<T>>
  );
