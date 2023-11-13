import { z } from "zod";
import { Mapper } from ".";

const ISO_DATE_REGEX =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d+)?)(Z|[+-]\d{2}:\d{2})$/;

export const dateToISOString = new Mapper(
  {
    raw: z.date(),
    mapped: z.string().regex(ISO_DATE_REGEX),
  },
  {
    toMapped: (value) => value.toISOString(),
    toRaw: (value) => new Date(value),
  }
);
