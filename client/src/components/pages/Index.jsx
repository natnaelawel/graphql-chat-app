import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuthDispatch } from "../../context/auth";
import { useMessageState } from "../../context/message";
import Contacts from "../partials/Contacts";
import MessageContent from "../partials/MessageContent";
import Messages from "../partials/Messages";
import SingleContactRow from "../partials/SingleContactRow";

function Home() {
  //   const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useAuthDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/login"
    history.replace("/login");
  };


  return (
    <div>
      <Row className="bg-dark text-white px-5 py-3 justify-content-end align-items-center">
        <Link to="/login">
          <Button variant="link">Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="link">Register</Button>
        </Link>
        <Button variant="link" onClick={handleLogout}>
          Logout
        </Button>
      </Row>
      <Container fluid>
        <Row className="py-2">
          <Col xs={4} className="sidebar__area">
            <Contacts />
          </Col>
          <Col xs={8} className="message__area">
            <Messages/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
