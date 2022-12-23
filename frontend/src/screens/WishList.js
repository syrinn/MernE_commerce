import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import NavBar from "../components/NavBar";
import { useNavigate, Navigate } from "react-router-dom";

function WishList() {
  const [produits, setProduits] = useState([]);
  const [Loading, setLoading] = useState(false);
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

      const d = await axios.get(`/api/produit`, config);

      setProduits(d.data.produits);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

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
        <h1 className='my-4'>Wish List</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>price</th>
            </tr>
          </thead>

          {Loading && <h5> Loading ... </h5>}
          {produits !== undefined &&
            produits !== null &&
            produits.map((item, idx) => {
              if (item.favorie == true) {
                return (
                  <tbody key={item._id}>
                    <tr>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.price}DT </td>
                    </tr>
                  </tbody>
                );
              }
            })}
        </Table>
      </Container>
    </>
  );
}
export default WishList;
