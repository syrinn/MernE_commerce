import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, Navigate, Link } from "react-router-dom";
import Errors from "../shared/Errors";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [Loading, setLoading] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/login",
        { name, email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Errors.handleError(err);
    }
  };

  if (userInfo && userInfo.token) {
    return <Navigate to='/' />;
  }
  return (
    <div className='login'>
      <Container>
        <div className='form__group'>
          <h1 className='my-4'>Sign Up</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Your Name'
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Your Email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className='text-muted'>
              </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Your Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              {Loading && <> Loading ... </>}
              {!Loading && <> SignUp </>}
            </Button>
            <div style={{ paddingTop: 20, textDecoration: "underline" }}>
              <Link to={"/login"} className='dropdown-item' replace>
                <a href=''>login</a>
              </Link>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}
export default Register;
