import { useContext } from 'react'
import { ModalContext } from '../context/modalContext'

export default function useModal() {
  const { isVisible, setIsVisible, component, setComponent } = useContext(
    ModalContext
  )

  return { isVisible, setIsVisible, component, setComponent }
}
