import React from 'react'
import Head from 'next/head'
import { groq } from 'next-sanity'
import { useSession } from 'next-auth/client'
import client from '../../client'
import Page from '../../components/Page'
import styled from 'styled-components'
import CategoryPage from '../../components/CategoryPage'

const Category = ({ data }) => {
  const { postList, ...category } = data
  return (
    <Page>
      <CategoryPage posts={postList} category={category} />
    </Page>
  )
}
export async function getStaticPaths() {
  const query = groq`*[_type=="category"]{"slug": slug.current}`

  const categoryList = await client.fetch(query)

  const paths = categoryList.map((category) => ({
    params: { slug: category.slug },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(props) {
  const { params } = props
  const { slug = '' } = params
  const query = groq`  *[_type=='category' && slug.current==$slug][0]{
  ...,
  "postList": *[_type == 'post' &&
  
    ^._id in categories[]._ref]{
      _id,
   title,
   protectedPage,
   slug
 }}`

  const data = await client.fetch(query, { slug })

  return {
    props: { data },
  }
}

export default Category
