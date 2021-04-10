import React from 'react'
import styled from 'styled-components'
import BlockContent from '@sanity/block-content-to-react'
import Link from 'next/link'

const BlockRenderer = (props) => {
  const { style = 'normal' } = props.node
  if (style == 'note') {
    console.log({ props })
    return <div className='note'>{props.children}</div>
  }

  return BlockContent.defaultSerializers.types.block(props)
}

const internalLink = (props) => {
  console.log({ props })
  return (
    <Link href='/tips/[slug]' as={`/tips/${props.mark.slug.current}`}>
      <a>
        <strong>{props.children}</strong>
      </a>
    </Link>
  )
}

const PostStyles = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: 2rem;

  h3 {
    color: var(--accent-dark);
    font-size: var(--size-up-one);
    margin: 0;
  }

  .note {
    max-width: 75%;
    margin: 0.5rem 5rem;
    /* margin-bottom: 0.25rem; */
    position: relative;
    padding-left: 5rem;
    /* border-left: 2px solid var(--main-dark); */
    /* border-top: 2px solid linear-gradient(90deg, var(--main-dark, white)); */
    /* background: linear-gradient(90deg, var(--main-dark), white); */
    /* background-size: 100% 1px; */
    /* background-position: 0 0; */
    border: 2px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(
      165deg,
      var(--accent-dark) 20%,
      white 80%
    );

    &::before {
      content: 'Look !';
      position: absolute;
      top: 20%;
      left: 4px;

      font-family: 'Rock Salt';
      font-style: italic;
      color: var(--accent-dark);
    }
  }

  strong {
    color: var(--accent-dark);
  }
`

const Post = ({ post }) => {
  console.log({ post })
  return (
    <PostStyles>
      {post.body && (
        <BlockContent
          projectId='ezgk3b8g'
          dataset='production'
          blocks={post.body}
          serializers={{
            types: { block: BlockRenderer },
            marks: { internalLink },
          }}
        />
      )}
      <hr />
      <p>
        Last updated:{' '}
        {new Intl.DateTimeFormat('en-US').format(
          post._updatedAt ? new Date(post._updatedAt) : null
        )}
      </p>
    </PostStyles>
  )
}

export default Post
