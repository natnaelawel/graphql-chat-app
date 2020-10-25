import { useApolloClient } from "@apollo/client";
import React from "react";
import { Button, Image, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../context/auth";

function Navbar() {
  const authDispatch = useAuthDispatch();
  const history = useHistory();
  const client = useApolloClient();
  const { user } = useAuthState();

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    // window.location.href = "/login"
    client.clearStore();
    history.replace("/login");
  };

  return (
    <Row className="bg-dark text-white px-5 py-3 justify-content-between align-items-center">
      <h2>Graphql Chat</h2>
      {user && user.username ? (
        <div className="d-flex align-items-center">
          <Image
            className=""
            width="30px"
            height="30px"
            src={
              user.imageUrl ||
              "https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png"
            }
            roundedCircle
          />
          <h5 className="text-capitalize mx-3">{user.username}</h5>
          <Button
            variant="link"
            className="align-middle align-self-center text-decoration-none"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <Link to="/login" className="text-decoration-none">
            <Button variant="link">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="link">Register</Button>
          </Link>
        </div>
      )}
    </Row>
  );
}

export default Navbar;
