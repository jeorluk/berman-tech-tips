import { useSession, signIn } from 'next-auth/client'
import React from 'react'
import styled from 'styled-components'
import Button from '../styles/Button'
const LoginGateStyles = styled.div`
  width: 100vw;
  max-width: 500px;
  margin: auto;

  clip-path: url(#splat);
  -webkit-clip-path: url(#splat);

  background: var(--main-dark);
  color: var(--text-light);

  /* max-width: 700px; */
  /* width: 100%; */
  display: flex;
  align-items: center;
  /* justify-items: center; */

  #content {
    /* border: 2px solid yellow; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 3rem;
    padding-left: 2rem;
  }
  p {
    width: 60%;
    margin: auto;
    text-align: center;
    padding-bottom: 0.5rem;
  }
  :after {
    content: '';
    display: block;
    padding-top: 100%;
  }

  /* #bighand {
    font-size: var(--size-up-three);
    transform: rotate(60deg);
  } */
  #login-button {
    margin: 0 auto;
    /* width: 100%; */
    /* background: green; */
  }
  svg {
    height: 0;
    width: 0;
    position: absolute;
  }
`
const LoginGate = ({ message = "do what you're trying to do", children }) => {
  const [session] = useSession()

  function handleSignin(e) {
    e.preventDefault()
    signIn('google')
  }

  return session ? (
    { ...children }
  ) : (
    <LoginGateStyles>
      <div id='content'>
        {/* <p id='bighand'>👆</p> */}
        <p>
          Whoops! Unfortunately, you can only {message} if you're logged in with
          your Berman staff account.
        </p>
        <Button id='login-button' onClick={handleSignin}>
          Log In
        </Button>
      </div>
      <svg className='svg'>
        <clipPath id='splat' clipPathUnits='objectBoundingBox'>
          <path d='m0.313,1 c-0.047,-0.03,0.039,-0.069,0.022,-0.01 c-0.004,0.006,-0.015,0.017,-0.022,0.01 m0.351,-0.045 c-0.025,-0.005,-0.034,-0.043,-0.058,-0.047 c-0.044,-0.009,-0.083,0.01,-0.117,0.03 c-0.02,-0.02,-0.028,-0.088,-0.071,-0.05 c-0.023,0.011,-0.05,0.081,-0.07,0.039 c0.023,-0.035,0.026,-0.083,-0.005,-0.116 c-0.017,-0.055,-0.045,-0.006,-0.073,-0.001 c-0.038,-0.015,0.004,-0.039,0.009,-0.061 c-0.038,-0.01,-0.095,-0.027,-0.078,-0.088 c-0.002,-0.037,-0.045,-0.01,-0.065,-0.022 c-0.031,-0.006,-0.02,-0.059,0.014,-0.04 c0.034,0.007,0.11,-0.01,0.062,-0.057 c-0.03,-0.033,-0.07,-0.057,-0.113,-0.042 c-0.022,0.016,-0.087,0.008,-0.067,-0.03 c0.038,-0.023,0.079,0.008,0.12,-0.001 c0.043,0.005,0.109,0.006,0.089,-0.065 c-0.018,-0.021,-0.063,-0.066,-0.014,-0.078 c0.03,0,0.059,0.022,0.085,0.004 c0.025,-0.027,0.032,-0.085,-0.001,-0.109 c-0.021,-0.018,-0.074,-0.036,-0.038,-0.073 c0.037,0.002,0.046,0.059,0.079,0.078 c0.035,0.029,0.098,0.015,0.118,-0.028 c0.004,-0.036,-0.022,-0.092,0.024,-0.102 c0.045,0.014,-0.003,0.098,0.055,0.099 c0.049,0.017,0.076,-0.03,0.115,-0.047 c0.058,0.02,-0.057,0.08,0.017,0.087 c0.044,0.012,0.075,-0.038,0.092,-0.076 c0.007,-0.018,0.011,-0.059,0.034,-0.048 c0.025,0.039,0.004,0.085,-0.022,0.112 c-0.019,0.035,0.018,0.064,0.025,0.095 c0.003,0.034,0.008,0.136,0.049,0.073 c0.021,-0.036,0.076,0.016,0.025,0.029 c-0.042,0.005,-0.017,0.066,0.016,0.068 c0.029,0.019,0.08,-0.004,0.095,0.037 c-0.006,0.048,-0.056,0.009,-0.086,0.019 c-0.051,0,-0.033,0.058,-0.015,0.091 c0.019,0.043,0.06,0.068,0.093,0.097 c0.035,0.034,-0.024,0.069,-0.04,0.026 c-0.024,-0.033,-0.054,-0.08,-0.098,-0.055 c-0.039,0.026,-0.007,0.1,-0.052,0.12 c-0.026,0.024,0.028,0.063,0.041,0.085 c0.038,0.016,0.008,0.073,-0.016,0.03 c-0.024,-0.031,-0.046,-0.065,-0.082,-0.08 c-0.046,-0.013,-0.06,0.051,-0.054,0.087 c-0.005,0.01,-0.016,0.015,-0.025,0.012 M0.168,0.924 c-0.027,-0.04,0.043,-0.068,0.07,-0.072 c-0.016,0.028,-0.032,0.083,-0.07,0.072 m0.757,-0.512 c0.006,-0.033,0.051,-0.037,0.067,-0.065 c0.03,-0.03,0.059,0.045,0.01,0.04 c-0.024,0.006,-0.054,0.027,-0.078,0.024 M0.798,0.098 c-0.023,-0.023,0.008,-0.103,0.019,-0.046 c0.004,0.011,-0.013,0.078,-0.019,0.046'></path>
        </clipPath>
      </svg>
    </LoginGateStyles>
  )
}
export default LoginGate
