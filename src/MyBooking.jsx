import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import toast from "react-hot-toast";
import axios from "axios";

const MyBooking = ({ userId }) => {
  const [bookingData, setBookingData] = useState([]);
  const UserId = localStorage.getItem("userID");
  const [showTicketDetails, setShowTicketDetails] = useState(false);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LIVE_SERVER}/booking/${UserId}`
        );
        const data = await response.json();
        console.log("🚀 ~ fetchBookingData ~ data:", data);
        setBookingData(data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchBookingData();
  }, [userId, UserId]);

  const downloadTicket = async (booking) => {
    const pdfContent = `
    <div>

      <p style="color:blue;text-align:center;">Bus Name: ${booking.busname}</p>
      <p style="color:blue;text-align:center;">Origin: ${booking.origin}</p>
      <p style="color:blue;text-align:center;">Destination: ${booking.destination}</p>
      <p style="color:blue;text-align:center;">Date of journey: ${booking.selecteddate}</p>
      <p style="color:blue;text-align:center;">Selected Seat: ${booking.selectedseat}</p>
      
    </div>
  `;

    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = pdfContent;
    document.body.appendChild(tempContainer);

    try {
      const blob = await html2pdf(tempContainer, {
        margin: 10,
        filename: "ticket.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          docBaseUrl: window.location.href,
        },
      });

      // Rest of the code...
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      document.body.removeChild(tempContainer);
    }
  };

  const downloadTicketss = async (booking) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LIVE_SERVER}/api/generatepdf`,
        {
          booking: booking,
        },
        {
          responseType: "arraybuffer", // Specify responseType as arraybuffer
        }
      );
      console.log("🚀 ~ downloadTicketss ~ response:", response);

      // Create a Blob from the array buffer data received in the response
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(pdfBlob);

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = "ticket.pdf";
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const cancelTicket = async (bookingId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to cancel this ticket?"
      );
      if (!confirmDelete) {
        return; // If user cancels, do nothing
      }

      const sendTicketsms = await axios.post(
        `${import.meta.env.VITE_LIVE_SERVER}/api/deleteticket/${bookingId}`
      );

      const response = await fetch(
        `${import.meta.env.VITE_LIVE_SERVER}/cancel/${bookingId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // You can pass additional data if needed
          body: JSON.stringify({ userId: UserId }),
        }
      );
      console.log(bookingId);
      console.log(sendTicketsms);
      if (response.ok) {
        // Update booking data after cancellation

        toast.success("Ticket canceled successfully");
        toast.success("your refund will be initiated in 24 Hours");
      } else {
        toast.error("Failed to cancel ticket");
      }
    } catch (error) {
      console.error("Error canceling ticket:", error);
      toast.error("Failed to cancel ticket");
    }
  };

  return (
    <div className="container" style={{ marginTop: "10px" }}>
      <table
        className="table table-hover table-bordered"
        cellSpacing={0}
        rules="all"
        border={1}
        style={{ borderCollapse: "collapse" }}
      >
        <tbody>
          <tr>
            <th>Bus Name</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Date of journey</th>
            <th>Selected Seat</th>
            <th>Actions</th>
          </tr>

          {bookingData.map((booking, index) => (
            <tr key={index}>
              <td>
                <span id="BusName">{booking.busname}</span>
              </td>
              <td>
                <span id="departure">{booking.origin}</span>
              </td>
              <td>
                <span id="departure">{booking.destination}</span>
              </td>
              <td>
                <span id="Arrival">{booking.selecteddate}</span>
              </td>

              <td>
                <span id="Fare">{booking.selectedseat}</span>
              </td>
              <td>
                <button onClick={() => downloadTicketss(booking)}>
                  Download Ticket
                </button>
                <button onClick={() => cancelTicket(booking.bookingId)}>
                  Cancel Ticket
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooking;
