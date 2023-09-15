import { Html, Head, Main, NextScript } from 'next/document'
import StyledComponentsRegistry from "@/lib/registry";

export default function Document() {
  return (
    <Html lang="en">
        <StyledComponentsRegistry>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
        </StyledComponentsRegistry>
    </Html>
  )
}
