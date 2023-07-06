
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom'
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { CartState } from "../context/Context";
import sokoni from '../media/sokoni.png'
import "./styles.css";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {FaSignInAlt, FaSignOutAlt, FaUser, FaPowerOff, FaEnvelope,FaShoppingBasket,FaCartArrowDown, FaCartPlus} from 'react-icons/fa'

const Header = () => {

  const { state: { cart }, dispatch, productDispatch, } = CartState();
   
    return (
      <>
      <Navbar collapseOnSelect expand="lg" bg="default" variant="dark">
        <Navbar.Brand href="/">
          <img src={sokoni} alt="sokoni-logo" style={{ width: '80px', height: '80px'}} />
        </Navbar.Brand>
        <Navbar.Brand href="/" style={{ fontFamily: 'boldblaster' }}>
          <h4>KARIBU SOKONI</h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{backgroundColor: '#2dace4'}} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Electronics</Nav.Link>
            <Nav.Link href="#features">Fashion</Nav.Link>
            <Nav.Link href="#features">Food and Beverage</Nav.Link>
            <NavDropdown title="More" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Apple</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Samsung</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Clothes</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">All Products</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
          <Nav>
          
          
         
          <NavDropdown title={<FaUser size={33} />} id="basic-nav-dropdown">
          <NavDropdown.Item onClick={()=>{}}>
          <FaSignOutAlt /> Logout
          </NavDropdown.Item>
          <NavDropdown.Item onClick={()=>{}}>
          <FaShoppingBasket /> Orders
          </NavDropdown.Item>
          <NavDropdown.Item onClick={()=>{}}>
          <FaEnvelope /> Message
          </NavDropdown.Item>
          </NavDropdown>
          </Nav>
          <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="s" style={{backgroundColor: '#2dace4'}}>
              <ShoppingCartIcon color="white" fontSize="25px" />
              <Badge style={{color: 'white'}}>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cartitem" key={prod.id}>
                      <img
                        src={prod.image}
                        className="cartItemImg"
                        alt={prod.name}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>Tshs. {prod.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
          
        </Navbar.Collapse>
      </Navbar>
      </>
    );
  };
  
  export default Header;
  
