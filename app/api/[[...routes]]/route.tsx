/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from "frog";
import { handle } from "frog/next";
import path from "path";
import { readFileSync } from "fs";
import { DegenTokenPrice } from "@/components/DegenTokenPrice";
import { Degen } from "@/lib/Degen";

const fontPath = path.resolve("public/fonts/ibm_plex_mono_semi_bold.ttf");
const ibmPlexMonoSemiBold = readFileSync(fontPath);

const app = new Frog({
  basePath: "/api",
  imageOptions: {
    fonts: [
      {
        name: "IBM_PLEX_MONO",
        data: ibmPlexMonoSemiBold,
        style: "normal",
        weight: 500,
      },
    ],
  },
});

app.frame("/", async (c) => {
  const stats = await Degen.getStats();

  return c.res({
    image: (
      <DegenTokenPrice
        tokenPriceUsd={stats.tokenPriceUsd}
        volumeUsd={stats.volumeUsd}
        lastUpdatedAt={stats.lastUpdatedAt}
      />
    ),
    intents: [
      <Button action="/">Refresh</Button>,
      <Button.Redirect
        location={encodeURI(
          `https://warpcast.com/~/compose?embeds[]=${process.env.HOST_URL}`
        )}
      >
        Share it
      </Button.Redirect>,
    ],
  });
});

export const GET = handle(app);
export const POST = handle(app);
