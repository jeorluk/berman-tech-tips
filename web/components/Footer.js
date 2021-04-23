import React from 'react'
import styled from 'styled-components'
import RenderIcon from '../Icons/RenderIcon'
import { BermanLogo } from '../Icons'
import Nav from '../components/Nav'

const FooterStyles = styled.footer`
  color: var(--text-light);
  background: var(--main-dark);
  padding-top: 0.5rem;

  #inner {
    max-width: 1200px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      'logo'
      'contact'
      'nav'
      'line'
      'social'
      'jfgw-logo';

    justify-items: center;
    align-items: center;

    text-align: center;
    line-height: 1.5rem;

    #logo {
      /* padding: 1rem; */
      grid-area: logo;
      padding: 0 1rem;
      width: 300px;
      svg {
        height: 100%;
        width: 100%;
      }
    }
    #contact {
      margin: auto;
      grid-area: contact;
    }

    #social-links {
      /* margin: auto; */
      grid-area: social;
      a:after {
        display: none;
      }
      a {
        color: inherit;
      }
      a:hover:after {
        border: none;
      }
      svg {
        border: 1px solid var(--text-light);
        margin: 0.5rem;
        padding: 0.5rem;
        border-radius: 50%;
        height: 40px;
        width: 40px;
      }
    }
    #line {
      grid-area: line;
      width: 100%;
      height: 1px;
      background: var(--text-light);
    }
    #nav {
      grid-area: nav;
    }

    #jfgw-logo {
      grid-area: jfgw-logo;
      /* padding: 1rem; */
      margin: 1rem auto;
      justofy-self: center;
    }

    @media (min-width: 750px) {
      grid-template-columns: auto minmax(0, 1fr) auto;
      grid-template-areas:
        'logo contact social'
        'line line line'
        'nav nav jfgw-logo';
      justify-items: flex-start;
      #contact {
        margin: 0;
        justify-self: flex-start;
        text-align: left;
      }
      #nav {
        /* justify-self: flex-start; */
      }
      #social-links {
        justify-self: flex-end;
      }
    }
  }
`
const Footer = () => {
  return (
    <FooterStyles>
      <div id='inner'>
        <div id='logo'>
          <a href='https://bermanhebrewacademy.org'>
            <RenderIcon
              iconName='BermanLogo'
              title='Berman Hebrew Academy home page'
            />
          </a>
        </div>
        <p id='contact'>
          Harry A. Epstein Campus
          <br />
          13300 Arctic Avenue
          <br />
          Rockville, MD 20853
          <br />
          301-962-9400
        </p>

        <div id='social-links'>
          <a href='https://www.facebook.com/BermanHebrewAcademy'>
            <RenderIcon
              iconName='Facebook'
              title='Link to Bermman Facebook page'
            />
          </a>
          <a href='https://www.youtube.com/user/mjbha'>
            <RenderIcon iconName='Youtube' />
          </a>
          <a href='http://instagram.com/BermanHebrewAcademy'>
            <RenderIcon iconName='Instagram' />
          </a>
        </div>
        <div id='line' />
        <div id='nav'>
          {/* This is nav */}
          <Nav />
        </div>
        <img
          id='jfgw-logo'
          src='/jfgw-logo.jpeg'
          alt='Partner agency of The Jewish Federation of Greater Washington'
        />
      </div>
    </FooterStyles>
  )
}

export default Footer
