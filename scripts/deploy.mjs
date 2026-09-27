#!/usr/bin/env node
/**
 * Deploys to Vercel as a prebuilt static project.
 *
 * The Vercel CLI cannot spawn a shell for its build step in this environment
 * ("spawn cmd.exe ENOENT"), so `vercel build` never completes. Building here and
 * uploading the result via the Build Output API sidesteps that entirely: no
 * build runs on either side.
 *
 *   node scripts/deploy.mjs
 */
import { spawn } from "node:child_process";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const output = join(root, ".vercel", "output");
const staticDir = join(output, "static");
const isWin = process.platform === "win32";
const viteBin = join(root, "node_modules", "vite", "bin", "vite.js");

const run = (command, args, options = {}) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", ...options });
    child.on("error", reject);
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} ${args.join(" ")} exited with ${code}`)),
    );
  });

const need = (path, hint) => {
  if (!existsSync(path)) throw new Error(`Missing ${path}. ${hint}`);
};

async function main() {
  need(join(root, ".vercel", "project.json"), "Run `npx vercel link --yes` first.");
  need(viteBin, "Run `npm install` first.");

  // Invoke Vite's entry point with the current Node binary rather than through a
  // `.cmd` shim — this environment cannot spawn those without a shell.
  console.log("› Building with Vite");
  await run(process.execPath, [viteBin, "build"], { cwd: root, shell: false });

  need(join(dist, "index.html"), "The build produced no index.html.");

  console.log("› Assembling .vercel/output");
  await rm(output, { recursive: true, force: true });
  await mkdir(staticDir, { recursive: true });
  await cp(dist, staticDir, { recursive: true });

  const config = {
    version: 3,
    routes: [{ handle: "filesystem" }, { src: "/.*", status: 404 }],
    crons: [],
  };
  await writeFile(join(output, "config.json"), `${JSON.stringify(config, null, 2)}\n`, "utf8");

  const bytes = (await readFile(join(staticDir, "index.html"), "utf8")).length;
  console.log(`› Uploading static output (${bytes}-byte index)`);

  const args = ["--yes", "vercel@latest", "deploy", "--prebuilt", "--prod", "--yes"];
  if (process.env.VERCEL_TOKEN) args.push(`--token=${process.env.VERCEL_TOKEN}`);

  // A shell is required here: the Vercel CLI is a `.cmd`-invoked npm package.
  await run(isWin ? "npx.cmd" : "npx", args, { cwd: root, shell: true });
}

main().catch((error) => {
  console.error(`\n✗ ${error.message}`);
  process.exit(1);
});
