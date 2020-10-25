import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { gql, useApolloClient, useLazyQuery } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import { useAuthDispatch } from "../../context/auth";
import classNames from 'classnames'

const LOGIN_QUERY = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      token
      createdAt
    }
  }
`;

function SignIn() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({
    username: "",
    password: "",
    error: "",
  });

  const dispatch = useAuthDispatch();
  const client = useApolloClient();

  let [login, { loading }] = useLazyQuery(LOGIN_QUERY, {
    onError(error) {
      error = error.message;
      setLoginError({ ...loginError, error: error });
    },
    onCompleted(data) {
      dispatch({ type: "LOGIN", payload: data.login });
      client.clearStore();
      history.push("/");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username.trim() === "" || formData.password.trim() === "") {
      if (formData.username.trim() === "") {
        setLoginError({ ...loginError, username: "Username is Required" });
      }
      if (formData.password.trim() === "") {
        console.log(loginError);
        setLoginError((prev) => ({
          ...prev,
          password: "Password is Required",
        }));
      }
      //   return;
    } else {
      login({
        variables: {
          username: formData.username,
          password: formData.password,
        },
      });
    }
  };
  return (
    <Container>
      <Row>
        <Col xs md={{ span: 6, offset: 3 }}>
          <Card style={{ marginTop: "5%" }}>
            <Card.Body>
              <h1 className="display-3 text-center">Login</h1>
              <Form onSubmit={handleSubmit}>
                {loginError.error && (
                  <Alert variant="danger">{loginError.error}</Alert>
                )}
                <Form.Group controlId="formBasicEmail">
                  <Form.Label
                    className={classNames("lead", {
                      "text-danger": loginError.username,
                    })}
                  >
                    Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={loginError.username && "is-invalid"}
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label
                    className="lead"
                    className={loginError.password && "text-danger"}
                  >
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className={loginError.password && "is-invalid"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="Checkbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Form.Group controlId="register">
                  <Form.Label className="lead text-center">
                    Don't have an account? <Link to="/register">Register</Link>
                  </Form.Label>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="btn-block d-flex align-items-center justify-content-center"
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="mx-4">Loading...</span>
                    </>
                  ) : (
                    <span className="mx-4">Login</span>
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
