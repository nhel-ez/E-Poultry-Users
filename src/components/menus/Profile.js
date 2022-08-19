import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import Header from "../Header";
import Footer from "../Footer";

const Profile = (props) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    const x = query(collection(db, "users"));
    const y = onSnapshot(x, (querySnapshot) => {
      let z = [];
      querySnapshot.forEach((doc) => {
        z.push({ ...doc.data(), id: doc.id });
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
            {users.map((data) => {
              return (
                <div
                  key={data.id}
                  style={{
                    marginTop: "50px",
                  }}
                >
                  <div className="card shadow p-3 mb-5 bg-white rounded border-0">
                    <div className="card-body">
                      <center>
                        <div
                          style={{
                            backgroundColor: "white",
                            borderRadius: "100%",
                            width: "fit-content",
                            height: "fit-content",
                            marginTop: "-100px",
                            padding: "0",
                            border: "5px solid white",
                          }}
                        >
                          <i
                            className="fas fa-user-circle h1"
                            style={{
                              color: "#0062c4",
                              fontSize: "120px",
                            }}
                          ></i>
                        </div>
                      </center>
                      <center>
                        <h1 style={{ color: "#004077" }}>{data.name}</h1>
                        <h6>{data.email}</h6>
                      </center>
                      <hr className="my-4" />
                      <h4>Customer Information</h4>
                      <span className="text-muted">
                        Customer Name:&nbsp;{data.customerFirstName}&nbsp;
                        {data.customerLastName}
                      </span>
                      <br />
                      <span className="text-muted">
                        Customer Email:&nbsp;{data.customerEmail}
                      </span>
                      <br />
                      <span className="text-muted">
                        Contact No.:&nbsp;{data.contactNo}
                      </span>
                      <br />
                      <span className="text-muted">
                        Address:&nbsp;{data.street}&nbsp;{data.barangay}&nbsp;
                        {data.city}&nbsp;
                        {data.province}&nbsp;{data.region}&nbsp;{data.country}
                        &nbsp;{data.zipCode}
                      </span>
                      <br />
                      <br />

                      <Link
                        className="btn btn-primary m-1"
                        to={{
                          pathname: `/customer-info/${data.id}`,
                        }}
                        state={{ users: data }}
                      >
                        Edit Info
                      </Link>
                      <Link
                        className="btn btn-outline-primary m-1"
                        to="/change-password"
                      >
                        Reset Password
                      </Link>

                      <br />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* <section
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
                    <h2>Profile</h2>
                  </div>
                  {users.map((data) => {
                    return (
                      <div key={data.id}>
                        <h4>User Information</h4>
                        <span className="text-muted">
                          Name:&nbsp;{data.name}
                        </span>
                        <br />
                        <span className="text-muted">
                          Email:&nbsp;{data.email}
                        </span>
                        <br />
                        <br />
                        <h4>Customer Information</h4>
                        <span className="text-muted">
                          Customer Name:&nbsp;{data.customerFirstName}&nbsp;
                          {data.customerLastName}
                        </span>
                        <br />
                        <span className="text-muted">
                          Customer Email:&nbsp;{data.customerEmail}
                        </span>
                        <br />
                        <span className="text-muted">
                          Contact No.:&nbsp;{data.contactNo}
                        </span>
                        <br />
                        <span className="text-muted">
                          Address:&nbsp;{data.street}&nbsp;{data.barangay}&nbsp;
                          {data.city}&nbsp;
                          {data.province}&nbsp;{data.region}&nbsp;{data.country}
                          &nbsp;{data.zipCode}
                        </span>
                        <br />
                        <br />

                        <Link
                          className="btn btn-primary m-1"
                          to={{
                            pathname: `/customer-info/${data.id}`,
                          }}
                          state={{ users: data }}
                        >
                          Edit Info
                        </Link>
                        <Link
                          className="btn btn-outline-primary m-1"
                          to="/change-password"
                        >
                          Reset Password
                        </Link>

                        <br />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <Footer />
    </>
  );
};
export default Profile;
