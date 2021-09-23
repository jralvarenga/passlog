import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { EmotionCache } from '@emotion/utils'
import { createEmotionCache } from '../src/services/createEmotionCache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme } from '../src/services/theme'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {

  return (
    <CacheProvider value={emotionCache}>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}
export default MyApp
