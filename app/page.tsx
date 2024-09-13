import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(`${process.env.HOST_URL}/api`);
  return {
    title: "Degen token price and volume checker",
    description: "Degen token price and volume checker",
    other: frameTags,
  };
}

export default function Home() {
  return (
    <h2>
      Detailed information <a href="https://www.coingecko.com/hu/coins/degen-base">here</a>
    </h2>
  );
}
