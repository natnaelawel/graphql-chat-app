import React from "react";
import MessageCard from "./MessageCard";
import "./messages.scss";
import SendMessage from "./SendMessage";

function MessageContent({ selectedUser, messageLoading, messageError }) {
  const messageData = selectedUser?.messages;
  if (messageLoading && !messageData) return <h1>Loading...</h1>;
  if (messageError) return <h1>Error has Occured</h1>;
  return (
    <div
      className="d-flex flex-column  rounded border border-primary "
      style={{ minHeight: "80vh", maxHeight: "80vh" }}
    >
      {messageData?.length === 0 ? (
        <div className="flex-grow-1 rounded border border-primary start__messaging d-flex align-items-center justify-content-center ">
          <h1 className="display-4">No Messages Start Messaging</h1>
        </div>
      ) : (
        <div
          style={{ overflowY: "auto" }}
          className="flex-grow-1 messages__area  pt-2 px-3 d-flex flex-column-reverse "
        >
          <div>
            {messageData &&
              messageData?.length &&
              messageData.map((message, index) => (
                <MessageCard
                  key={index}
                  message={message}
                  selectedUserImageUrl={selectedUser.imageUrl}
                />
              ))}
          </div>
        </div>
      )}
      <SendMessage selectedUser={selectedUser} />
    </div>
  );
}

export default MessageContent;
