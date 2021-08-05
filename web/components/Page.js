import React, { useContext } from 'react'
import styled from 'styled-components'
import { ModalContext } from '../context/modalContext'
import GlobalStyle from '../styles/Global'
import Footer from './Footer'
import Header from './Header'
import Modal from './Modal'

const PageStyles = styled.div`
  min-height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'main'
    'footer';

  & > header {
    grid-area: header;
  }

  & > main {
    grid-area: main;
  }

  & > footer {
    grid-area: footer;
  }
`

const Main = styled.main`
  height: 100%;
`
const Page = ({ children }) => {
  const { isVisible } = useContext(ModalContext)
  return (
    <>
      <GlobalStyle modalVisible={isVisible} />

      <PageStyles>
        <Modal />
        <Header />
        <Main>{children}</Main>
        <Footer />
      </PageStyles>
    </>
  )
}

export default Page
