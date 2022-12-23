import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, Navigate, Link } from "react-router-dom";
import Errors from "../shared/Errors";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        { email, password },
        config
      );
      navigate("/");
      localStorage.setItem("userInfo", JSON.stringify(data));
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
          <h1 className='my-4'>Login</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>UserName</Form.Label>
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
                placeholder=' Your Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              {Loading && <> Loading ... </>}
              {!Loading && <> Login </>}
            </Button>
            <div style={{ paddingTop: 20, textDecoration: "underline" }}>
              <Link to={"/register"} className='dropdown-item' replace>
                <a href=''>Register</a>
              </Link>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
