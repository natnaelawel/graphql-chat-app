import React, { useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import MessageCard from "./MessageCard";
import "./messages.scss";

function MessageContent({
  messageData,
  currentUser,
  messageLoading,
  messageError,
}) {
  if (messageLoading && !messageData) return <h1>Loading...</h1>;
  if (messageError) return <h1>Error has Occured</h1>;
  return (
    <div>
      {messageData?.getMessages.length === 0 ? (
        <div className="rounded border border-primary start__messaging d-flex align-items-center justify-content-center ">
          <h1 className="display-4">No Messages Start Messaging</h1>
        </div>
      ) : (
        <div
          style={{ minHeight: "80vh" }}
          className="pt-2 px-3 d-flex flex-column overflow-scroll"
        >
          {messageData &&
            messageData.getMessages.length &&
            messageData.getMessages.map((message) => (
              <MessageCard
                key={message.uuid}
                message={message}
                currentUser={currentUser}
              />
            ))}
        </div>
      )}
      <div>
        <Form
          style={{ borderRadius: "0rem !important" }}
          className="send__message"
        >
          <InputGroup className="" style={{ zIndex: -10 }}>
            <FormControl
              placeholder="Write your message here"
              className="send__message__input px-3 py-3"
            />
            <InputGroup.Append>
              <InputGroup.Text>Send</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
}

export default MessageContent;
