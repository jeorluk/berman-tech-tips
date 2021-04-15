import React from 'react'
import styled from 'styled-components'
import RenderIcon from '../Icons/RenderIcon'
import Link from 'next/link'
import { useSession } from 'next-auth/client'

const CategoryPageStyles = styled.div`
  .title-bar {
    background: var(--main-dark);
    width: 100%;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: max-content max-content;
    align-items: center;
    justify-content: center;
    svg {
      height: var(--size-up-five);
      width: var(--size-up-five);
      margin: 0.25rem auto;
    }

    path {
      fill: var(--text-light);
    }
  }

  ul {
    max-width: 1200px;
    /* width: clamp(200px, 800px, 1200px); */
    /* max-width: 1200px; */
    margin: auto;
    /* list-style: none; */
    padding-left: 3rem;
  }

  a {
    color: inherit;
  }

  .lock {
    display: inline-flex;
    svg {
      padding-top: 5px;
      height: 20px;
      width: 20px;
    }
    path {
      fill: var(--main-dark);
    }
  }
`
const CategoryPage = ({ category, posts }) => {
  const [session] = useSession()
  return (
    <CategoryPageStyles>
      <div className='title-bar'>
        <RenderIcon iconName={category.icon} />
        <h1>{category.title}</h1>
      </div>
      <p
        style={{
          color: 'var(--accent-dark)',
          margin: 'auto',
          maxWidth: '1200px',
          paddingTop: '1rem',
          paddingLeft: '2rem',
          fontWeight: 'bold',
        }}
      >
        <Link href='/'>
          <a>Home</a>
        </Link>{' '}
        > {category.title}
      </p>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/tips/${post.slug.current}`}>
              <a>{post.title}</a>
            </Link>
            {!session && post.protectedPage && (
              <span>
                <div className='lock'>
                  <RenderIcon iconName='Lock' />
                </div>
              </span>
            )}
          </li>
        ))}
      </ul>
    </CategoryPageStyles>
  )
}

export default CategoryPage
