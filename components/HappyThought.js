import React from "react"
import { Text } from "react-native"
import moment from "moment"
import styled from "styled-components/native"

const HappyThought = props => {
  const { message, hearts, createdAt, _id } = props.thought

  const handleClick = () => {
    fetch(`https://technigo-thoughts.herokuapp.com/${_id}/like`, {
      method: "POST",
      body: "",
      headers: { "Content-Type": "application/json" }
    }).then(() => props.onLiked(_id))
  }

  return (
    <Container>
      <Text>{message}</Text>
      <Footer>
        <HeartContainer>
          <Button hearts={hearts} onPress={handleClick}>
            <Text>❤️</Text>
          </Button>
          <Text>x {hearts}</Text>
        </HeartContainer>
        <Text>{moment(createdAt).fromNow()}</Text>
      </Footer>
    </Container>
  )
}

export default HappyThought

const Container = styled.View`
  background-color: #fff;
  border: 2px solid black;
  box-shadow: 4px 4px black;
  min-height: 120px;
  margin: 16px;
  justify-content: space-between;
  padding: 20px;
`

const HeartContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

const Button = styled.TouchableOpacity`
  background: ${props => (props.hearts > 0 ? "#ffadad" : "#f3f1f1")}
  border: none;
  border-radius: 15;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
