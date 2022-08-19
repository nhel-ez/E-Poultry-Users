import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  updateDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Header from "../Header";
import Footer from "../Footer";

const CancelForm = (_) => {
  const { state } = useLocation();
  const data = state.product;
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [product, setProduct] = useState([]);
  const [status, setStatus] = useState(data.status);
  const [timestampCancel, setTimestampCancel] = useState("");

  const convertTimestamp = () => {
    const current = new Date();
    const timestampCancel = new Date(current.getTime());
    setTimestampCancel(timestampCancel.toDateString());
  };

  const productCancel = async (e) => {
    setProduct([...product]);
    await updateDoc(doc(db, "product", data.id), {
      status: "Canceled",
      timestampCancel: timestampCancel,
      timestamp: serverTimestamp(),
    });
    if (product) navigate("/cancel");
  };

  useEffect(() => {
    convertTimestamp();
    if (loading) return;
    if (!user) return navigate("/");

    console.log(data);
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
                    <h4>Are you sure you want to cancel this product?</h4>
                  </div>
                  <form>
                    <div className="row" key={data.id} data={data}>
                      <div className="col-md-8 col-lg-7 col-xl-6 mb-4">
                        <div className="form-group mb-2" hidden>
                          <input
                            type="text"
                            className="form-control border-0 bg-light"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-2" hidden>
                          <input
                            type="text"
                            className="form-control border-0 bg-light"
                            id="status"
                            value={timestampCancel}
                            onChange={(e) => setTimestampCancel(e.target.value)}
                            readOnly
                          />
                        </div>
                      </div>
                      <center>
                        <button
                          type="button"
                          className="btn btn-danger"
                          style={{ width: "180px" }}
                          onClick={productCancel}
                        >
                          Yes, Cancel
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

export default CancelForm;
