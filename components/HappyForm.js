import React, { useState } from "react"
import { Text } from "react-native"
import styled from "styled-components/native"

const url = "https://technigo-thoughts.herokuapp.com/"

const HappyForm = props => {
  const [message, setMessage] = useState("")

  const handleSubmit = event => {
    event.preventDefault()
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        setMessage("")
        props.onFormSubmit(message)
      })
      .catch(err => console.log("error:", err))
  }

  return (
    <Container>
      <Title>Share a happy thought!</Title>
      <Input
        multiline
        numberOfLines={3}
        value={message}
        onChangeText={text => setMessage(text)}
      />
      <Footer>
        <Button
          onPress={handleSubmit}
          disabled={message.length < 5 || message.length > 140 ? true : false}
        >
          <Text> Send your thought </Text>
        </Button>
        <Text>{message.length} / 140</Text>
      </Footer>
    </Container>
  )
}

export default HappyForm

const Container = styled.View`
  background-color: #f3f1f1;
  border: 2px solid black;
  box-shadow: 4px 4px black;
  justify-content: space-between;
  margin: 16px;
  padding: 20px;
`

const Title = styled.Text`
  font-size: 20px;
`

const Input = styled.TextInput`
  padding: 10px;
  font-size: 16px;
  margin: 10px 0;
  background-color: #fff;
`

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Button = styled.TouchableOpacity`
  height: 40px;
  background-color: ${props => (props.disabled ? "#ccc" : "#ffadad")}
  border: none;
  font-size: 14px;
  border-radius: 20px;
  padding: 10px;
  text-align: center;
`
