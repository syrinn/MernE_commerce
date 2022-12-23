import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function NavBar(props) {
  const [user, setUser] = useState("");
  const logout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo && !userInfo?.token) {
    return <Navigate to='/login' />;
  }
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Link to='/'>
          <Navbar.Brand href='#home'>E-commerce</Navbar.Brand>
        </Link>

        <div className='list__menue'>
          <Link to='/addcategorie' className='dropdown-item' replace>
            <a href=''>Add Category </a>
          </Link>
          <Link to={"/addproduit"} className='dropdown-item' replace>
            <a href=''> Add Product </a>
          </Link>

          <Link to='/categories' className='dropdown-item' replace>
            <a href=''>List Categories </a>
          </Link>

          <Link to='/wishList' className='dropdown-item' replace>
            <a href=''>Wish List </a>
          </Link>
        </div>

        <div>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <NavDropdown title={user.name} id='basic-nav-dropdown'>
                <Button className='dropdown-item' onClick={() => logout()}>
                  logout
                </Button>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
