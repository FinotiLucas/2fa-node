import { configure, processCLIArgs, run } from "@japa/runner";
import { assert } from "@japa/assert";
import { expectTypeOf } from "@japa/expect-type";
import { expect } from "@japa/expect";

processCLIArgs(process.argv.splice(2));
configure({
  files: ["tests/**/*.spec.ts"],
  plugins: [assert(), expect(), expectTypeOf()],
});

run();
