import { Hono } from "hono";
import { cache } from "hono/cache";
import { z } from "zod";

import { FredokaOne } from "./fonts/fredoka-one";
import { generateImage } from "./generate-image";
import { LGTM } from "./lgtm";

const app = new Hono();
const schema = z.object({
  width: z
    .string()
    .default("500")
    .transform((x) => parseInt(x)),
  height: z
    .string()
    .default("300")
    .transform((x) => parseInt(x)),
  color: z.string().optional(),
  shadow: z.string().optional(),
  url: z.string().optional(),
});

app.get("*", cache({ cacheName: "lgtm/workers", cacheControl: "max-age=3600" }));
app.get("/", async (c) => {
  const result = schema.safeParse(c.req.query());
  if (!result.success) {
    return c.text("Invalid!", 400);
  }

  const size = {
    width: result.data.width,
    height: result.data.height,
  };

  const img = await generateImage(
    <LGTM {...result.data} src={result.data.url ?? `http://placekitten.com/${size.width}/${size.height}`} />,
    {
      ...size,
      fonts: [{ name: "Fredoka One", data: FredokaOne.regular, weight: 400, style: "normal" }],
    }
  );

  return c.body(img, undefined, { "Content-Type": "image/webp" });
});

export default app;
