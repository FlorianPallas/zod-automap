import { assertType, describe, expect, test } from "vitest";
import { z } from "zod";
import {
  primitiveToMapped,
  primitiveToRaw,
  primitiveToMappedValue,
  primitiveToRawValue,
} from "./primitive";
import { AutoMapMeta, AutoMapType } from "../meta";
import { dateToISOString } from "../mapper/dateToISOString";

describe("primitive", () => {
  const date = dateToISOString.raw();
  const dateString = dateToISOString.mapped();

  test("toMapped", () => {
    const mappedDate = primitiveToMapped(date);
    const mappedDateString = primitiveToMapped(dateString);

    expect(mappedDate).toEqual(expect.any(z.ZodString));
    expect(mappedDate._def.autoMap).toEqual({
      mapper: dateToISOString,
      state: "mapped",
    });
    assertType<z.ZodString & AutoMapType<AutoMapMeta<any, any, "mapped">>>(
      mappedDate
    );

    expect(mappedDateString).toEqual(expect.any(z.ZodString));
    expect(mappedDateString._def.autoMap).toEqual({
      mapper: dateToISOString,
      state: "mapped",
    });
    assertType<z.ZodString & AutoMapType<AutoMapMeta<any, any, "mapped">>>(
      mappedDateString
    );
  });

  test("toRaw", () => {
    const rawDate = primitiveToRaw(date);
    const rawDateString = primitiveToRaw(dateString);

    expect(rawDate).toEqual(expect.any(z.ZodDate));
    expect(rawDate._def.autoMap).toEqual({
      mapper: dateToISOString,
      state: "raw",
    });
    assertType<z.ZodDate & AutoMapType<AutoMapMeta<any, any, "raw">>>(rawDate);

    expect(rawDateString).toEqual(expect.any(z.ZodDate));
    expect(rawDateString._def.autoMap).toEqual({
      mapper: dateToISOString,
      state: "raw",
    });
    assertType<z.ZodDate & AutoMapType<AutoMapMeta<any, any, "raw">>>(
      rawDateString
    );
  });

  test("toMappedValue", () => {
    const mappedDate = primitiveToMappedValue(
      date,
      new Date("2000-01-01T00:00:00.000Z")
    );
    const mappedDateString = primitiveToMappedValue(
      dateString,
      "2000-01-01T00:00:00.000Z"
    );

    expect(mappedDate).toEqual("2000-01-01T00:00:00.000Z");
    assertType<string>(mappedDate);

    expect(mappedDateString).toEqual("2000-01-01T00:00:00.000Z");
    assertType<string>(mappedDateString);
  });

  test("toRawValue", () => {
    const rawDate = primitiveToRawValue(
      date,
      new Date("2000-01-01T00:00:00.000Z")
    );
    const rawDateString = primitiveToRawValue(
      dateString,
      "2000-01-01T00:00:00.000Z"
    );

    expect(rawDate).toEqual(new Date("2000-01-01T00:00:00.000Z"));
    assertType<Date>(rawDate);

    expect(rawDateString).toEqual(new Date("2000-01-01T00:00:00.000Z"));
    assertType<Date>(rawDateString);
  });
});
