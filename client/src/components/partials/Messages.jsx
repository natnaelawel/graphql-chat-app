import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useMessageDispatch, useMessageState } from "../../context/message";
import MessageContent from "./MessageContent";
import "./messages.scss";

export const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      content
      from
      to
      createdAt
      reactions{
        uuid
        content
      }
    }
  }
`;

function Messages() {
  const dispatch = useMessageDispatch();
  const [
    fetchMessage,
    { loading: messageLoading, error: messageError, data: messageData },
  ] = useLazyQuery(GET_MESSAGES);

  const { users } = useMessageState();
  const selectedUser = users?.find((user) => user.selected === true);
  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      fetchMessage({
        variables: {
          from: selectedUser.username,
        },
      });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messageData) {
      dispatch({
        type: "SET_USER_MESSAGES",
        payload: { username: selectedUser.username, messages: messageData.getMessages },
      });
    }
  }, [messageData]);
  if (messageData == null) {
    return (
      <div className="rounded border border-primary start__messaging d-flex align-items-center justify-content-center ">
        <h1 className="display-4">Start Messaging</h1>
      </div>
    );
  }
  return (
      <MessageContent
        selectedUser={selectedUser}
        messageLoading={messageLoading}
        messageError={messageError}
      />
  );
}

export default Messages;
