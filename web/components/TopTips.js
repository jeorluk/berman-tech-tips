import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useInterval from '../hooks/useInterval'

const TipsCarousel = styled.div`
  max-width: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  align-items: center;
  justify-content: center;
`

const Arrow = styled.button`
  position: relative;
  height: 100px;
  width: 100px;
  border: 0.5rem solid var(--main-dark);
  border-radius: 50%;
  background: var(--main-mid);

  &:after {
    content: '';
    position: abolute;
    top: 0;
    left: 0;
    height: 100px;
    width: 100px;
    border-top: 0.5rem solid inherit;
    border-right: 0.5rem solid inherit;
  }

  &:hover {
    background: red;
  }

  /* &.arrow-left {
    transform: rotate(225deg);
  }
  &.arrow-right {
    transform: skew(30deg);
  } */
`
const CenterPane = styled.div`
  margin: 1rem auto;
  height: 500px;
  width: 500px;
  max-width: 100vw;
  background: palevioletred;
`

const TopTips = () => {
  const [tips, setTips] = useState(['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4'])
  const [currentPage, setCurrentPage] = useState(0)

  useInterval(() => {
    setCurrentPage((currentPage + 1) % tips.length)
  }, 2000)

  return (
    <TipsCarousel>
      <Arrow className='arrow-left' />
      <CenterPane>{tips[currentPage]}</CenterPane>
      <Arrow className='arrow-right' />
    </TipsCarousel>
  )
}

export default TopTips
