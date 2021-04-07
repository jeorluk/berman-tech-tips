import { useState, useEffect, createContext } from 'react'
import Router from 'next/router'
const ModalContext = createContext()

const ModalContextProvider = (props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [component, setComponent] = useState(null)

  useEffect(() => {
    const resetModal = () => {
      setIsVisible(false)
      setComponent(null)
    }

    //Add event listener for escape key to reset modal
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        resetModal()
      }
    })

    //Add listener for route change to reset modal
    Router.events.on('routeChangeStart', resetModal)

    //Remove listeners in cleanup
    return () => {
      document.body.removeEventListener('keydown', resetModal)
      Router.events.off('routeChangeStart', resetModal)
    }
  }, [])

  return (
    <ModalContext.Provider
      value={{ isVisible, setIsVisible, component, setComponent }}
    >
      {props.children}
    </ModalContext.Provider>
  )
}

export { ModalContext, ModalContextProvider }
