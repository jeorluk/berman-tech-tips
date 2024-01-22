// client.js
import sanityClient from '@sanity/client'
import { createClient } from '@sanity/client'

const date = new Date().toISOString().split('T')[0]

const client = createClient({
  projectId: 'ezgk3b8g', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  apiVersion: date,
  useCdn: true, // `false` if you want to ensure fresh data
})

export default client
// export default sanityClient({
//   projectId: 'ezgk3b8g', // you can find this in sanity.json
//   dataset: 'production', // or the name you chose in step 1
//   apiVersion: date,
//   useCdn: true, // `false` if you want to ensure fresh data
// })
