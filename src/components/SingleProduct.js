import { useState } from "react";
import {
  Card,
  CardHeader,
  IconButton,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { Link, useHistory } from "react-router-dom";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const SingleProduct = ({ prod }) => {
  const history = useHistory();
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleBuyNowClick = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: prod,
    });
    history.push(`/buynow/${prod.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={
          <Typography
            variant="subtitle1"
            color="text.primary"
            style={{ fontSize: "15px", fontWeight: "bold" }}
          >
            {prod && prod.name}
          </Typography>
        }
        subheader={
          <Typography
            variant="subtitle1"
            color="text.secondary"
            style={{ color: "green" }}
          >
            Tshs. {prod && prod.price.split(".")[0]}
          </Typography>
        }
      />
      <a href="/proddetails" style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          height="194"
          image={prod && prod.image}
          alt="prod Image"
          style={{ width: "100%" }}
        />
      </a>
      <CardContent
        sx={{
       
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" color="text.primary" align="center">
          This section will be occupied by a short description of the product. The description will be very short.
          This section will be occupied by a short description of the product. The description will be very short.
        </Typography>
      </CardContent>
      <div className="row" style={{ justifyContent: "center" }}>
    <Rating rating={prod.ratings} />
  </div>

  
    {!prod.inStock ? (
      <div className="row" style={{ justifyContent: "center" }}>
      <Typography
        variant="body2"
        color="text.primary"
        align="center"
        style={{ color: "red" }}
      >
        Out of Stock
      </Typography>
        </div>
      ) : (
        <div className="row" style={{ justifyContent: "center" }}>
        <CardActions disableSpacing>
          {cart.some((p) => p.id === prod.id) ? (
            <IconButton
              aria-label="remove from cart"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              <RemoveShoppingCartIcon style={{ color: "red" }} />
            </IconButton>
          ) : (
            <IconButton
              aria-label="add to cart"
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
            >
              <AddShoppingCartIcon style={{ color: "blue" }} />
            </IconButton>
          )}
          <IconButton aria-label="buy now" onClick={handleBuyNowClick}>
            <MonetizationOnIcon style={{ color: "green" }}/>
          </IconButton>
        </CardActions>
        </div>
      )}
    </Card>
  );
};

export default SingleProduct;
