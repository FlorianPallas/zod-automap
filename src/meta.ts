import { z } from "zod";
import { Mapper } from "./mapper";

export type AutoMapMeta<
  Raw extends z.ZodType = z.ZodType,
  Mapped extends z.ZodType = z.ZodType,
  State extends "mapped" | "raw" = "mapped" | "raw",
> = { mapper: Mapper<Raw, Mapped>; state: State };
export type AutoMapMetaAny = AutoMapMeta<any, any, any>;

export type AutoMapType<M extends AutoMapMeta = AutoMapMetaAny> = {
  _def: { autoMap: M };
};
export type AutoMapTypeAny = { _def: { autoMap: AutoMapMetaAny } };

export const meta = <T extends z.ZodTypeAny, U>(type: T, additional: U) => {
  const This = (type as any).constructor;
  return new This({
    ...type._def,
    ...additional,
  }) as T & { _def: Omit<T["_def"], keyof U> & U };
};
