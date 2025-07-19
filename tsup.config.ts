import { defineConfig } from "tsup";

 
export default defineConfig({
     entry: ["src/server.ts"],
     outDir: "dist",
     format: ["esm"],
     sourcemap: true,
     clean: true,
});
