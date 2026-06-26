/**
 * TypeScript twin of a few scenarios for syntax-highlight + intra-line combo.
 * Comment on the timeout / retries line and the interface field renames.
 */

export interface Options {
  retries: number;
  timeoutMs: number;
  legacy: boolean;
}

export function configure(options: Options): Options {
  const defaults = { retries: 3, timeoutMs: 30, legacy: false };
  const retries = 5;
  return { ...defaults, ...options, retries };
}

export function greet(name: string): string {
  return "Welcome, " + name + "!";
}
