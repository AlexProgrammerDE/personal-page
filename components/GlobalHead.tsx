import Head from "next/head";

export default function GlobalHead() {
    const seoTitle = "AlexProgrammerDE"
    const seoDescription = "Coding as a hobby and creating cool stuff!"
    const url = "https://pistonmaster.net/";
    const pfp = "https://pistonmaster.net/pfp.png";

    return (
        <Head>
            <title>{seoTitle}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta name="description" content={seoDescription} />
            <link rel="icon" href="/favicon.ico" />

            <meta name="og:type" content="website" />
            <meta name="og:url" content={url} />
            <meta name="og:title" content={seoTitle} />
            <meta name="og:url" content={url} />
            <meta name="og:description" content={seoDescription} />
            <meta name="og:image" content={pfp} />

            <meta name="theme-color" content={"#0E6AC7"} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            <meta name="twitter:image" content={pfp} />
            <meta name="twitter:image:alt" content="AlexProgrammerDE profile picture" />

            <meta name="format-detection" content="telephone=no" />
        </Head>
    );
}
