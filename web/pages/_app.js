import GlobalStyle from '../styles/Global'
import { Provider } from 'next-auth/client'
import { FilterContextProvider } from '../context/filterContext'
import { ModalContextProvider } from '../context/modalContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <GlobalStyle /> */}
      <FilterContextProvider>
        <ModalContextProvider>
          <Provider session={pageProps.session}>
            <Component {...pageProps} />
          </Provider>
        </ModalContextProvider>
      </FilterContextProvider>
    </>
  )
}

export default MyApp
