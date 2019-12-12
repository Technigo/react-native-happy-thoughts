import React, { useEffect, useState } from "react"
import styled from "styled-components/native"
import HappyThought from "./components/HappyThought"
import HappyForm from "./components/HappyForm"

const url = "https://technigo-thoughts.herokuapp.com/"

const App = () => {
  const [thoughts, setThoughts] = useState([])
  const [postedMessage, setPostedMessage] = useState("")

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => setThoughts(json))
  }, [postedMessage])

  const onFormSubmit = message => {
    setPostedMessage(message)
  }

  const onLiked = thoughtId => {
    const updatedThoughts = thoughts.map(thought => {
      if (thought._id === thoughtId) {
        thought.hearts += 1
      }
      return thought
    })
    setThoughts(updatedThoughts)
  }

  return (
    <Container>
      <HappyForm onFormSubmit={onFormSubmit} />
      {thoughts.map(thought => (
        <HappyThought key={thought._id} thought={thought} onLiked={onLiked} />
      ))}
    </Container>
  )
}

export default App

const Container = styled.ScrollView`
  flex: 1;
  background-color: #eeff;
  padding: 8px;
  padding-top: 30;
`
