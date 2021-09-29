import Head from 'next/head'
import React from 'react'
import { darkTheme } from '../services/theme'

interface HeaderProps {
  name?: string
}

const Header = ({ name }: HeaderProps) => (
  <Head>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Passlog {name && `| ${name}`}</title>
    <meta name="theme-color" content={darkTheme.palette.primary.main} />
  </Head>
)

export default Header