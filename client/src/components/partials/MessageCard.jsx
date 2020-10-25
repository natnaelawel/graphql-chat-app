import React, { useState } from "react";
import moment from "moment";
import "./messages.scss";
import classNames from "classnames";
import { useAuthState } from "../../context/auth";
import { Button, Image, OverlayTrigger, Popover } from "react-bootstrap";
import reactions from "../../data/reactions";
import { gql, useMutation } from "@apollo/client";
// import { useMessageDispatch } from "../../context/message";

const REACT_TO_MESSAGE = gql`
  mutation reactToMessage($uuid: String!, $content: String!) {
    reactToMessage(uuid: $uuid, content: $content) {
      uuid
    }
  }
`;

function MessageCard({ message, selectedUserImageUrl }) {
  const { user } = useAuthState();
  const reactionIcons = [...new Set(message.reactions.map((r) => r.content))];
  // console.log('data is ')
  const [showPopOver, setShowPopOver] = useState(false);
  const [reactToMessage, { loading }] = useMutation(REACT_TO_MESSAGE, {
    onError: (err) => console.log(err),
    onCompleted: (data) => {
      setShowPopOver(false);
    },
  });

  const handleReact = async (reaction) => {
    setShowPopOver(false);
    const res = await reactToMessage({
      variables: { uuid: message.uuid, content: reaction },
    });
    console.log(`Reacting ${reaction} to message ${message.uuid}`);
  };
  const reactBtn = (
    <OverlayTrigger
      trigger="click"
      placement="top"
      show={showPopOver}
      onToggle={setShowPopOver}
      transition={false}
      rootClose
      overlay={
        <Popover className="react__popover rounded">
          <Popover.Content className="d-flex flex-wrap align-items-center">
            {reactions.map((reaction, index) => (
              <Button
                className="react__icon__button"
                variant="link"
                key={index}
                onClick={() => handleReact(reaction)}
              >
                {reaction}
              </Button>
            ))}
          </Popover.Content>
        </Popover>
      }
    >
      <Button variant="link" className="react__btn px-2">
        <i className="far fa-smile"></i>
      </Button>
    </OverlayTrigger>
  );
  return (
    <div
      className="message__box"
      className={classNames("d-flex flex-column", {
        "align-items-start": message.from !== user.username,
        "align-items-end": message.from === user.username,
      })}
    >
      <div
        className={classNames("d-flex align-items-end", {
          "flex-row": message.from !== user.username,
          "flex-row-reverse": message.from === user.username,
        })}
      >
        <Image
          className=""
          width="40px"
          height="40px"
          src={
            (message.from === user.username
              ? user.imageUrl
              : selectedUserImageUrl) ||
            "https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png"
          }
          roundedCircle
        />
        <div
          key={message.uuid}
          className={classNames(
            "message__card rounded p-3 my-1 text-white",
            {
              "received__message bg-dark": message.from === user.username,
            },
            {
              "sent__message  bg-primary": message.from !== user.username,
            }
          )}
        >
          <p className="text-white text-wrap">{message.content}</p>
          <span style={{ color: "#ccc" }} className="text-right d-block">
            {moment(message.createdAt).fromNow()}
          </span>
        </div>
      </div>
      <div
        style={{}}
        className={classNames(
          "reaction__area d-flex d-flex align-items-center",
          {
            "flex-row ml-5": message.from !== user.username,
            "flex-row-reverse  mr-5": message.from === user.username,
          }
        )}
      >
        <div
          className={classNames("d-flex", {
            reactions__icons__left: message.from === user.username,
            reactions__icons__right: message.from !== user.username,
          })}
        >
          {message.reactions?.length > 0 && (
            <span>
              {reactionIcons}
              {message.reactions.length}
            </span>
          )}
        </div>
        {reactBtn}
      </div>
    </div>
  );
}

export default MessageCard;
