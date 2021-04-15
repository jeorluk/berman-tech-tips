import Head from 'next/head'
import { groq } from 'next-sanity'
import { useSession } from 'next-auth/client'
import client from '../client'
import Page from '../components/Page'
import styled from 'styled-components'
import CategoryCard from '../components/CategoryCard'
import CategoryCardHolder from '../styles/CategoryCardHolder'
import getFilteredPosts from '../util/getFilteredPosts'

const MainContent = styled.div`
  width: 100%;
  display: grid;

  .intro {
    margin: auto;
    max-width: 800px;
    border-radius: 5px;
    padding: 0 0.5rem;
    ul {
      list-style: none;
      padding-left: 0.75rem;
      margin: 0;
    }
    li:not(:last-of-type) {
      padding-bottom: 0.25rem;
    }

    strong {
      /* color: var(--accent-dark); */
    }
  }
`
const Home = ({ posts, categoryList }) => {
  const [session] = useSession()
  return (
    <>
      <Head>
        <title>Berman Tech Tips</title>
      </Head>
      <Page>
        <MainContent>
          <h1> Berman Tech Tips</h1>
          <div className='intro '>
            <p className='accent_text'>Having trouble? We're here to help! </p>

            <p>
              Let's be real: things are not always going to go as planned. Even
              if it's all set up exactly right, sometimes technology just won't
              work. How could it when all these things can break it?
            </p>
            <ul>
              <li>
                <strong>Mythical Beings:</strong> Dybbuk, gremlins
              </li>
              <li>
                <strong>Astronomy: </strong> full moon, solar flares, Is Mercury
                in retrograde?
              </li>
              <li>
                <strong>Personal Troubles: </strong> computers don't like me,
                waking up on the wrong side of the bed
              </li>
            </ul>
            <p>
              But there's good news! Technology can be made to work, and
              <strong> You Can Do It!</strong> Whether problems have already
              happened, or you want to <strong>be ready</strong> when they do,
              there's something here for you. You'll find a listing of all of
              our
              <strong> help topics below</strong>.
            </p>
            {session && (
              <>
                <p>
                  Not finding the topic you want? Click that Suggest a Topic
                  link up there at the top!
                </p>
                <p>
                  Still having trouble solving your problem? Or not feeling like
                  trying? It's Ok! Click the Get Help link.
                </p>
              </>
            )}
            {!session && (
              <p>
                <strong>
                  Log in with your Berman account for full access to all the
                  help topics and to be able suggest topics and ask for help.
                </strong>
              </p>
            )}
          </div>
          <CategoryCardHolder>
            {categoryList.map((category) => (
              <CategoryCard
                posts={getFilteredPosts({
                  categoryId: category._id,
                  postList: posts,
                })}
                category={category}
                key={category._id}
              />
            ))}
          </CategoryCardHolder>
        </MainContent>
      </Page>
    </>
  )
}

export async function getStaticProps() {
  const postQuery = groq`*[_type == "post"] | order(_updatedAt desc){
    title,
    slug,
    protectedPage,
    _updatedAt,
    _id,
 "categories": categories[]->

}`

  const categoryQuery = groq`*[_type == "category"] | order(title){
    ...,
    "imageUrl": icon.asset->url
  }`

  const posts = await client.fetch(postQuery)
  const categoryList = await client.fetch(categoryQuery)
  return {
    props: { posts, categoryList },
  }
}

export default Home
