import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";
import App from "./App";
import "./index.css";

import { registerSW } from "virtual:pwa-register";

registerSW({
  immediate: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <WishlistProvider>
      <CartProvider>
        <Toaster position="top-right" />
        <App />
      </CartProvider>
    </WishlistProvider>
  </BrowserRouter>

);