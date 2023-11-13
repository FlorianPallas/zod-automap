import { assertType, describe, expect, test } from "vitest";
import { z } from "zod";
import { AutoMapMeta, AutoMapType } from "../meta";
import {
  arrayToMapped,
  arrayToRaw,
  arrayToMappedValue,
  arrayToRawValue,
} from "./array";
import { dateToISOString } from "../mapper/dateToISOString";

describe("array", () => {
  const dates = z.array(dateToISOString.raw());
  const dateStrings = z.array(dateToISOString.mapped());

  test("toMapped", () => {
    const mappedDates = arrayToMapped(dates);
    const mappedDateStrings = arrayToMapped(dateStrings);

    expect(mappedDates).toEqual(expect.any(z.ZodArray));
    expect(mappedDates.element).toEqual(expect.any(z.ZodString));
    expect(mappedDates.element._def.autoMap).toEqual({
      mapper: dateToISOString,
      state: "mapped",
    });
    assertType<
      z.ZodArray<z.ZodString & AutoMapType<AutoMapMeta<any, any, "mapped">>>
    >(mappedDates);

    expect(mappedDateStrings).toEqual(expect.any(z.ZodArray));
    expect(mappedDateStrings.element).toEqual(expect.any(z.ZodString));
    expect(mappedDateStrings.element._def.autoMap).toEqual({
      mapper: dateToISOString,
      state: "mapped",
    });
    assertType<
      z.ZodArray<z.ZodString & AutoMapType<AutoMapMeta<any, any, "mapped">>>
    >(mappedDateStrings);
  });

  test("toRaw", () => {
    const rawDates = arrayToRaw(dates);
    const rawDateStrings = arrayToRaw(dateStrings);

    expect(rawDates).toEqual(expect.any(z.ZodArray));
    expect(rawDates.element).toEqual(expect.any(z.ZodDate));
    expect(rawDates.element._def.autoMap).toEqual({
      mapper: dateToISOString,
      state: "raw",
    });
    assertType<
      z.ZodArray<z.ZodDate & AutoMapType<AutoMapMeta<any, any, "raw">>>
    >(rawDates);

    expect(rawDateStrings).toEqual(expect.any(z.ZodArray));
    expect(rawDateStrings.element).toEqual(expect.any(z.ZodDate));
    expect(rawDateStrings.element._def.autoMap).toEqual({
      mapper: dateToISOString,
      state: "raw",
    });
    assertType<
      z.ZodArray<z.ZodDate & AutoMapType<AutoMapMeta<any, any, "raw">>>
    >(rawDateStrings);
  });

  test("toMappedValue", () => {
    const mappedDates = arrayToMappedValue(dates, [
      new Date("2000-01-01T00:00:00.000Z"),
      new Date("2000-01-02T00:00:00.000Z"),
      new Date("2000-01-03T00:00:00.000Z"),
    ]);
    const mappedDateStrings = arrayToMappedValue(dateStrings, [
      "2000-01-01T00:00:00.000Z",
      "2000-01-02T00:00:00.000Z",
      "2000-01-03T00:00:00.000Z",
    ]);

    expect(mappedDates).toEqual([
      "2000-01-01T00:00:00.000Z",
      "2000-01-02T00:00:00.000Z",
      "2000-01-03T00:00:00.000Z",
    ]);
    assertType<string[]>(mappedDates);

    expect(mappedDateStrings).toEqual([
      "2000-01-01T00:00:00.000Z",
      "2000-01-02T00:00:00.000Z",
      "2000-01-03T00:00:00.000Z",
    ]);
    assertType<string[]>(mappedDateStrings);
  });

  test("toRawValue", () => {
    const rawDates = arrayToRawValue(dates, [
      new Date("2000-01-01T00:00:00.000Z"),
      new Date("2000-01-02T00:00:00.000Z"),
      new Date("2000-01-03T00:00:00.000Z"),
    ]);
    const rawDateStrings = arrayToRawValue(dateStrings, [
      "2000-01-01T00:00:00.000Z",
      "2000-01-02T00:00:00.000Z",
      "2000-01-03T00:00:00.000Z",
    ]);

    expect(rawDates).toEqual([
      new Date("2000-01-01T00:00:00.000Z"),
      new Date("2000-01-02T00:00:00.000Z"),
      new Date("2000-01-03T00:00:00.000Z"),
    ]);
    assertType<Date[]>(rawDates);

    expect(rawDateStrings).toEqual([
      new Date("2000-01-01T00:00:00.000Z"),
      new Date("2000-01-02T00:00:00.000Z"),
      new Date("2000-01-03T00:00:00.000Z"),
    ]);
    assertType<Date[]>(rawDateStrings);
  });
});
