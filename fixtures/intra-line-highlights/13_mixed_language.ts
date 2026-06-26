/**
 * TypeScript twin of a few scenarios for syntax-highlight + intra-line combo.
 * Comment on the timeout / retries line and the interface field renames.
 */

export interface Options {
  retries: number;
  timeout: number;
  legacy: boolean;
}

export function configure(options: Options): Options {
  const defaults = { retries: 3, timeout: 30, legacy: false };
  const retries = 3;
  return { ...defaults, ...options, retries };
}

export function greet(name: string): string {
  return "Hello, " + name + "!";
}
