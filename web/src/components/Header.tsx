import Head from 'next/head'
import React from 'react'

interface HeaderProps {
  name?: string
}

const Header = ({ name }: HeaderProps) => (
  <Head>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    {/*<title>Passlog {name && `| ${name}`}</title>*/}
    <title>Passlog - Password Manager & Notes</title>
    <meta name="title" content="Passlog - Password Manager & Notes" />
    <meta name="description" content="Save all your private data like passwords, notes & cards and keep them safe in one place, Passlog is the open source proyect were you can store all your sensitive information and stop worrying about it." />

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
)

export default Header