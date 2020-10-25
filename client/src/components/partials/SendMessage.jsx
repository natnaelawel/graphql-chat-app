import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useMessageDispatch } from "../../context/message";

export const SEND_MESSAGE = gql`
  mutation createMessage($to: String!, $content: String!) {
    createMessage(content: $content, to: $to) {
      uuid
      content
      from
      to
      createdAt
    }
  }
`;

function SendMessage({ selectedUser }) {
  const dispatch = useMessageDispatch();
  const [sendMessage, { loading, error }] = useMutation(SEND_MESSAGE, {
    onCompleted(data) {
      console.log("messages ", data.createMessage);
      // dispatch({
      //   type: "ADD_MESSAGE",
      //   payload: {
      //     username: selectedUser.username,
      //     message: data.createMessage,
      //   },
      // });
    },
  });
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await sendMessage({
        variables: {
          content: message,
          to: selectedUser.username,
        },
      });
      setMessage("");
    }
  };
  return (
    <div className="d-block">
      <Form
        onSubmit={handleSubmit}
        style={{ borderRadius: "0rem !important" }}
        className="send__message"
      >
        <InputGroup className="">
          <FormControl
            placeholder="Write your message here"
            className="border-0 send__message__input px-3 py-3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <InputGroup.Append>
            <Button variant="link" className=" border-0 px-3 " type="submit" disabled={loading}>
              <i role="button" className="px-1 fas fa-paper-plane fa-2x"></i>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </div>
  );
}

export default SendMessage;
