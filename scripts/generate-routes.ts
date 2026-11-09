import { Generator, getConfig } from "@tanstack/router-generator";

await new Generator({ config: getConfig(), root: process.cwd() }).run();
