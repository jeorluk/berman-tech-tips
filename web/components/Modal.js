import React, { useContext } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { ModalContext } from '../context/modalContext'
import Button from '../styles/Button'

const ModalStyles = styled(motion.div)`
  padding: 2rem;
  position: fixed;
  min-height: 100vh;
  width: 100vw;
  z-index: 1000;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  @media (max-width: 800px) {
    padding: 0;
    width: 100vw;
  }
`
const Inner = styled(motion.div)`
  margin: auto;
  padding: 1rem;
  max-width: 800px;
  overflow: hidden;
  border-radius: 1rem;
  background: var(--neutral-light);
  box-shadow: var(--bs);
  display: grid;
  grid-auto-flow: row;
  align-content: flex-start;
  justify-items: stretch;
  @media (max-width: 800px) {
    min-height: 100vh;
    width: 100%;
    border-radius: 0;
  }
  #close-button {
    height: 50px;
    width: 50px;
    font-size: var(--size-up-four);
    line-height: 50px;
    border-radius: 50%;
    margin: 0;
    padding: 0;
    justify-self: right;
  }
`
const variants = {
  visible: {
    scaleX: [0, 0.01, 1, 1, 1],
    scaleY: [0, 0.01, 0.01, 1, 1],
  },

  hidden: {
    scaleX: [1, 1, 1, 0.01, 0],
    scaleY: [1, 1, 0.01, 0.01, 0],
  },
}
const transition = { duration: 0.6, times: [0, 0.1, 0.5, 0.9, 1] }
const Modal = ({ children }) => {
  const { isVisible, component, setIsVisible, setComponent } = useContext(
    ModalContext
  )

  return (
    <AnimatePresence>
      {isVisible && (
        <ModalStyles
          key='modal'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
        >
          <Inner
            key='inner'
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={variants}
            transition={transition}
          >
            <Button
              id='close-button'
              onClick={() => {
                setIsVisible(false)
                setComponent(null)
              }}
            >
              {'\u00d7'}
            </Button>
            {component}
          </Inner>
        </ModalStyles>
      )}
    </AnimatePresence>
  )
}

export default Modal
