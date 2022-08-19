import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from ".././firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import image from "./images/chicken-logo.webp";
import poster from "./images/poster.webp";
import chicken from "./images/buy-chicken.webp";
import egg from "./images/buy-egg.webp";
import Footer from "./Footer";

const Preview = (props) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) return navigate("/dashboard");
  }, [user, loading, navigate]);
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
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
                to={"/prev-about"}
                style={{ textAlign: "center" }}
              >
                About us
              </Link>
            </div>
            <div className="navbar-nav ms-auto">
              <Link
                className="nav-link"
                to={"/login"}
                style={{ textAlign: "center", margin: "2px" }}
              >
                <button className="btn btn-primary px-3">Sign In</button>
              </Link>
              <Link
                className="nav-link"
                to={"/register"}
                style={{ textAlign: "center", margin: "2px" }}
              >
                <button className="btn btn-outline-primary px-3">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      ,
      <section className="vh-100" style={{ marginTop: "80px" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <center>
                <h1>
                  Welcome to E-
                  <span style={{ color: "#004077" }}>Poultry</span>
                </h1>
                <p className="lead" style={{ marginBottom: "40px" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <Link to={"/login"} style={{ textDecoration: "none" }}>
                  <button className="btn-grad" style={{ marginBottom: "40px" }}>
                    Get Started!
                  </button>
                </Link>
              </center>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <center>
                <img
                  src={poster}
                  height={300}
                  width={300}
                  alt="poster"
                  style={{ marginBottom: "40px" }}
                />
              </center>
            </div>
          </div>
        </div>
      </section>
      ,
      <center>
        <hr
          style={{
            border: "1px dashed gray",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        />
        <section className="vh-10">
          <div className="container h-10">
            <div className="row d-flex align-items-center justify-content-center h-10">
              <h1 style={{ color: "#004077" }}>Our Products</h1>
              <h4>Fresh Chickens and Eggs</h4>
            </div>
          </div>
        </section>
      </center>
      ,
      <center>
        <section className="">
          <div className="container py-5">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="container">
                <div className="row">
                  <div className="col-lg">
                    <div
                      className="card m-4"
                      style={{ maxwidth: "25rem", minWidth: "18rem" }}
                    >
                      <img src={chicken} className="card-img-top" alt="Card" />
                      <div className="card-body">
                        <h5 className="card-title">Fresh Chickens</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          PHP 100
                        </h6>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <Link to={"/login"} style={{ textDecoration: "none" }}>
                          <button className="btn-grad">Purchase Now!</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg">
                    <div
                      className="card m-4"
                      style={{ maxwidth: "25rem", minWidth: "18rem" }}
                    >
                      <img src={egg} className="card-img-top" alt="Card" />
                      <div className="card-body">
                        <h5 className="card-title">Fresh Eggs</h5>
                        <h6 className="card-subtitle mb-2 text-muted">PHP 8</h6>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <Link to={"/login"} style={{ textDecoration: "none" }}>
                          <button className="btn-grad">Purchase Now!</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </center>
      <Footer />
    </>
  );
};
export default Preview;
