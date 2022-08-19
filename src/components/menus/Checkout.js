import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import Header from "../Header";
import Footer from "../Footer";

const Checkout = (props) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [noData, setNoData] = useState("***************************");

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    const x = query(collection(db, "product"));
    const y = onSnapshot(x, (querySnapshot) => {
      let z = [];
      querySnapshot.forEach((doc) => {
        z.push({ ...doc.data(), id: doc.id });
      });
      if (z.length > 0) {
        setProduct(
          z
            .filter((doc) => doc.uid === user.uid && doc.status === "Checkout")
            .sort((a, b) => b.timestamp - a.timestamp)
        );
      } else {
        setNoData(noData);
      }
    });
    return () => y();
  }, [user, loading, navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header />
      <section
        style={{
          marginTop: "60px",
          marginLeft: "10px",
          marginRight: "10px",
          marginBottom: "20px",
        }}
      >
        <div className="container py-5">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="card shadow p-3 mb-5 bg-white rounded border-0">
              <div className="card-body">
                <div className="row">
                  <div
                    id="show-data"
                    style={{
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <h2>Checkout</h2>
                    <div className="row mt-5">
                      <center>
                        <div
                          style={{
                            border: "1px solid gray",
                          }}
                        ></div>
                        <button
                          className="btn mx-3"
                          style={{
                            backgroundColor: "green",
                            borderColor: "transparent",
                            borderRadius: "50%",
                            width: "25px",
                            height: "25px",
                            marginTop: "-30px",
                          }}
                        ></button>
                        <button
                          className="btn mx-3"
                          style={{
                            backgroundColor: "black",
                            borderColor: "transparent",
                            borderRadius: "50%",
                            width: "25px",
                            height: "25px",
                            marginTop: "-30px",
                          }}
                        ></button>
                        <button
                          className="btn mx-3"
                          style={{
                            backgroundColor: "black",
                            borderColor: "transparent",
                            borderRadius: "50%",
                            width: "25px",
                            height: "25px",
                            marginTop: "-30px",
                          }}
                        ></button>
                      </center>
                    </div>
                  </div>
                  {product.map((data) => {
                    return (
                      <div key={data.id}>
                        <span className="text-muted">
                          Tracking No.:&nbsp;{data.trackingNo}
                        </span>
                        <br />
                        <span className="text-muted">
                          Name:&nbsp;{data.customerName}
                        </span>
                        <br />
                        <span className="text-muted">
                          Email:&nbsp;{data.customerEmail}
                        </span>
                        <br />
                        <span className="text-muted">
                          Contact No.:&nbsp;{data.contactNo}
                        </span>
                        <br />
                        <span className="text-muted">
                          Address:&nbsp;{data.address}
                        </span>
                        <br />
                        <span className="text-muted">
                          Product Name:&nbsp;{data.productName}
                        </span>
                        <br />
                        <span className="text-muted">
                          Quantity:&nbsp;{data.quantity}
                        </span>
                        <br />
                        <span className="text-muted">
                          Price:&nbsp;₱{data.price}
                        </span>
                        <br />
                        <span className="text-muted">
                          Shipping Fee:&nbsp;₱{data.shippingFee}
                        </span>
                        <br />
                        <span className="text-muted">
                          Total Price:&nbsp;₱{data.totalPrice}
                        </span>
                        <br />
                        <span className="text-muted">
                          Payment Method:&nbsp;{data.paymentMethod}
                        </span>
                        <br />
                        <span className="text-muted">
                          Status:&nbsp;{data.status}
                        </span>
                        <br />
                        <span className="text-muted">
                          Date of Checkout:&nbsp;{data.timestampCheckout}
                        </span>
                        <br />
                        <span className="text-muted">
                          Expected Arrival:&nbsp;{data.arrival}
                        </span>
                        <br />
                        <br />
                        <Link className="btn btn-dark m-1" to={"/" + data.url}>
                          View Product
                        </Link>
                        <Link
                          className="btn btn-danger m-2"
                          to={{
                            pathname: `/cancel-form/${data.id}`,
                          }}
                          state={{ product: data }}
                        >
                          Cancel
                        </Link>

                        <br />

                        <hr />
                      </div>
                    );
                  })}
                  <div>
                    <center>
                      <span>{noData}</span>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default Checkout;
