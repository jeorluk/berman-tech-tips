import GlobalStyle from '../styles/Global'
import { SessionProvider } from 'next-auth/react'
import { FilterContextProvider } from '../context/filterContext'
import { ModalContextProvider } from '../context/modalContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <GlobalStyle /> */}
      <FilterContextProvider>
        <ModalContextProvider>
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
          </SessionProvider>
        </ModalContextProvider>
      </FilterContextProvider>
    </>
  )
}

export default MyApp
