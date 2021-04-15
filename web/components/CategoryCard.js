import React from 'react'
import styled from 'styled-components'
import RenderIcon from '../Icons/RenderIcon'
import Link from 'next/link'
import { useSession } from 'next-auth/client'

const CardStyles = styled.div`
  padding: 0.25rem;
  min-width: 300px;
  max-width: 100vw;
  border-radius: 5px;
  border: 1px solid var(--main-dark);
  background: var(--neutral-light);
  box-shadow: var(--bs);

  h2 {
    margin: 0;
    line-height: 50px;
    vertical-align: middle;
  }
  .category-icon {
    svg {
      height: 45px;
      width: 45px;
      margin: 0.25rem auto;
    }

    path {
      fill: var(--main-dark);
    }
  }

  .card-title {
    cursor: pointer;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: auto 1fr;
  }

  ul {
    list-style: none;
    padding-left: 0.5rem;
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

const CategoryCard = ({ posts, category }) => {
  const [session] = useSession()
  return (
    <CardStyles>
      <Link
        href='/categories/[slug]'
        as={`/categories/${category.slug.current}`}
      >
        <div className='card-title'>
          <div className='category-icon'>
            <RenderIcon iconName={category.icon} />
          </div>
          <h2 className='text_extra_large'>{category.title}</h2>
        </div>
      </Link>
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
    </CardStyles>
  )
}

export default CategoryCard
