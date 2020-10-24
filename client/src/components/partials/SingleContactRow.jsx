import React from "react";
import { Image } from "react-bootstrap";
import "./contacts.scss";
import classNames from "classnames";
import { useMessageDispatch, useMessageState } from "../../context/message";

function SingleContactRow({ user}) {
    const dispatch = useMessageDispatch()
    // const {selectedUser} = useMessageState()
    // console.log('selected ',selectedUser.username, ' user is ', user.username)

//   const isSelected = selectedUser && selectedUser.username === user.username;
  return (
    <div
      role="button"
    //   onClick={() => handleUserClick(user)}
        onClick={()=> dispatch({type: 'SET_SELECTED_USER', payload: user.username})  }
      className={classNames(
        "contact__row list-group-item d-flex align-items-center",
        { selected: user.selected }
      )}
    >
      <Image
        className=""
        width="50px"
        height="50px"
        src={user.imageUrl}
        roundedCircle
      />
      <div
        style={{ flex: "1" }}
        className="d-flex flex-column ml-3 justify-content-center"
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
