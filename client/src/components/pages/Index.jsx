import React from "react";
import { gql, useSubscription } from "@apollo/client";
import {  Col, Container, Row } from "react-bootstrap";

import { useAuthState } from "../../context/auth";
import { useMessageDispatch } from "../../context/message";
import Contacts from "../partials/Contacts";
import Navbar from "../partials/Navbar";
import Messages from "../partials/Messages";
import { useEffect } from "react";

const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

const NEW_REACTION = gql`
  subscription newReaction {
    newReaction {
      uuid
      content
      message {
        uuid
        from
        to
      }
    }
  }
`;
function Home() {
  //   const [selectedUser, setSelectedUser] = useState(null);
  const messageDispatch = useMessageDispatch();

  const { user } = useAuthState();

  const { data: messageData, error: messageError } = useSubscription(
    NEW_MESSAGE
  );
  const { data: reactionData, error: reactionError } = useSubscription(
    NEW_REACTION
  );

  useEffect(() => {
    if (messageError) console.log(messageError);
    if (messageData) {
      const message = messageData.newMessage;
      const otherUser =
        user.username === message.to ? message.from : message.to;

      messageDispatch({
        type: "ADD_MESSAGE",
        payload: {
          username: otherUser,
          message,
        },
      });
    }
  }, [messageError, messageData]);

  useEffect(() => {
    if (reactionError) console.log(reactionError);
    if (reactionData) {
      const reaction = reactionData.newReaction;
      const otherUser =
        user.username === reaction.message.to
          ? reaction.message.from
          : reaction.message.to;

      messageDispatch({
        type: "ADD_REACTION",
        payload: {
          username: otherUser,
          reaction,
        },
      });
    }
  }, [reactionError, reactionData]);

  
  return (
    <div>
      <Navbar/>
      <Container fluid>
        <Row className="py-2">
          <Col xs={1} sm={2} md={4} className="sidebar__area">
            <Contacts />
          </Col>
          <Col xs={11} sm={10} md={8} className="message__area">
            <Messages />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
