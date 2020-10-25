import React from "react";
import { Image } from "react-bootstrap";
import "./contacts.scss";
import classNames from "classnames";
import { useMessageDispatch } from "../../context/message";

function SingleContactRow({ user }) {
  const dispatch = useMessageDispatch();
  return (
    <div
      role="button"
      onClick={() => dispatch({ type: "SET_SELECTED_USER", payload: user })}
      className={classNames(
        "contact__row list-group-item d-flex align-items-center",
        { selected: user.selected }
      )}
    >
      <Image
        className=""
        width="40px"
        height="40px"
        src={
          user.imageUrl ||
          "https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png"
        }
        roundedCircle
      />
      <div
        style={{ flex: "1" }}
        className="d-none d-md-flex flex-column ml-3 justify-content-center "
      >
        <div className="d-flex justify-content-between">
          <h5 className="text-capitalize">{user.username}</h5>
          <div className="">🟢</div>
        </div>
        <p className="text-truncate">
          {user.latestMessage
            ? user.latestMessage.content
            : "you are now connected!"}
        </p>
      </div>
    </div>
  );
}

export default SingleContactRow;
