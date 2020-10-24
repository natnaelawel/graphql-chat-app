import React from "react";
import moment from "moment";
function MessageCard({ message, currentUser }) {
  if (message.from === currentUser) {
    return (
      <div
        key={message.uuid}
        className="align-self-end bg-primary rounded px-3 py-4 my-2 text-white"
      >
        <p>{message.content}</p>
        <p className="text-white">
          {moment(parseInt(message.createdAt)).fromNow()}
        </p>
      </div>
    );
  }
  return (
    <div
      key={message.uuid}
      className="align-self-start bg-dark rounded px-3 py-4 my-1 text-white"
    >
      <p className="text-white">{message.content}</p>
      <span className="text-right">{moment(parseInt(message.createdAt)).fromNow()}</span>
    </div>
  );
}

export default MessageCard;
