import { ThemeProvider, CSSReset } from "@chakra-ui/core"
import { Provider as AuthProvider } from 'next-auth/client'
import { Global, css } from '@emotion/core'
import Head from "next/head"

import customTheme from '../styles/theme'

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>beepr.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CSSReset />
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  )
}

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider session={pageProps.session}>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
