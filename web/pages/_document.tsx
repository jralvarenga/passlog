import * as React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import { createEmotionCache } from '../src/services/createEmotionCache'
import Header from '../src/components/Header'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="title" content="Passlog - Password Manager & Notes" />
          <meta name="description" content="Save all your private data like passwords, notes & cards and keep them safe in one place, Passlog is the open source proyect were you can store all your sensitive information and stop worrying about it." />
          <meta name="keywords" content="password,manager,notes,storage,encryption,encrypt,contraseña,contrasena,administrador,notas" />

          {/*<!-- Open Graph / Facebook -->*/}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://passlog.vercel.app/" />
          <meta property="og:title" content="Passlog - Password Manager & Notes" />
          <meta property="og:description" content="Save all your private data like passwords, notes & cards and keep them safe in one place, Passlog is the open source proyect were you can store all your sensitive information and stop worrying about it." />
          <meta property="og:image" content="https://passlog.vercel.app/assets/img/meta_img.png" />

          {/*<!-- Twitter -->*/}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://passlog.vercel.app/" />
          <meta property="twitter:title" content="Passlog - Password Manager & Notes" />
          <meta property="twitter:description" content="Save all your private data like passwords, notes & cards and keep them safe in one place, Passlog is the open source proyect were you can store all your sensitive information and stop worrying about it." />
          <meta property="twitter:image" content="https://passlog.vercel.app/assets/img/meta_img.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => function EnhancedApp(props: any) {
        return <App emotionCache={cache} {...props} />
      },
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  }
} 