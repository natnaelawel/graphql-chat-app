import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
const REGISTER_MUTATION = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      username
      email
    }
  }
`;

function SignUp() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.confirm !== formData.password) {
      alert("password and confirm is not the same");

      return;
    }
    try {
      const res = await register({
        variables: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      });
      history.push("/login");
    } catch (error) {
      alert("Error in Registering");
    }
  };
  return (
    <Container>
      <Row>
        <Col xs md={{ span: 6, offset: 3 }}>
          <Card style={{ marginTop: "5%" }}>
            <Card.Body>
              <h1 className="display-3 text-center">Register</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="lead">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                  <Form.Text className="text-muted">
                    We'll never share your username with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="lead">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label className="lead">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="confirmFormPassword">
                  <Form.Label className="lead">Confirm</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm"
                    value={formData.confirm}
                    onChange={(e) =>
                      setFormData({ ...formData, confirm: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="register">
                  <Form.Label className="lead text-center">
                    Already have an account? <Link to="/login">Login</Link>
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
                        // size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="mx-4">Loading...</span>
                    </>
                  ) : (
                    <span className="mx-4">Register</span>
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

export default SignUp;
