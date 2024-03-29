import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import client from '../../client'
import { groq } from 'next-sanity'
import { useRouter } from 'next/router'
import Page from '../../components/Page'
import LoginGate from '../../components/LoginGate'
import { useSession } from 'next-auth/react'
import Post from '../../components/Post'
import Link from 'next/link'

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
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session && protectedPage) {
      const fetchData = async () => {
        const protectedQueryResult = await pageQuery(slug)
        const { protectedPage, ...protectedPost } = await pageQuery(slug)
        setPostState(protectedPost)
      }
      fetchData().catch((error) => console.log(error))
    } else {
      setPostState(post)
    }
  }, [session, protectedPage, post])
  return (
    <>
      <Head>
        <title>{postState.title}</title>
      </Head>
      <Page key={router.asPath}>
        <h1>{postState.title}</h1>
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
          <Link href='/'>Home</Link>
          {` > `}
          {post.categories && (
            <>
              <Link
                href='/categories/[slug]'
                as={`/categories/${post.categories[0].slug.current}`}
              >
                {post.categories[0].title}
              </Link>
              {` > `}
            </>
          )}
          {post.title}
        </p>
        {/* Show the LoginGate if the page is protected */}
        <ConditionalWrapper
          condition={protectedPage}
          wrapper={(children) => (
            <LoginGate message='access this article'>{children}</LoginGate>
          )}
        >
          <Post post={postState} />
        </ConditionalWrapper>
      </Page>
    </>
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
      props: {
        protectedPage,
        slug,
        post: { title: post.title, categories: post.categories },
      },
    }
  }
  //Otherwise return post details
  return {
    props: { protectedPage, post },
  }
}

export default Tip
