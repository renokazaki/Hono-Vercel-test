import { Hono } from "hono";
import { handle } from "hono/vercel";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({ message: "Hello Hono!" });
});

// 開発環境でのみ実行される部分
if (process.env.npm_lifecycle_event === "dev") {
  // 動的インポートで開発環境用のモジュールを読み込む
  import("@hono/node-server").then(({ serve }) => {
    const port = 8085;
    console.log(`Server is running on http://localhost:${port}`);

    serve({
      fetch: app.fetch,
      port,
    });
  });
}

export default handle(app);
