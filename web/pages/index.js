import Head from 'next/head'
import { groq } from 'next-sanity'
import client from '../client'
import Page from '../components/Page'
import CategorySelector from '../components/CategorySelector'
import PostList from '../components/PostList'
import TopTips from '../components/TopTips'
import styled from 'styled-components'
import { useSession } from 'next-auth/client'

const MainContent = styled.div`
  width: 100%;
  display: grid;
  h1 {
    padding-top: 1rem;
  }

  .intro {
    margin: auto;
    max-width: 800px;
    border-radius: 5px;
    padding: 0.5rem;
    ul {
      list-style: none;
      padding-left: 0.75rem;
      margin: 0;
    }
    li:not(:last-of-type) {
      padding-bottom: 0.25rem;
    }

    em {
      color: var(--text-light);
      font-weight: bold;
      /* padding: 0.25rem; */
    }
  }
`
const Home = ({ posts, categoryList }) => {
  const [session] = useSession()
  return (
    <Page>
      <MainContent>
        {/* <TopTips /> */}
        <h1> Berman Tech Tips</h1>
        <div className='intro '>
          <p className='accent_text'>Having trouble? We're here to help! </p>

          <p>
            Let's be real: things are not always going to go as planned. Even if
            it's all set up exactly right, sometimes technology just won't work.
            How could it when all these things can break it?
          </p>
          <ul>
            <li>
              <em>Mythical Beings:</em> Dybbuk, gremlins
            </li>
            <li>
              <em>Astronomy: </em> full moon, solar flares, Is Mercury in
              retrograde?
            </li>
            <li>
              <em>Personal Troubles: </em> computers don't like me, waking up on
              the wrong side of the bed
            </li>
          </ul>
          <p>
            But there's good news! Technology can be made to work, and
            <em>You Can Do It!</em> Whether you're here because problems have
            happened, or because you want to prevent them, there's something
            here for you. You'll find a listing of all of our
            <em> help topics below</em>, and there's a
            <em> handy category selector</em> to help you find what you need.
          </p>
          {session && (
            <>
              <p>
                Not finding the topic you want? Click that Suggest a Topic link
                up there at the top!
              </p>
              <p>
                Still having trouble solving your problem? Or not feeling like
                trying? It's Ok! Click the Get Help link.
              </p>
            </>
          )}
          {!session && (
            <p>
              Log in with your Berman account for full access to all the help
              topics and to be able suggest topics and ask for help.
            </p>
          )}
        </div>
        <CategorySelector categoryList={categoryList} />
        <PostList posts={posts} />
      </MainContent>
    </Page>
  )
}

export async function getStaticProps() {
  const postQuery = groq`*[_type == "post"] | order(_updatedAt desc){
    title,
    slug,
    _updatedAt,
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
