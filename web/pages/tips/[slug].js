import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import client from '../../client'
import { groq } from 'next-sanity'
import Page from '../../components/Page'
import BlockContent from '@sanity/block-content-to-react'
import LoginGate from '../../components/LoginGate'
import { useSession } from 'next-auth/client'
import Post from '../../components/Post'
const query = groq`*[_type == "post" && slug.current == $slug][0]{
  ...,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {

      "slug": @.reference->slug
      }
    },
  },
 "categories": categories[]-> 
  }`
const pageQuery = async (slug) => {
  const pageQueryResult = await client.fetch(query, { slug })
  return pageQueryResult
}

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children

const Tip = ({ protectedPage, post, slug }) => {
  //Initialize state from props
  const [postState, setPostState] = useState(post)
  const [session] = useSession()

  useEffect(async () => {
    if (session && protectedPage) {
      const { protectedPage, ...post } = await pageQuery(slug)
      setPostState(post)
    }
  }, [session, protectedPage, post])
  return (
    <Page>
      <h1>{postState.title}</h1>
      {/*Show the LoginGate if the page is protected */}
      <ConditionalWrapper
        condition={protectedPage}
        wrapper={(children) => (
          <LoginGate message='access this article'>{children}</LoginGate>
        )}
      >
        <Post post={postState} />
      </ConditionalWrapper>
    </Page>
  )
}

export async function getStaticPaths() {
  const query = groq`*[_type=="post"]{"slug": slug.current}`

  const postList = await client.fetch(query)
  const paths = postList.map((post) => ({
    params: { slug: post.slug },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(props) {
  const { params } = props
  const { slug = '' } = params
  // const { protectedPage, ...post } = await client.fetch(query, { slug })
  const { protectedPage = false, ...post } = await pageQuery(slug)

  //If the page is protected, send post without body
  if (protectedPage) {
    return {
      props: { protectedPage, slug, post: { title: post.title } },
    }
  }
  //Otherwise return post details
  return {
    props: { protectedPage, post },
  }
}

export default Tip
