import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import {
  collection,
  onSnapshot,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import egg from "../images/buy-egg.webp";
import Header from "../Header";
import Footer from "../Footer";

const Egg = (props) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  let [trackingNo, setTrackingNo] = useState(
    Math.floor(Math.random() * 1000000000000)
  );

  let [productName, setProductName] = useState("Fresh Egg");
  let [quantity, setQuantity] = useState(1);
  let [price, setPrice] = useState(8);
  let [shippingFee, setShippingFee] = useState(60);
  let [totalPrice, setTotalPrice] = useState(68);
  let [status, setStatus] = useState("Add To Cart");
  let [url, setUrl] = useState("egg");

  const incrementCount = () => {
    quantity++;
    setTotalPrice(quantity * price + shippingFee);
    setQuantity(quantity);
  };

  const decrementCount = () => {
    quantity--;
    setTotalPrice(quantity * price + shippingFee);
    if (quantity <= 1) {
      quantity = 1;
      setTotalPrice(quantity * price + shippingFee);
    }
    setQuantity(quantity);
  };

  // Create
  const addToCart = (e) => {
    e.preventDefault();
    setProduct([...product, productName]);
    addDoc(collection(db, "product"), {
      uid: user.uid,
      trackingNo: trackingNo,
      productName: productName,
      quantity: quantity,
      price: price,
      shippingFee: shippingFee,
      totalPrice: totalPrice,
      status: status,
      url: url,
      timestamp: serverTimestamp(),
    });
    if (product) navigate("/add-to-cart");
    setProductName("");
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    onSnapshot(collection(db, "product"), (snapshot) => {
      setProduct(snapshot.docs.map((doc) => doc.data()));
    });
  }, [user, loading, product, navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header />
      <section style={{ marginTop: "80px" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <center>
                <img src={egg} height={300} width={300} alt="poster" />
              </center>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <center>
                <div className="card-body" style={{ marginTop: "20px" }}>
                  <h1 className="card-title mb-2">Fresh Eggs</h1>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Price: PHP 8
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Shipping Fee: PHP 60
                  </h6>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <form>
                    <div className="form-group mb-2" hidden>
                      <label
                        htmlFor="productName"
                        className="form-label"
                        style={{ float: "left" }}
                      >
                        Tracking No
                      </label>
                      <input
                        id="productName"
                        className="form-control"
                        type="text"
                        value={trackingNo}
                        onChange={(e) => setTrackingNo(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-2" hidden>
                      <label
                        htmlFor="productName"
                        className="form-label"
                        style={{ float: "left" }}
                      >
                        Product Name
                      </label>
                      <input
                        id="productName"
                        className="form-control"
                        type="text"
                        value={productName}
                        onChange={(e) => setProduct(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-2" hidden>
                      <label
                        htmlFor="price"
                        className="form-label"
                        style={{ float: "left" }}
                      >
                        Price
                      </label>
                      <input
                        id="price"
                        className="form-control"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label
                        htmlFor="quantity"
                        className="form-label"
                        style={{ float: "left" }}
                        hidden
                      >
                        Quantity
                      </label>
                      <input
                        id="quantity"
                        className="btn btn-primary"
                        onClick={decrementCount}
                        type="button"
                        value="-"
                        style={{ marginRight: "5px" }}
                      />
                      <input
                        id="quantity"
                        className="btn btn-light"
                        type="number"
                        value={quantity}
                        style={{ width: "80px", border: "1px solid black" }}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <input
                        id="quantity"
                        className="btn btn-primary"
                        onClick={incrementCount}
                        type="button"
                        value="+"
                        style={{ marginLeft: "5px" }}
                      />
                    </div>
                    <div className="form-group mb-2" hidden>
                      <label
                        htmlFor="shippingFee"
                        className="form-label"
                        style={{ float: "left" }}
                      >
                        Shipping Fee
                      </label>
                      <input
                        id="shippingFee"
                        className="form-control"
                        type="number"
                        value={shippingFee}
                        onChange={(e) => setShippingFee(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-2" hidden>
                      <label
                        htmlFor="totalPrice"
                        className="form-label"
                        style={{ float: "left" }}
                      >
                        Total Price
                      </label>
                      <input
                        id="totalPrice"
                        className="form-control"
                        type="number"
                        value={totalPrice}
                        onChange={(e) => setTotalPrice(e.target.value)}
                        hidden
                      />
                    </div>
                    <div className="form-group mb-4" hidden>
                      <label
                        htmlFor="status"
                        className="form-label"
                        style={{ float: "left" }}
                      >
                        Delivery Status
                      </label>
                      <input
                        id="status"
                        className="form-control"
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-4" hidden>
                      <label
                        htmlFor="url"
                        className="form-label"
                        style={{ float: "left" }}
                      >
                        Url
                      </label>
                      <input
                        id="url"
                        className="form-control"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>

                    <h6 className="card-subtitle my-4 text-muted mb-4">
                      Total: ₱{price * quantity + shippingFee}
                    </h6>

                    <button
                      tyepe="submit"
                      className="btn-grad"
                      onClick={addToCart}
                    >
                      Add to Cart
                    </button>
                  </form>
                </div>
              </center>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default Egg;
