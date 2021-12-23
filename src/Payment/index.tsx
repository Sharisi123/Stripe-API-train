import React, { FormEvent, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./styles.module.scss";
import axios from "axios";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Payment = () => {
  const [cards, setCards] = useState([
    {
      id: "price_1JwQzQKdCS28bAB8lZopJ4IQ",
      name: "Anatoliy",
      description: "Professional at kicking dicks",
      cost: "1000",
    },
    {
      id: "price_1JwNP7KdCS28bAB8ZcG3zKvS",
      name: "Kolya",
      description: "Just Kolya",
      cost: "2500",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const redirectHandler = async (id: string) => {
    const response = await axios.post(
      "http://localhost:3001/create-checkout-session",
      [
        {
          price: id,
          quantity: 1,
        },
        {
          price: "price_1JwQzQKdCS28bAB8lZopJ4IQ",
          quantity: 3,
        },
      ],
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log(response);
    window.location.href = response.data.url;
  };

  return (
    <div className={styles.payment}>
      <Typography component="h2" variant="h2">
        Service picker
      </Typography>
      <ul>
        {cards.map((cardElement) => (
          <li>
            <Box sx={{ width: "275px" }}>
              <Card variant="outlined">
                <CardContent sx={{ padding: "10px" }}>
                  <img
                    alt="image"
                    loading="lazy"
                    src="https://liveposts.ru/upload/articles/work-business/5ccae832c5fa7.jpg"
                  />
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.primary"
                    gutterBottom
                  >
                    {cardElement.name}
                  </Typography>

                  <Typography component="div">
                    {cardElement.description}
                  </Typography>

                  <Typography component="div" sx={{ marginTop: "10px" }}>
                    {cardElement.cost} $
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        float: "right",
                        marginBottom: "10px",
                      }}
                      onClick={() => redirectHandler(cardElement.id)}
                    >
                      Add to
                    </Button>
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Payment;
