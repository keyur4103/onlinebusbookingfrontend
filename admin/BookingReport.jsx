import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";

function BookingReport() {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    // Fetch all passengers from MongoDB
    const fetchPassengers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LIVE_SERVER}/api/passengers`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch passengers");
        }
        const data = await response.json();
        console.log("🚀 ~ fetchPassengers ~ data:", data);
        setPassengers(data);
      } catch (error) {
        console.error("Error fetching passengers:", error);
      }
    };

    fetchPassengers();
  }, []);

  // Extract only one passenger's name
  console.log(passengers[0]);
  return (
    <>
      <AdminNavbar />

      <div className="container" style={{ marginTop: "6%" }}>
        <div>
          <table
            cellSpacing={0}
            rules="all"
            border={1}
            id="ContentPlaceHolder1_gdTicketReport"
            style={{
              fontSize: "12pt",
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              <tr>
                <th scope="col">Bus Name</th>
                <th scope="col">Passenger Name</th>
                <th scope="col">Email ID</th>
                <th scope="col">Contact No</th>
                <th scope="col">Origin</th>
                <th scope="col">Destination</th>
                <th scope="col">Travel Date</th>
                <th scope="col">Seat No</th>
                <th scope="col">Fare</th>
                <th scope="col">Booked By</th>
              </tr>

              {passengers.map((passenger, index) => (
                <tr key={index}>
                  <td>{passenger.busname}</td>
                  <td>{passenger?.passengers?.[0]?.firstname}</td>
                  <td>{passenger.userId ? passenger.userId.email : "N/A"}</td>
                  <td>
                    {passenger.userId ? passenger.userId.mobileNo : "N/A"}
                  </td>
                  <td>{passenger.origin}</td>
                  <td>{passenger.destination}</td>
                  <td>{passenger.selecteddate}</td>
                  <td>
                    {passenger.confirmseats.map((seat, index) => (
                      <span key={index}>
                        {index > 0 && ", "} {seat}
                      </span>
                    ))}
                  </td>
                  <td>{passenger.totalamount}</td>
                  <td>
                    {passenger.userId
                      ? `${passenger.userId.firstName} ${passenger.userId.lastName}`
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

export default BookingReport;
