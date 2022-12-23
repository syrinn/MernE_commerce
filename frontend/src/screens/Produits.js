import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import { useParams } from "react-router-dom";
import Message from "../shared/Message";
import { useNavigate, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function Produits() {
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);
  const [Loading, setLoading] = useState(false);
  let { categoryId } = useParams();
  async function fetchProduits() {
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const d = await axios.get(`/api/produit/${categoryId}`, config);
      setProduits(d.data.produit);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const addToWishList = async (prodId) => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(`/api/produit/favorie/${prodId}`, config);
      setLoading(false);
      Message.Succes("votre produit a ete ajouter dans le wishlist ");

      navigate("/categories");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo && !userInfo?.token) {
    return <Navigate to='/login' />;
  }
  return (
    <>
      <NavBar />
      <Container>
        <h1 className='my-4'>Products</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>price</th>
            </tr>
          </thead>

          {Loading && <h5> Loading ... </h5>}
          {!Loading &&
            produits &&
            produits.map((item, idx) => {
              return (
                <tbody>
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}DT </td>
                    <td>
                      <Button onClick={(event) => addToWishList(item._id)}>
                        add to wish List
                      </Button>{" "}
                    </td>
                  </tr>
                </tbody>
              );
            })}

          {!Loading && !produits && <p>NO Products FOUND.</p>}
        </Table>
      </Container>
    </>
  );
}

export default Produits;
