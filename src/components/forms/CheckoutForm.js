import React, { useEffect, useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { db, auth } from "../../firebase";
import {
  updateDoc,
  collection,
  doc,
  onSnapshot,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import Header from "../Header";
import Footer from "../Footer";

const CheckoutForm = (_) => {
  const { state } = useLocation();
  const data = state.product;
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [product, setProduct] = useState([]);

  let [customerName, setCustomerName] = useState("");
  let [customerEmail, setCustomerEmail] = useState("");
  let [contactNo, setContactNo] = useState("");
  let [address, setAddress] = useState("");
  const [trackingNo, setTrackingNo] = useState(data.trackingNo);
  const [productName, setProductName] = useState(data.productName);
  const [price, setPrice] = useState(data.price);
  const [quantity, setQuantity] = useState(data.quantity);
  const [shippingFee, setShippingFee] = useState(data.shippingFee);
  const [paymentMethod, setPaymentMethod] = useState(data.paymentMethod);
  const [totalPrice, setTotalPrice] = useState(data.totalPrice);
  const [status, setStatus] = useState(data.status);
  const [arrival, setArrival] = useState("");
  const [timestampCheckout, setTimestampCheckout] = useState("");
  const [totalPriceString, setTotalPriceString] = useState(data.totalPrice);

  const computeArrival = () => {
    const current = new Date();
    const arrival = new Date(current.getTime() + 3 * 24 * 60 * 60 * 1000);
    setArrival(arrival.toDateString());
  };

  const convertTimestamp = () => {
    const current = new Date();
    const timestampCheckout = new Date(current.getTime());
    setTimestampCheckout(timestampCheckout.toDateString());
  };

  const productCheckout = async (e) => {
    setProduct([...product]);
    await updateDoc(doc(db, "product", data.id), {
      trackingNo: trackingNo,
      customerName: customerName,
      customerEmail: customerEmail,
      contactNo: contactNo,
      address: address,
      productName: productName,
      price: price,
      quantity: quantity,
      shippingFee: shippingFee,
      paymentMethod: paymentMethod,
      totalPrice: totalPrice,
      status: "Checkout",
      arrival: arrival,
      timestampCheckout: timestampCheckout,
      timestamp: serverTimestamp(),
    });
    if (product) navigate("/checkout");
  };

  const fetchCustomerInfo = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      if (
        data.customerFirstName === undefined ||
        data.customerLastName === undefined
      ) {
        setCustomerName("");
      } else {
        setCustomerName(`${data.customerFirstName} ${data.customerLastName}`);
      }
      setCustomerEmail(data.customerEmail);
      setContactNo(data.contactNo);
      if (
        data.street === undefined ||
        data.barangay === undefined ||
        data.city === undefined ||
        data.province === undefined ||
        data.country === undefined ||
        data.zipCode === undefined
      ) {
        setAddress("");
      } else {
        setAddress(
          `${data.street}, ${data.barangay}, ${data.city}, ${data.province}, ${data.region}, ${data.country}, ${data.zipCode}`
        );
      }
    } catch (err) {
      console.error(err);
      // alert("Error fetching customer info");
    }
  };

  const renderTooltip = (props) => (
    <p className="bg-dark text-light p-1 rounded border-0" {...props}>
      Edit your customer info if the field is empty.
    </p>
  );

  useEffect(() => {
    fetchCustomerInfo();
    computeArrival();
    convertTimestamp();
    console.log(data);
    if (loading) return;
    if (!user) return navigate("/");

    const totalPriceStringFormatted = totalPriceString.toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });
    setTotalPriceString(totalPriceStringFormatted);

    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
      if (window.location.pathname !== "/add-to-cart") {
        window.location.href = "/add-to-cart";
      }
    };

    const x = collection(db, "product");
    const y = onSnapshot(x, (querySnapshot) => {
      let z = [];
      querySnapshot.forEach((doc) => {
        z.push({ ...doc.data(), id: doc.id });
      });
      setProduct(z);
    });
    return () => y();
  }, [user, loading, data, navigate]); // eslint-disable-line react-hooks/exhaustive-deps

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
                  <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h1>Checkout Form</h1>
                  </div>
                  <form>
                    <div className="row" key={data.id} data={data}>
                      <div className="col-md-8 col-lg-7 col-xl-6 mb-4">
                        <h4>
                          Customer Information&nbsp;
                          <OverlayTrigger
                            placement="right"
                            overlay={renderTooltip}
                          >
                            <span
                              className="border border-primary text-primary"
                              style={{
                                border: "1px solid red",
                                paddingLeft: "6px",
                                paddingRight: "6px",
                                borderRadius: "50%",
                                fontSize: "12px",
                                cursor: "pointer",
                              }}
                            >
                              ?
                            </span>
                          </OverlayTrigger>
                          <Link
                            title="Go to Profile To Edit Customer Information"
                            to="/profile"
                            className="btn btn-primary btn-sm"
                            style={{ float: "right", marginTop: "-5px" }}
                          >
                            Edit Info
                          </Link>
                        </h4>
                        <br />
                        <div className="form-group mb-2">
                          <label htmlFor="trackingNo">Tracking No</label>
                          <input
                            type="text"
                            className="form-control border-light bg-light"
                            id="trackingNo"
                            value={trackingNo}
                            onChange={(e) => setTrackingNo(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="customerName">Customer Name</label>
                          <input
                            type="text"
                            className="form-control border-light bg-light"
                            style={{ textTransform: "capitalize" }}
                            id="customerName"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="customerEmail">Customer Email</label>
                          <input
                            type="email"
                            className="form-control border-light bg-light"
                            id="customerEmail"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="contactNo">Contact No</label>
                          <input
                            type="tel"
                            className="form-control border-light bg-light"
                            style={{ textTransform: "capitalize" }}
                            pattern="^(09|\+639)\d{9}$"
                            id="contactNo"
                            value={contactNo}
                            onChange={(e) => setContactNo(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="address">Address</label>
                          <input
                            type="text"
                            className="form-control border-light bg-light"
                            style={{ textTransform: "capitalize" }}
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-8 col-lg-7 col-xl-6 mb-4">
                        <h4>Product Information</h4>
                        <br />
                        <div className="form-group mb-2">
                          <label htmlFor="productName">Product Name</label>
                          <input
                            type="text"
                            className="form-control border-light bg-light"
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="price">Price</label>
                          <input
                            type="text"
                            className="form-control border-light bg-light"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="quantity">Quantity</label>
                          <input
                            type="text"
                            className="form-control border-light bg-light"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="shippingFee">Shipping Fee</label>
                          <input
                            type="text"
                            className="form-control border-light bg-light"
                            id="shippingFee"
                            value={shippingFee}
                            onChange={(e) => setShippingFee(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="shippingFee">Arrival</label>
                          <input
                            type="text"
                            className="form-control border-light bg-light"
                            id="arrival"
                            value={arrival}
                            onChange={(e) => setArrival(e.target.value)}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="col-md-8 col-lg-7 col-xl-6 mb-4">
                        <h4>Payment Method</h4>
                        <br />
                        <div className="form-group mb-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="paymentMethod"
                              value="Cash On Delivery"
                              checked={paymentMethod === "Cash On Delivery"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              required
                            />
                            <label
                              className="form-check-label"
                              htmlFor="paymentMethod"
                            >
                              Cash On Delivery
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="paymentMethod2"
                              value="GCash"
                              checked={paymentMethod === "GCash"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              disabled
                            />
                            <label
                              className="form-check-label"
                              htmlFor="paymentMethod2"
                            >
                              GCash
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="paymentMethod3"
                              value="Paymaya"
                              checked={paymentMethod === "Paymaya"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              disabled
                            />
                            <label
                              className="form-check-label"
                              htmlFor="paymentMethod3"
                            >
                              Paymaya
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8 col-lg-7 col-xl-6 mb-4">
                        <h4>Total Price</h4>
                        <br />
                        <div className="form-group mb-2">
                          <h5>{totalPriceString}</h5>
                        </div>

                        <div className="form-group mb-2" hidden>
                          <input
                            type="text"
                            className="form-control border-light bg-transparent"
                            id="totalPrice"
                            value={totalPrice}
                            onChange={(e) => setTotalPrice(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-2" hidden>
                          <input
                            type="text"
                            className="form-control border-light bg-light"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-2" hidden>
                          <input
                            type="text"
                            className="form-control border-light bg-light"
                            id="status"
                            value={timestampCheckout}
                            onChange={(e) =>
                              setTimestampCheckout(e.target.value)
                            }
                            readOnly
                          />
                        </div>
                      </div>
                      <center>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ width: "180px" }}
                          onClick={productCheckout}
                          disabled={paymentMethod === ""}
                        >
                          Checkout
                        </button>
                      </center>
                    </div>
                  </form>
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

export default CheckoutForm;
