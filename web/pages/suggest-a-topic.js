import React from 'react'
import LoginGate from '../components/LoginGate'
import Page from '../components/Page'
import SuggestTopicForm from '../components/Forms/SuggestTopicForm'

const SuggestATopic = () => {
  return (
    <Page>
      <h1>Suggest a Topic</h1>
      <LoginGate message='suggest a topic'>
        <SuggestTopicForm />
      </LoginGate>
    </Page>
  )
}

export default SuggestATopic
