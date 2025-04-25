import { Hono } from "hono";
import { handle } from "hono/vercel";

import { serve } from "@hono/node-server";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

// 開発環境でのみ実行されるサーバー設定

const port = 8080;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default handle(app);
