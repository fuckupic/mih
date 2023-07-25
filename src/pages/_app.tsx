import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // import the CSS

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'your-graphql-endpoint',
  cache: new InMemoryCache(),
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ToastContainer />
      <Component {...pageProps} />
    </Layout>
  )
}
