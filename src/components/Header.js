
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
import { useMediaQuery } from 'react-responsive';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {FaSignInAlt, FaSignOutAlt, FaUser, FaPowerOff, FaEnvelope,FaShoppingBasket,FaCartArrowDown, FaCartPlus} from 'react-icons/fa'

const Header = () => {

  const isLargeScreen = useMediaQuery({ minWidth: 992 });

  const { state: { cart }, dispatch, productDispatch, } = CartState();
   
    return (
      <>
      <div className="d-flex flex-column justify-content-center align-items-center">
      <Navbar collapseOnSelect expand="lg" bg="default" variant="dark">
        <Navbar.Brand href="/">
          <img src={sokoni} alt="sokoni-logo" style={{ width: '80px', height: '80px'}} />
        </Navbar.Brand>
        <Navbar.Brand href="/" style={{ fontFamily: 'boldblaster' }}>
          {isLargeScreen ?  <h2>KARIBU SOKONI</h2> : <p>KARIBU SOKONI</p> }
         
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{backgroundColor: '#2dace4'}} />
        
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#electronics">Electronics</Nav.Link>
            <Nav.Link href="#fashion">Fashion</Nav.Link>
            <Nav.Link href="#food/beverages">Food and Beverage</Nav.Link>
            <NavDropdown title="More" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#apple">Apple</NavDropdown.Item>
              <NavDropdown.Item href="#samsung">Samsung</NavDropdown.Item>
              <NavDropdown.Item href="#samsung">Clothes</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#all/products">All Products</NavDropdown.Item>
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
        </Navbar.Collapse>

        <Nav style={{ marginLeft: isLargeScreen ? null : '310px' }}>
      <Link to="/cart" style={{ textDecoration: 'none' }}>
        <div style={{ position: 'relative' }}>
          <ShoppingCartIcon style={{color: '#2dace4'}} />
          <Badge
            style={{
              color: 'red',
              position: 'absolute',
              top: '-8px',
              right: '-8px',
            }}
          >
            {cart.length}
          </Badge>
        </div>
      </Link>
    </Nav>
      </Navbar>
      </div>
      </>
    );
  };
  
  export default Header;
  
