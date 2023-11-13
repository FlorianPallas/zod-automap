import { describe, expect, test, assertType } from "vitest";
import { z } from "zod";
import { AutoMapMeta, AutoMapType } from "../meta";
import {
  objectToMapped,
  objectToRaw,
  objectToMappedValue,
  objectToRawValue,
} from "./object";
import { dateToISOString } from "../mapper/dateToISOString";

describe("object", () => {
  const user = z.object({
    id: z.string(),
    name: z.string(),
    date: dateToISOString.raw(),
    nested: z.object({
      id: z.string(),
      name: z.string(),
      date: dateToISOString.mapped(),
    }),
  });

  const mappedUser = objectToMapped(user);
  const rawUser = objectToRaw(user);

  test("toMapped", () => {
    expect(mappedUser.shape).toEqual({
      id: expect.any(z.ZodString),
      name: expect.any(z.ZodString),
      date: expect.any(z.ZodString),
      nested: expect.any(Object),
    });
    expect(mappedUser.shape.date._def.autoMap).toEqual({
      mapper: dateToISOString,
      state: "mapped",
    });
    expect(mappedUser.shape.nested.shape).toEqual({
      id: expect.any(z.ZodString),
      name: expect.any(z.ZodString),
      date: expect.any(z.ZodString),
    });
    expect(mappedUser.shape.nested.shape.date._def.autoMap).toEqual({
      mapper: dateToISOString,
      state: "mapped",
    });

    assertType<{
      id: z.ZodString;
      name: z.ZodString;
      date: z.ZodString & AutoMapType<AutoMapMeta<any, any, "mapped">>;
    }>(mappedUser.shape);
    assertType<{
      id: z.ZodString;
      name: z.ZodString;
      date: z.ZodString & AutoMapType<AutoMapMeta<any, any, "mapped">>;
    }>(mappedUser.shape.nested.shape);
  });

  test("toRaw", () => {
    expect(rawUser.shape).toEqual({
      id: expect.any(z.ZodString),
      name: expect.any(z.ZodString),
      date: expect.any(z.ZodDate),
      nested: expect.any(Object),
    });
    expect(rawUser.shape.date._def.autoMap).toEqual({
      mapper: dateToISOString,
      state: "raw",
    });
    expect(rawUser.shape.nested.shape).toEqual({
      id: expect.any(z.ZodString),
      name: expect.any(z.ZodString),
      date: expect.any(z.ZodDate),
    });
    expect(rawUser.shape.nested.shape.date._def.autoMap).toEqual({
      mapper: dateToISOString,
      state: "raw",
    });

    assertType<{
      id: z.ZodString;
      name: z.ZodString;
      date: z.ZodDate & AutoMapType<AutoMapMeta<any, any, "raw">>;
    }>(rawUser.shape);
    assertType<{
      id: z.ZodString;
      name: z.ZodString;
      date: z.ZodDate & AutoMapType<AutoMapMeta<any, any, "raw">>;
    }>(rawUser.shape.nested.shape);
  });

  test("toMappedValue", () => {
    const mappedFromMapped = objectToMappedValue(mappedUser, {
      id: "1234",
      name: "John",
      date: "2000-01-01T00:00:00.000Z",
      nested: {
        id: "1234",
        name: "John",
        date: "2000-01-01T00:00:00.000Z",
      },
    });
    const mappedFromRaw = objectToMappedValue(rawUser, {
      id: "1234",
      name: "John",
      date: new Date("2000-01-01T00:00:00.000Z"),
      nested: {
        id: "1234",
        name: "John",
        date: new Date("2000-01-01T00:00:00.000Z"),
      },
    });

    expect(mappedFromMapped).toEqual({
      id: "1234",
      name: "John",
      date: "2000-01-01T00:00:00.000Z",
      nested: {
        id: "1234",
        name: "John",
        date: "2000-01-01T00:00:00.000Z",
      },
    });
    assertType<{
      id: string;
      name: string;
      date: string;
      nested: {
        id: string;
        name: string;
        date: string;
      };
    }>(mappedFromMapped);

    expect(mappedFromRaw).toEqual({
      id: "1234",
      name: "John",
      date: "2000-01-01T00:00:00.000Z",
      nested: {
        id: "1234",
        name: "John",
        date: "2000-01-01T00:00:00.000Z",
      },
    });
    assertType<{
      id: string;
      name: string;
      date: string;
      nested: {
        id: string;
        name: string;
        date: string;
      };
    }>(mappedFromRaw);
  });

  test("toRawValue", () => {
    const rawFromMapped = objectToRawValue(mappedUser, {
      id: "1234",
      name: "John",
      date: "2000-01-01T00:00:00.000Z",
      nested: {
        id: "1234",
        name: "John",
        date: "2000-01-01T00:00:00.000Z",
      },
    });
    const rawFromRaw = objectToRawValue(rawUser, {
      id: "1234",
      name: "John",
      date: new Date("2000-01-01T00:00:00.000Z"),
      nested: {
        id: "1234",
        name: "John",
        date: new Date("2000-01-01T00:00:00.000Z"),
      },
    });

    expect(rawFromMapped).toEqual({
      id: "1234",
      name: "John",
      date: new Date("2000-01-01T00:00:00.000Z"),
      nested: {
        id: "1234",
        name: "John",
        date: new Date("2000-01-01T00:00:00.000Z"),
      },
    });
    assertType<{
      id: string;
      name: string;
      date: Date;
      nested: {
        id: string;
        name: string;
        date: Date;
      };
    }>(rawFromMapped);

    expect(rawFromRaw).toEqual({
      id: "1234",
      name: "John",
      date: new Date("2000-01-01T00:00:00.000Z"),
      nested: {
        id: "1234",
        name: "John",
        date: new Date("2000-01-01T00:00:00.000Z"),
      },
    });
    assertType<{
      id: string;
      name: string;
      date: Date;
      nested: {
        id: string;
        name: string;
        date: Date;
      };
    }>(rawFromRaw);
  });
});
