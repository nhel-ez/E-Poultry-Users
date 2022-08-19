import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from ".././firebase";
import { query, collection, onSnapshot } from "firebase/firestore";
import poster from "./images/poster.webp";
import chicken from "./images/buy-chicken.webp";
import egg from "./images/buy-egg.webp";
import PreLoader from ".././PreLoader";
import Header from "./Header";
import Footer from "./Footer";

const Dashboard = (props) => {
  const [user, loading] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    const x = query(collection(db, "users"));
    const y = onSnapshot(x, (querySnapshot) => {
      let z = [];
      querySnapshot.forEach((doc) => {
        z.push({ ...doc.data(), id: doc.id });
        console.log(doc.id);
      });
      if (z.length > 0) {
        setUsers(
          z
            .filter((doc) => doc.uid === user.uid)
            .sort((a, b) => b.timestamp - a.timestamp)
        );
      }
    });

    return () => y();
  }, [user, loading, navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header />
      <section className="vh-100" style={{ marginTop: "80px" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            {users.map((data) => {
              return (
                <div className="col-md-8 col-lg-7 col-xl-6" key={data.id}>
                  <center>
                    <h1>
                      Welcome{" "}
                      <span style={{ color: "#004077" }}>{data.name}</span> to
                      E-
                      <span style={{ color: "#004077" }}>Poultry</span>
                    </h1>
                    <p className="lead" style={{ marginBottom: "40px" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <button className="btn-grad">Purchase Now!</button>
                  </center>
                </div>
              );
            })}
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <center>
                <img src={poster} height={300} width={300} alt="poster" />
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
              <h4>Living Chickens and Eggs</h4>
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
                        <h5 className="card-title">Living Chickens</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          PHP 100
                        </h6>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <Link
                          to={"/chicken"}
                          style={{ textDecoration: "none" }}
                          onClick={() => {
                            PreLoader();
                          }}
                        >
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
                        <Link
                          to={"/egg"}
                          style={{ textDecoration: "none" }}
                          onClick={() => {
                            PreLoader();
                          }}
                        >
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
export default Dashboard;
