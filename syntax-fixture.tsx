// ============================================================================
// syntax-fixture.tsx
// A deliberately dense TypeScript/TSX file intended to exercise as many
// syntax-highlighting token scopes as possible (comments, keywords, strings,
// template interpolation, escape sequences, regex, numerics, decorators,
// generics, enums, namespaces, JSX, tagged templates, labels, and more).
// ----------------------------------------------------------------------------
/**
 * @fileoverview Kitchen-sink fixture.
 * @author db1342
 * @see {@link https://github.com/db1342/dbk-testing}
 * @deprecated Nothing here is real; do not import.
 */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import React, { type FC, useCallback, useMemo, useState } from "react";
export * from "./re-exported";
export { default as Renamed } from "./other";

// ---------------------------------------------------------------------------
// Numeric literals in every base, with separators and BigInt.
// ---------------------------------------------------------------------------
const decimal = 1_000_000;
const float = 3.141_592_653_589_793;
const scientific = 6.022e23;
const negativeExp = 1.6e-19;
const hex = 0xff_ec_de_5e;
const octal = 0o755;
const binary = 0b1010_0001_1000_0101;
const big = 9_007_199_254_740_991n;
const infinite = Infinity;
const notANumber = NaN;

// ---------------------------------------------------------------------------
// String forms: escapes, unicode, template literals, tagged templates.
// ---------------------------------------------------------------------------
const single = 'tab\tnewline\nquote\u0027 backslash\\ done';
const dbl = "carriage\r null\0 hex\x41 unicode\u{1F600}";
const interpolated = `sum=${decimal + hex} path=${path.sep} nested=${`deep-${big}`}`;

function html(strings: TemplateStringsArray, ...values: readonly unknown[]): string {
  return strings.reduce<string>(
    (acc, chunk, i) => `${acc}${chunk}${i < values.length ? String(values[i]) : ""}`,
    "",
  );
}
const markup = html`<section data-id="${decimal}">${single}</section>`;

// ---------------------------------------------------------------------------
// Regular expressions with classes, groups, lookarounds, and flags.
// ---------------------------------------------------------------------------
const semver = /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(?:-(?<pre>[\w.]+))?$/gimsuy;
const escapeHeavy = /[\s\S]*?\b(?:foo|bar)\b(?=\s)(?!\d)\1/;

// ---------------------------------------------------------------------------
// Enums (numeric, const, string) and namespaces.
// ---------------------------------------------------------------------------
enum Direction {
  North = 0,
  East,
  South,
  West,
}

const enum Flag {
  None = 0b00,
  Read = 0b01,
  Write = 0b10,
  All = Read | Write,
}

enum MediaType {
  Json = "application/json",
  Html = "text/html",
}

namespace Geometry {
  export const TAU = Math.PI * 2;
  export interface Point<T extends number = number> {
    readonly x: T;
    readonly y: T;
  }
  export function distance(a: Point, b: Point): number {
    return Math.hypot(b.x - a.x, b.y - a.y);
  }
}

// ---------------------------------------------------------------------------
// Advanced types: unions, intersections, conditionals, mapped, template lits.
// ---------------------------------------------------------------------------
type Primitive = string | number | boolean | bigint | symbol | null | undefined;
type DeepReadonly<T> = T extends (infer U)[]
  ? readonly DeepReadonly<U>[]
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;
type EventName<T extends string> = `on${Capitalize<T>}`;
type Handlers = { [K in "click" | "hover" as EventName<K>]: () => void };

interface Entity<TId extends string | number = string> {
  readonly id: TId;
  tags: Set<string>;
  metadata?: Record<string, Primitive>;
  children: ReadonlyArray<Entity<TId>>;
}

// ---------------------------------------------------------------------------
// Decorators, access modifiers, abstract classes, generics, getters.
// ---------------------------------------------------------------------------
function sealed<T extends { new (...args: any[]): object }>(constructor: T): T {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
  return constructor;
}

function log(target: unknown, key: string | symbol, descriptor: PropertyDescriptor): void {
  const original = descriptor.value as (...args: unknown[]) => unknown;
  descriptor.value = function (this: unknown, ...args: unknown[]): unknown {
    console.debug(`call ${String(key)}(${args.map(String).join(", ")})`);
    return original.apply(this, args);
  };
}

abstract class Shape<TKind extends string> implements Geometry.Point {
  static readonly registry = new Map<string, Shape<string>>();
  public readonly x: number = 0;
  public readonly y: number = 0;
  protected abstract readonly kind: TKind;

  constructor(protected label: string) {}

  abstract area(): number;

  get describe(): string {
    return `${this.kind}:${this.label}=${this.area().toFixed(2)}`;
  }
}

@sealed
class Circle extends Shape<"circle"> {
  protected readonly kind = "circle" as const;
  #radius: number;

  constructor(label: string, radius: number) {
    super(label);
    this.#radius = radius;
  }

  @log
  override area(): number {
    return Geometry.TAU * 0.5 * this.#radius ** 2;
  }
}

// ---------------------------------------------------------------------------
// Async generators, deeply nested control flow, labels, error handling.
// ---------------------------------------------------------------------------
async function* paginate<T>(
  fetchPage: (cursor: string | null) => Promise<{ items: T[]; next: string | null }>,
): AsyncGenerator<T, void, unknown> {
  let cursor: string | null = null;
  outer: while (true) {
    const { items, next } = await fetchPage(cursor);
    for (const item of items) {
      switch (typeof item) {
        case "string":
        case "number":
          yield item;
          break;
        default:
          if (item == null) continue outer;
          yield item;
      }
    }
    if (next === null) break;
    cursor = next;
  }
}

async function process(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const raw = await readFile(path.resolve(import.meta.dirname ?? ".", "data.json"), {
      encoding: "utf-8",
    });
    const parsed: unknown = JSON.parse(raw);
    const entities = (Array.isArray(parsed) ? parsed : [parsed]) as Entity[];
    label: for (let i = 0; i < entities.length; i += 1) {
      const { id, tags, metadata = {} } = entities[i]!;
      do {
        if (tags.has("skip")) continue label;
      } while (false);
      await writeFile(`out/${id}.json`, JSON.stringify({ id, ...metadata }, null, 2));
    }
    res.statusCode = 200 as const;
    res.setHeader("content-type", MediaType.Json);
    res.end(JSON.stringify({ ok: true, count: entities.length }));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "unknown";
    res.statusCode = 500;
    res.end(`error: ${message}`);
  } finally {
    console.info("request complete", Direction.North, Flag.All);
  }
}

// ---------------------------------------------------------------------------
// JSX / TSX with attributes, expressions, fragments, spreads, and children.
// ---------------------------------------------------------------------------
interface CardProps {
  readonly title: string;
  readonly count?: number;
  readonly onSelect: (id: string) => void;
}

const Card: FC<CardProps> = ({ title, count = 0, onSelect }) => {
  const [active, setActive] = useState<boolean>(false);
  const id = useMemo(() => `card-${title.toLowerCase().replace(/\s+/g, "-")}`, [title]);
  const handleClick = useCallback(() => {
    setActive((prev) => !prev);
    onSelect(id);
  }, [id, onSelect]);

  return (
    <article
      id={id}
      className={`card ${active ? "card--active" : ""}`}
      data-count={count}
      aria-pressed={active}
      onClick={handleClick}
    >
      <h2 style={{ color: active ? "#7ee787" : "#79c0ff", fontWeight: 600 }}>{title}</h2>
      {count > 0 ? (
        <ul>
          {Array.from({ length: count }, (_, index) => (
            <li key={index}>
              Item&nbsp;#{index + 1} &mdash; {Math.pow(index, 2)}
            </li>
          ))}
        </ul>
      ) : (
        <>
          <em>Empty</em>
          {/* JSX comment node */}
        </>
      )}
    </article>
  );
};

// ---------------------------------------------------------------------------
// Solid filled square (■ U+25A0 BLACK SQUARE) in assorted syntactic slots:
// literal in comment ■, string, template, escape, char code, and JSX text.
// Progress bar: ■■■■■■□□□□
// ---------------------------------------------------------------------------
const squareLiteral = "■";
const squareEscaped = "\u25a0";
const squareCodePoint = "\u{25a0}";
const filledBar = "■".repeat(6) + "□".repeat(4);
const squareLabel = `status: ${squareLiteral} ok / ${"□"} pending`;
const squareCharCode = String.fromCharCode(0x25a0);
const ratingRow = ["■", "■", "■", "□", "□"] as const;

const SquareLegend: FC = () => (
  <ul aria-label="legend">
    <li>■ done</li>
    <li>{squareLiteral} active</li>
    <li>{`progress ${filledBar}`}</li>
  </ul>
);

// ---------------------------------------------------------------------------
// Top-level assertions, satisfies, optional chaining, nullish coalescing.
// ---------------------------------------------------------------------------
const config = {
  retries: 3,
  endpoints: ["https://example.com/a", "https://example.com/b"],
  feature: { enabled: true as boolean },
} satisfies Record<string, unknown>;

const firstEndpoint = config.endpoints?.[0] ?? "https://fallback.test";
const retries = (config as { retries?: number }).retries ?? 1;

export { Card, Circle, Direction, Geometry, paginate, process, sealed };
export default Card;
