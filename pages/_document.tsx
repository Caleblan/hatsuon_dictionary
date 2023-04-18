import { Html, Head, Main, NextScript} from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="calandry" data-description="Support me on Buy me a coffee!" data-message="" data-color="#FF5F5F" data-position="Right" data-x_margin="18" data-y_margin="18" async></script>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
