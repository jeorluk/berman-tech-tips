import React, { useEffect, useContext, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { FilterContext } from '../context/filterContext'
import { useSession } from 'next-auth/client'
import RenderIcon from '../Icons/RenderIcon'
const PostsContainer = styled.ul``

const PostList = ({ posts, categoryList }) => {
  const [session] = useSession()
  const { activeFilters, setActiveFilters } = useContext(FilterContext)
  const [filteredPosts, setFilteredPosts] = useState(posts)

  useEffect(() => {
    if (activeFilters.length > 0) {
      const filteredPostList = posts.filter((post) => checkCategories(post))
      function checkCategories(post) {
        const intersection = post.categories.filter((category) =>
          activeFilters.includes(category._id)
        )
        return intersection.length > 0
      }

      setFilteredPosts(filteredPostList)
    } else {
      setFilteredPosts(posts)
    }
  }, [posts, activeFilters])

  return (
    <PostsContainer>
      {categoryList.map((category) => (
        <h2>
          <RenderIcon iconName={category.icon} />
          {category.title}
        </h2>
      ))}
      {/* {filteredPosts.map((post) => {
        return (
          <li key={post._id}>
            <Link href={`/tips/${post.slug.current}`}>
              <a>{post.title}</a>
            </Link>
            {!session && post.protectedPage && <span>Locked!</span>}
          </li>
        )
      })} */}
    </PostsContainer>
  )
}

export default PostList
