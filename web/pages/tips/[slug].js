import React from 'react'
import { useRouter } from 'next/router'
import client from '../../client'
import { groq } from 'next-sanity'
import Page from '../../components/Page'
import BlockContent from '@sanity/block-content-to-react'

const Tip = ({ post }) => {
  const { title, categories, _updatedAt } = post
  const date = new Date(_updatedAt)
  console.log(post)

  return (
    <Page>
      <h1>{title}</h1>
      <p>Updated: {new Intl.DateTimeFormat('en-US').format(date)}</p>
      {categories.map((category) => (
        <span key={category._id}>{category.title},</span>
      ))}
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

export async function getStaticProps({ params }) {
  const query = groq`*[_type == "post" && slug.current == $slug][0]{
 ...,
//  "body": body[]->,
 "categories": categories[]-> 
  }`
  const { slug = '' } = params
  const post = await client.fetch(query, { slug })

  return {
    props: { post },
  }
}

export default Tip
