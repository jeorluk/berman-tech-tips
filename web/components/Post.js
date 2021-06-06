import React from 'react'
import styled from 'styled-components'
import BlockContent from '@sanity/block-content-to-react'
import Link from 'next/link'
import useModal from '../hooks/useModal'
import RenderForm from './Forms/RenderForm'

const BlockRenderer = (props) => {
  const { style = 'normal' } = props.node
  if (style == 'note') {
    return <div className='note'>{props.children}</div>
  }

  return BlockContent.defaultSerializers.types.block(props)
}

const formLink = (props) => {
  const { setIsVisible, setComponent } = useModal()
  return (
    <button
      onClick={() => {
        setIsVisible(true)
        setComponent(<RenderForm formName={props.mark.formType} />)
      }}
    >
      {props.children}
    </button>
  )
}
const internalLink = (props) => {
  return (
    <Link href={`/tips/${props.mark.slug.current}`}>
      <a>
        <strong>{props.children}</strong>
      </a>
    </Link>
  )
}

const Post = ({ post }) => {
  return (
    <PostStyles>
      {post.body && (
        <BlockContent
          projectId='ezgk3b8g'
          dataset='production'
          blocks={post.body}
          serializers={{
            types: { block: BlockRenderer },
            marks: { internalLink, formLink },
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

const PostStyles = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: 2rem;

  img {
    max-width: 100%;
    box-shadow: var(--bs);
  }
  h3 {
    color: var(--accent-dark);
    font-size: var(--size-up-one);
    margin: 0;
  }

  .note {
    max-width: 800px;
    margin: 0.5rem auto;
    position: relative;
    padding-left: 5rem;
    border: 2px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(
      165deg,
      var(--accent-dark) 20%,
      white 80%
    );
  }

  .note::before {
    content: 'Look !';
    position: absolute;
    top: 20%;
    left: 4px;

    font-family: 'Rock Salt';
    font-style: italic;
    color: var(--accent-dark);
  }

  button {
    cursor: pointer;
    padding: 0;
    margin: 0;
    color: var(--accent-dark);
    font-weight: bold;
    background: inherit;
  }
`
