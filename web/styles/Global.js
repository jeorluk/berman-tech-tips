import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
:root{
  /* Colors */
  --main-dark: hsl(220,60%,20%);
  --main-mid: hsl(220,40%,30%);
  --main-light: hsl(220,30%,35%);

  --accent-dark: hsl(19, 88%, 55%);
  --accent-mid: hsl(19, 88%, 65%);
  --accent-light: hsl(19, 88%, 75%);

  --text-light: hsl(220, 60%, 95%);
  --text-mid: hsl(220, 40%, 70%);
  --text-dark: hsl(220,60%,20%);

  /* Break Points */
  --tablet-break: 800px;
  --desktop-break: 1200px;

  /*Type sizes (Major Second for mobile) */
  --line-height: 1.2;
  --size-up-five: 1.802rem;
  --size-up-four: 1.602rem;
  --size-up-three: 1.424rem;
  --size-up-two: 1.266rem;
  --size-up-one: 1.125rem;
  --size-down-one: 0.889rem;
  --size-down-two: 0.79rem;
  --size-down-three: 0.702rem;
  
  
  @media (min-width: 800px){
  /*Type sizes (Minor Third for tablet) */
  --line-height: 1.4;
  --size-up-five: 2.488rem;
  --size-up-four: 2.074rem;
  --size-up-three: 1.728rem;
  --size-up-two: 1.44rem;
  --size-up-one: 1.2rem;
  --size-down-one: 0.833rem;
  --size-down-two: 0.694rem;
  --size-down-three: 0.579rem;
  }

  @media (min-width: 1200px){
  /*Type sizes (Major Third for desktop) */
  --line-height: 1.65;
  --size-up-five: 3.052rem;
  --size-up-four: 2.441rem;
  --size-up-three: 1.953rem;
  --size-up-two: 1.563rem;
  --size-up-one: 1.25rem;
  --size-down-one: 0.8rem;
  --size-down-two: 0.64rem;
  --size-down-three: 0.512rem;
  } 
}

html {
  font-size: 100%;
  box-sizing: border-box;
  color: var(--text-light);
}
*, *:before, *:after {
  box-sizing: border-box;
}
body {
  /* position: relative; */
min-height: 100vh; 
  width: 100%;
  background: var(--main-mid);
  padding: 0;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  line-height: 1.5;
  line-height: var(--line-height);
}


a {
  color: inherit;
    text-decoration: none;
}

button {
  font-size: inherit;
  color: inherit;
  border: none;
}

p {margin-bottom: 1rem;}
h1, h2, h3, h4, h5{
  color: var(--accent-dark);
  margin: 2.75rem 0 1.05rem;
  font-family: 'Rock Salt', cursive;
  font-weight: 400;
  line-height: 1.3;
  /* line-height: 1.15; */
}

.accent_text {
  font-family: 'Rock Salt', cursive;
  text-align: center;
}
h1, .text_hero {
  margin-top: 0;
  font-size: var(--size-up-five);
  text-align: center;
}
h2{
  margin-top: 0;
  font-size: var(--size-up-four);}
h3, .text_extra_large {font-size: var(--size-up-three);}
h4 {font-size: var(--size-up-two);}
h5,input,.text_large {font-size: var(--size-up-one);}
small, .text_small {font-size: var(--size-down-one);}
`
export default GlobalStyle
