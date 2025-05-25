import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js", // o la ruta correcta
      name: "MyLib",
      fileName: "my-lib",
    },
  },
});
