import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import NavBar from "../components/NavBar";
import Message from "../shared/Message";
import { Navigate, useNavigate } from "react-router-dom";
import Errors from "../shared/Errors";

function AddProduit() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [categorie, setCategorie] = useState("");
  const [Loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post(
        "/api/produit/create",
        {
          name,
          price,
          categorie,
        },
        config
      );
      Message.Succes("Product Added Successfuly");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Errors.handleError(err);
    }
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo && !userInfo?.token) {
    return <Navigate to='/login' />;
  }
  return (
    <>
      <NavBar />
      <div className='addproduit'>
        <Container>
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Enter category ID</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category ID'
                onChange={(e) => setCategorie(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Enter product name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product name'
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Price DT</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              {Loading && <> Loading ... </>}
              {!Loading && <> Submit </>}
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default AddProduit;
