import { Html, Main, NextScript, Head } from "next/document";
import { GA_TRACKING_ID } from '../utils/gtag';

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
        <meta name="title" content="ZanMart - Online Shopping for Zan Products" />
        <meta
          name="description"
          content="Discover a wide range of Zan products at ZanMart.com. Shop online for the best deals and premium quality."
        />
        <meta property="og:title" content="ZanMart - Online Shopping for Zan Products" />
        <meta property="og:description" content="Discover a wide range of ZAN products at ZANMart.com. Shop online for the best deals and premium quality." />
        <meta property="og:image" content="https://zanmart.com/images/logo.png" />
        <meta property="og:url" content="https://zanmart.com" />

         {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
