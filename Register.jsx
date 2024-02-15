import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "./src/Footer";
import Navbar from "./src/Navbar";

export default function Register() {
  const { register, handleSubmit: hookFormSubmit, reset } = useForm();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_LIVE_SERVER}/api/register`,
        data
      );

      // If registration is successful, show a success message
      toast.success("Successful registration");
      reset();
      navigate("/login"); // Use navigate to redirect to the login page
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration failure
      toast.error("Registration failed. Please try again.");
      reset();
    }
  };

  return (
    <>
      <div>
        <div>
          <title>On Line Bus Booking</title>
          <Navbar />
          <form method="POST" onSubmit={hookFormSubmit(onSubmit)}>
            <div>
              <div className="container" style={{ marginTop: "5%" }}></div>
              <div className="row centered-form" style={{ marginTop: "5%" }}>
                <div className="col-lg-8 col-sm-8 col-md-2 col-sm-offset-2 col-md-offset-2">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">New User Registration</h3>
                    </div>
                    <div className="panel-body">
                      <div className="col-xs-6 col-sm-6 col-md-6">
                        <div className="form-group">
                          <span
                            id="lblFirstName"
                            style={{ fontWeight: "bold" }}
                          >
                            First Name
                          </span>
                          <input
                            {...register("firstName", {
                              required: "Please enter your first name.",
                            })}
                            type="text"
                            id="FirstName"
                            className="form-control input-sm floatlabel"
                          />

                          <br />
                        </div>
                        <div className="form-group">
                          <span id="UserName" style={{ fontWeight: "bold" }}>
                            Mobile No/User Name
                          </span>
                          <input
                            {...register("mobileNo", {
                              required: "Please enter your mobile no.",
                            })}
                            type="text"
                            id="txtMobileNo"
                            className="form-control input-sm floatlabel"
                          />

                          <br />
                        </div>
                      </div>
                      <div className="col-xs-6 col-sm-6 col-md-6">
                        <div className="form-group">
                          <span id="lblLastName" style={{ fontWeight: "bold" }}>
                            Last Name
                          </span>
                          <input
                            {...register("LastName", {
                              required: "Please enter your last name.",
                            })}
                            type="text"
                            id="LastName"
                            className="form-control input-sm floatlabel"
                          />

                          <br />
                        </div>
                        <div className="form-group">
                          <span id="lblPassword" style={{ fontWeight: "bold" }}>
                            Password
                          </span>
                          <input
                            {...register("password", {
                              required: "Please enter your password.",
                            })}
                            type="password"
                            id="txtPassword"
                            className="form-control input-sm floatlabel"
                          />

                          <br />
                        </div>
                      </div>
                      <div className="col-xs-6 col-sm-6 col-md-6">
                        <div className="form-group">
                          <span id="lblEmail" style={{ fontWeight: "bold" }}>
                            Email ID
                          </span>
                          <input
                            {...register("email", {
                              required: "Please enter your email.",
                            })}
                            type="text"
                            id="EmailID"
                            className="form-control input-sm floatlabel"
                          />

                          <br />
                        </div>
                        <div className="form-group">
                          <span id="lblAddress" style={{ fontWeight: "bold" }}>
                            Address
                          </span>
                          <input
                            {...register("address", {
                              required: "Please enter your address.",
                            })}
                            type="text"
                            id="_txtAddress"
                            className="form-control input-sm"
                          />

                          <br />
                        </div>
                      </div>
                      <div className="col-xs-6 col-sm-6 col-md-6">
                        <div className="form-group">
                          <span id="lblCity" style={{ fontWeight: "bold" }}>
                            City
                          </span>
                          <input
                            {...register("city", {
                              required: "Please enter your city.",
                            })}
                            type="text"
                            id="txtCity"
                            className="form-control input-sm"
                          />

                          <br />
                        </div>
                        <div className="form-group">
                          <span id="lblPinCode" style={{ fontWeight: "bold" }}>
                            Pincode
                          </span>
                          <input
                            {...register("pincode", {
                              required: "Please enter your pincode.",
                            })}
                            type="text"
                            id="txtPincode"
                            className="form-control input-sm floatlabel"
                          />

                          <br />
                        </div>
                      </div>
                      <div className="col-xs-6 col-sm-6 col-md-6">
                        <div className="form-group">
                          <button id="btnSave" className="btn btn-info ">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
