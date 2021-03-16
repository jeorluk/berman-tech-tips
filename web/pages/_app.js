import GlobalStyle from '../styles/Global'
import { Provider } from 'next-auth/client'
import { FilterContextProvider } from '../context/filterContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <FilterContextProvider>
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </FilterContextProvider>
    </>
  )
}

export default MyApp
