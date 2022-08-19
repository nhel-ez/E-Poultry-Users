import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { db, auth } from "../../firebase";
import {
  updateDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Header from "../Header";
import Footer from "../Footer";

const CustomerInfo = (_) => {
  const { state } = useLocation();
  const data = state.users;
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [users, setUsers] = useState([]);

  const [customerFirstName, setCustomerFirstName] = useState(
    data.customerFirstName
  );
  const [customerLastName, setCustomerLastName] = useState(
    data.customerLastName
  );
  const [customerEmail, setCustomerEmail] = useState(data.customerEmail);
  const [contactNo, setContactNo] = useState(data.contactNo);
  const [country, setCountry] = useState("Philippines");
  const [region, setRegion] = useState(data.region);
  const [province, setProvince] = useState(data.province);
  const [city, setCity] = useState(data.city);
  const [barangay, setBarangay] = useState(data.barangay);
  const [street, setStreet] = useState(data.street);
  const [zipCode, setZipCode] = useState(data.zipCode);

  const AddCustomerInfo = async (e) => {
    setUsers([...users]);
    await updateDoc(doc(db, "users", data.id), {
      customerFirstName: customerFirstName,
      customerLastName: customerLastName,
      customerEmail: customerEmail,
      contactNo: contactNo,
      country: country,
      region: region,
      province: province,
      city: city,
      barangay: barangay,
      street: street,
      zipCode: zipCode,
      timestamp: serverTimestamp(),
    });
    if (users) navigate("/profile");
  };

  useEffect(() => {
    console.log(data);
    if (loading) return;
    if (!user) return navigate("/");

    const x = collection(db, "users");
    const y = onSnapshot(x, (querySnapshot) => {
      let z = [];
      querySnapshot.forEach((doc) => {
        z.push({ ...doc.data(), id: doc.id });
      });
      setUsers(z);
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
                    <h2>Add Customer Information</h2>
                  </div>
                  <form>
                    <div className="row">
                      <div className="col-md-8 col-lg-7 col-xl-6 mb-4">
                        <h4>Personal Information</h4>
                        <br />
                        <div className="form-group mb-2">
                          <label htmlFor="customerFirstName">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="customerFirstName"
                            value={customerFirstName}
                            onChange={(e) =>
                              setCustomerFirstName(e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="customerLastName">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="customerLastName"
                            value={customerLastName}
                            onChange={(e) =>
                              setCustomerLastName(e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="customerEmail">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="customerEmail"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="contactNo">Contact Number</label>
                          <input
                            type="tel"
                            className="form-control"
                            id="contactNo"
                            value={contactNo}
                            onChange={(e) => setContactNo(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-8 col-lg-7 col-xl-6 mb-4">
                        <h4>Address</h4>
                        <br />
                        <div className="form-group mb-2">
                          <label htmlFor="country">Country</label>
                          <input
                            type="text"
                            className="form-control border-light bg-light"
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="region">Region</label>
                          <input
                            type="text"
                            className="form-control"
                            id="region"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="province">Province</label>
                          <input
                            type="text"
                            className="form-control"
                            id="province"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="city">City</label>
                          <input
                            type="text"
                            className="form-control"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="barangay">Barangay</label>
                          <input
                            type="text"
                            className="form-control"
                            id="barangay"
                            value={barangay}
                            onChange={(e) => setBarangay(e.target.value)}
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="street">Street</label>
                          <input
                            type="text"
                            className="form-control"
                            id="street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="zipCode">Zip Code</label>
                          <input
                            type="number"
                            className="form-control"
                            id="zipCode"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                          />
                        </div>
                      </div>

                      <center>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ width: "180px" }}
                          onClick={AddCustomerInfo}
                        >
                          Save
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
export default CustomerInfo;
