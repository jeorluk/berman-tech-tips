import React, { useEffect, useContext, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { FilterContext } from '../context/filterContext'
const PostsContainer = styled.ul`
  border-top: 2px solid var(--accent-dark);
`

const PostList = ({ posts }) => {
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
      {filteredPosts.map((post) => {
        return (
          <li key={post._id}>
            <Link href={`/tips/${post.slug.current}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        )
      })}
    </PostsContainer>
  )
}

export default PostList
