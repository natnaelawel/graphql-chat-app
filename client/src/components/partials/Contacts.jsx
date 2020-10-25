import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useMessageDispatch, useMessageState } from "../../context/message";
import SingleContactRow from "./SingleContactRow";

export const GET_USERS = gql`
  query GET_USERS {
    getUsers {
      username
      createdAt
      imageUrl
      latestMessage {
        content
      }
    }
  }
`;

function Contacts() {

  const dispatch = useMessageDispatch();
  const { loading } = useQuery(GET_USERS, {
    onCompleted(data) {
      dispatch({ type: "SET_USERS", payload: data.getUsers });
    },
    onError(error) {
      console.log(error);
    },
  });
  const { users } = useMessageState();
  if (loading && !users) return <h1>Loading...</h1>;
  return (
    <div>
      {users &&
        users.length &&
        users.map(user => (
          <SingleContactRow
            key={user.username}
            user={user}
          />
        ))}
    </div>
  );
}

export default Contacts;
