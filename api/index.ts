import { Hono } from "hono";
import { handle } from "hono/vercel";
import dotenv from "dotenv";

import { serve } from "@hono/node-server";
// 環境変数を読み込む
dotenv.config();
export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({ message: "Hello Hono!" });
});

// 開発環境でのみ実行されるサーバー設定
// NODE_ENVがdevelopmentの場合のみサーバーを起動
if (process.env.NODE_ENV === "development") {
  const port = 8080;
  console.log(`Server is running on http://localhost:${port}`);

  serve({
    fetch: app.fetch,
    port,
  });
}

export default handle(app);
