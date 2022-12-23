import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [Loading, setLoading] = useState(false);
  async function fetchCategories() {
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const d = await axios.get("/api/categorie", config);
      setCategories(d.data.categorie);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <h1 className='my-4'>Categories</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>description</th>
              <th>view products</th>
            </tr>
          </thead>

          {Loading && <h5> Loading ... </h5>}
          {!Loading &&
            categories &&
            categories.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.description} </td>
                    <td>
                      <Link to={item._id}>view products</Link>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          {!Loading && !categories && <p>NO Products FOUND.</p>}
        </Table>
      </Container>
    </>
  );
}

export default CategoriesList;
