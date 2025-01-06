import { Html, Main, NextScript, Head } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="title"
          content="ZanMart - Online Shopping for Zan Products"
        />
        <title >ZanMart - Online Shopping for Zan Products</title>
        <meta
          name="description"
          content="Discover a wide range of Zan products at ZanMart.com. Shop online for the best deals and premium quality."
        />
        <meta
          property="og:title"
          content="ZanMart - Online Shopping for Zan Products"
        />
        <meta
          property="og:description"
          content="Discover a wide range of Zan products at ZanMart.com. Shop online for the best deals and premium quality."
        />
        <meta
          property="og:image"
          content="https://zanmart.com/images/logo.png"
        />
        <meta property="og:url" content="https://zanmart.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
