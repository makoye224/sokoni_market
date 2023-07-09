import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import sokoni from "../media/sokoni.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaPowerOff,
  FaEnvelope,
  FaShoppingBasket,
  FaCartArrowDown,
  FaCartPlus,
} from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap";
import { CartState } from "../context/Context";
import { TextField } from "@material-ui/core";
import { useMediaQuery } from '@mui/material';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 128,
  },
}));

export default function Header() {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);

  const handleSearchIconClick = () => {
    setIsSearchIconClicked(!isSearchIconClicked);
  };
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <Box sx={{ flexGrow: 1 }}>
  <AppBar position="static" sx={{ backgroundColor: "#212529" }}>
    <StyledToolbar>
      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 1, alignSelf: "flex-end" }}
      >
        <a href="/">
          <img
            src={sokoni}
            style={{ height: "100px", width: "100px", marginTop: "-15px" }}
            alt="sokoni logo"
            className="img-fluid"
          />
        </a>
      </Typography>
      {!isSearchIconClicked && (
  <>
    {!isSmallScreen && (
      <>
      <div style={{marginTop: '43px'}}>
        <Link to="/#" style={{ textDecoration: "none", marginRight: "10px", marginTop: '20px' }}>
          Electronics
        </Link>
        <Link to="/#" style={{ textDecoration: "none", marginRight: "10px", marginTop: '20px' }}>
          Fashion
        </Link>
        <Link to="/#" style={{ textDecoration: "none", marginRight: "10px", marginTop: '20px' }}>
          Food and Beverage
        </Link>
        </div>
      </>
    )}
  </>
)}

          
          {isSearchIconClicked && (
            <TextField
              id="search"
              variant="outlined"
              size="small"
              placeholder="Search Product"
              onChange={(e) => {
                productDispatch({
                  type: 'FILTER_BY_SEARCH',
                  payload: e.target.value,
                });
              }}
              style={{marginTop: '35px', backgroundColor: 'white', borderRadius: '1.2rem' }}
            />
          )}
          
          <IconButton
            size="large"
            aria-label="search"
            color="inherit"
            sx={{
              color: "#2dace4",
              width: "60px",
              height: "60px",
              "& svg": {
                fontSize: "36px",
              },
            }}
            onClick={handleSearchIconClick}
            style={{marginTop: '25px'}}
          >
            <SearchIcon />
          </IconButton>

          <Link to="/cart" style={{ textDecoration: "none" }}>
            <div style={{ position: "relative" }}>
              <ShoppingCartIcon
                style={{
                  color: "#2dace4",
                  width: "30px",
                  height: "30px",
                  marginTop: "43px",
                }}
              />
              <Badge
                style={{
                  color: "white",
                  position: "absolute",
                  top: "30px",
                  right: "-8px",
                  scale: "120%",
                }}
              >
                {cart.length}
              </Badge>
            </div>
          </Link>

          <IconButton
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit"
            sx={{
              color: "#2dace4",
              width: "60px",
              height: "60px",
              "& svg": {
                fontSize: "36px",
              },
            }}
            style={{marginTop: '25px'}}
          >
            <MoreIcon />
          </IconButton>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}
