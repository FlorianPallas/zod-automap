import { z } from "zod";
import { ToMapped, ToRaw, toMapped, toMappedValue, toRaw, toRawValue } from ".";

export type ArrayToRaw<T extends z.ZodArray<z.ZodTypeAny>> =
  T extends z.ZodArray<infer E> ? z.ZodArray<ToRaw<E>> : never;

export type ArrayToMapped<T extends z.ZodArray<z.ZodTypeAny>> =
  T extends z.ZodArray<infer E> ? z.ZodArray<ToMapped<E>> : never;

/**
 *
 */
export const arrayToRaw = <T extends z.ZodArray<z.ZodTypeAny>>(array: T) =>
  z.array(toRaw(array.element)) as ArrayToRaw<T>;

/**
 *
 */
export const arrayToMapped = <T extends z.ZodArray<z.ZodTypeAny>>(array: T) =>
  z.array(toMapped(array.element)) as ArrayToMapped<T>;

/**
 *
 */
export const arrayToRawValue = <T extends z.ZodArray<z.ZodTypeAny>>(
  type: T,
  value: z.infer<T>
): z.infer<ArrayToRaw<T>> =>
  value.map((value) => toRawValue(type.element, value));

/**
 *
 */
export const arrayToMappedValue = <T extends z.ZodArray<z.ZodTypeAny>>(
  type: T,
  value: z.infer<T>
): z.infer<ArrayToMapped<T>> =>
  value.map((value) => toMappedValue(type.element, value));
