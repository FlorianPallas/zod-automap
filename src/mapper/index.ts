import { z } from "zod";
import { meta } from "../meta";

export * from "./dateToISOString";

export class Mapper<
  Raw extends z.ZodType = z.ZodType,
  Mapped extends z.ZodType = z.ZodType,
> {
  constructor(
    private _type: {
      raw: Raw;
      mapped: Mapped;
    },
    private _value: {
      toRaw: (value: z.infer<Mapped>) => z.infer<Raw>;
      toMapped: (value: z.infer<Raw>) => z.infer<Mapped>;
    }
  ) {}

  public mapped() {
    return meta(this._type.mapped, {
      autoMap: {
        mapper: this as Mapper<Raw, Mapped>,
        state: "mapped" as const,
      },
    });
  }

  public toMapped(value: z.infer<Raw>) {
    return this._value.toMapped(value);
  }

  public raw() {
    return meta(this._type.raw, {
      autoMap: {
        mapper: this as Mapper<Raw, Mapped>,
        state: "raw" as const,
      },
    });
  }

  public toRaw(value: z.infer<Raw>) {
    return this._value.toRaw(value);
  }
}
