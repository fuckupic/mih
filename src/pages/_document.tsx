import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/zvq1bxv.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/xkk8bsk.css"
        ></link>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.0/MotionPathPlugin.min.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
