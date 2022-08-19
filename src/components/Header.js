import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image from "./images/chicken-logo.webp";
import { auth, db, logout } from ".././firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, onSnapshot } from "firebase/firestore";
import PreLoader from ".././PreLoader";

const Header = (props) => {
  const [user, loading] = useAuthState(auth);
  const [countAddToCart, setCountAddToCartt] = useState(0);
  const [countCheckout, setCountCheckout] = useState(0);
  const [countToShip, setCounToShip] = useState(0);
  const [countCanceled, setCountCanceled] = useState(0);
  const [countDelivered, setCountDelivered] = useState(0);

  useEffect(() => {
    if (loading) return;
    const x = query(collection(db, "product"));
    const y = onSnapshot(x, (querySnapshot) => {
      let z = [];
      querySnapshot.forEach((doc) => {
        z.push({ ...doc.data(), id: doc.id });
      });
      const countAddToCart = z
        .filter((doc) => doc.uid === user.uid && doc.status === "Add To Cart")
        .sort((a, b) => b.timestamp - a.timestamp);
      const countCanceled = z
        .filter((doc) => doc.uid === user.uid && doc.status === "Checkout")
        .sort((a, b) => b.timestamp - a.timestamp);
      const countCheckout = z
        .filter((doc) => doc.uid === user.uid && doc.status === "Canceled")
        .sort((a, b) => b.timestamp - a.timestamp);
      const countToShip = z
        .filter((doc) => doc.uid === user.uid && doc.status === "To Ship")
        .sort((a, b) => b.timestamp - a.timestamp);
      const countDelivered = z
        .filter((doc) => doc.uid === user.uid && doc.status === "Delivered")
        .sort((a, b) => b.timestamp - a.timestamp);
      // total price of all products
      setCountAddToCartt(countAddToCart.length);
      setCountCheckout(countCanceled.length);
      setCounToShip(countToShip.length);
      setCountCanceled(countCheckout.length);
      setCountDelivered(countDelivered.length);
    });
    return () => y();
  }, [user, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to={"/dashboard"}
          onClick={() => {
            PreLoader();
          }}
        >
          <img src={image} height={40} width={40} alt="logo" />
          E-
          <span style={{ color: "#004077" }}>Poultry</span>
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav">
            <Link
              className="nav-link"
              to={"/dashboard"}
              onClick={() => {
                PreLoader();
              }}
              style={{ textAlign: "center" }}
            >
              Marketplace
            </Link>
            <Link
              className="nav-link"
              to={"/about"}
              style={{ textAlign: "center" }}
              onClick={() => {
                PreLoader();
              }}
            >
              About us
            </Link>
            <div className="nav-item dropdown" style={{ textAlign: "center" }}>
              <Link
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                to={"/"}
                style={{ textAlign: "center" }}
              >
                Customer Cart
              </Link>
              <div className="dropdown-menu">
                <Link
                  className="dropdown-item"
                  to={"/add-to-cart"}
                  onClick={() => {
                    PreLoader();
                  }}
                >
                  Add To Cart&nbsp;&nbsp;
                  <span
                    className="caret"
                    style={{
                      backgroundColor: "darkred",
                      color: "white",
                      border: "1px solid transparent",
                      paddingRight: "6px",
                      paddingLeft: "6px",
                      borderRadius: "50%",
                      fontSize: "10px",
                    }}
                  >
                    {countAddToCart}
                  </span>
                </Link>
                <Link
                  className="dropdown-item"
                  to={"/checkout"}
                  onClick={() => {
                    PreLoader();
                  }}
                >
                  Checkout&nbsp;&nbsp;
                  <span
                    className="caret"
                    style={{
                      backgroundColor: "darkred",
                      color: "white",
                      border: "1px solid transparent",
                      paddingRight: "6px",
                      paddingLeft: "6px",
                      borderRadius: "50%",
                      fontSize: "10px",
                    }}
                  >
                    {countCheckout}
                  </span>
                </Link>
                <Link
                  className="dropdown-item"
                  to={"/toship"}
                  onClick={() => {
                    PreLoader();
                  }}
                >
                  To Ship&nbsp;&nbsp;
                  <span
                    className="caret"
                    style={{
                      backgroundColor: "darkred",
                      color: "white",
                      border: "1px solid transparent",
                      paddingRight: "6px",
                      paddingLeft: "6px",
                      borderRadius: "50%",
                      fontSize: "10px",
                    }}
                  >
                    {countToShip}
                  </span>
                </Link>
                <Link
                  className="dropdown-item"
                  to={"/cancel"}
                  onClick={() => {
                    PreLoader();
                  }}
                >
                  Canceled&nbsp;&nbsp;
                  <span
                    className="caret"
                    style={{
                      backgroundColor: "darkred",
                      color: "white",
                      border: "1px solid transparent",
                      paddingRight: "6px",
                      paddingLeft: "6px",
                      borderRadius: "50%",
                      fontSize: "10px",
                    }}
                  >
                    {countCanceled}
                  </span>
                </Link>
                <Link
                  className="dropdown-item"
                  to={"/delivered"}
                  onClick={() => {
                    PreLoader();
                  }}
                >
                  Delivered&nbsp;&nbsp;
                  <span
                    className="caret"
                    style={{
                      backgroundColor: "darkred",
                      color: "white",
                      border: "1px solid transparent",
                      paddingRight: "6px",
                      paddingLeft: "6px",
                      borderRadius: "50%",
                      fontSize: "10px",
                    }}
                  >
                    {countDelivered}
                  </span>
                </Link>
              </div>
            </div>
            <Link
              className="nav-link"
              to={"/profile"}
              onClick={() => {
                PreLoader();
              }}
              style={{ textAlign: "center" }}
            >
              Profile
            </Link>
          </div>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to={"#"} style={{ textAlign: "center" }}>
              <button className="btn btn-primary px-3" onClick={logout}>
                Logout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
