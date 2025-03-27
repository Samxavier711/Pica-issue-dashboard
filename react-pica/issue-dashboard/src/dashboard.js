// import { useState } from "react";

// export default function Dashboard() {
//   const [errorMessage, setErrorMessage] = useState("");
//   const [solution, setSolution] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!errorMessage.trim()) {
//       setError("Please enter an error message.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setSolution(""); // Clear previous solution

//     try {
//       const response = await fetch("http://127.0.0.1:5000/search_issue", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ error: errorMessage }),
//       });

//       const data = await response.json();
//       setSolution(data.output || "No solution found.");
//     } catch (err) {
//       setError("Failed to fetch solution.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <h1 className="text-2xl font-bold mb-4">Issue Resolution Dashboard</h1>

//       {/* Form to enter error message */}
//       <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
//         <label className="block text-gray-700 font-semibold mb-2">Enter Error Message:</label>
//         <textarea
//           value={errorMessage}
//           onChange={(e) => setErrorMessage(e.target.value)}
//           className="w-full p-2 border rounded-lg mb-4"
//           rows="3"
//           placeholder="Paste your error message here..."
//         ></textarea>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//           disabled={loading}
//         >
//           {loading ? "Fetching..." : "Get Solution"}
//         </button>
//       </form>

//       {/* Error Message if request fails */}
//       {error && <p className="text-red-500 mt-4">{error}</p>}

//       {/* Section to display the solution */}
//       {solution && (
//         <div className="mt-6 p-4 bg-white rounded-lg shadow-md max-w-xl">
//           <h2 className="text-lg font-semibold">Possible Solution:</h2>
//           <p className="mt-2 text-gray-700">{solution}</p>
//         </div>
//       )}
//     </div>
//   );
// }

//SECOND ITERATION  

// import { useState } from "react";

// export default function Dashboard() {
//   const [errorMessage, setErrorMessage] = useState("");
//   const [solution, setSolution] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [notifyStatus, setNotifyStatus] = useState("");

//   // Function to fetch solution
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!errorMessage.trim()) {
//       setError("Please enter an error message.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setSolution(""); 
//     setNotifyStatus(""); // Clear previous notifications

//     try {
//       const response = await fetch("http://127.0.0.1:5000/search_issue", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ error: errorMessage }),
//       });

//       const data = await response.json();
//       setSolution(data.output || "No solution found.");
//     } catch (err) {
//       setError("Failed to fetch solution.");
//     }

//     setLoading(false);
//   };

//   // Function to notify Slack
//   const handleSlackNotification = async () => {
//     if (!errorMessage.trim()) {
//       setNotifyStatus("Enter an error first before notifying Slack.");
//       return;
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:5000/notify_slack", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ error: errorMessage }),
//       });

//       const data = await response.json();
//       setNotifyStatus(data.status || "Failed to send notification.");
//     } catch (err) {
//       setNotifyStatus("Error sending Slack notification.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <h1 className="text-2xl font-bold mb-4">Issue Resolution Dashboard</h1>

//       {/* Form to enter error message */}
//       <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
//         <label className="block text-gray-700 font-semibold mb-2">Enter Error Message:</label>
//         <textarea
//           value={errorMessage}
//           onChange={(e) => setErrorMessage(e.target.value)}
//           className="w-full p-2 border rounded-lg mb-4"
//           rows="3"
//           placeholder="Paste your error message here..."
//         ></textarea>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//           disabled={loading}
//         >
//           {loading ? "Fetching..." : "Get Solution"}
//         </button>
//       </form>

//       {/* Error Message if request fails */}
//       {error && <p className="text-red-500 mt-4">{error}</p>}

//       {/* Section to display the solution */}
//       {solution && (
//         <div className="mt-6 p-4 bg-white rounded-lg shadow-md max-w-xl">
//           <h2 className="text-lg font-semibold">Possible Solution:</h2>
//           <p className="mt-2 text-gray-700">{solution}</p>

//           {/* Notify Slack Button */}
//           <button
//             onClick={handleSlackNotification}
//             className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//           >
//             Notify on Slack
//           </button>

//           {/* Slack Notification Status */}
//           {notifyStatus && <p className="mt-2 text-gray-600">{notifyStatus}</p>}
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const [errorMessage, setErrorMessage] = useState("");
  const [solution, setSolution] = useState("");
  const [notifyStatus, setNotifyStatus] = useState("");

  // Function to fetch issue solution from backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/search_issue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: errorMessage }),
    });
    const data = await response.json();
    setSolution(data.output || "No solution found.");
  };

  // Function to send Slack notification
  const handleNotify = async () => {
    const response = await fetch("http://127.0.0.1:5000/notify_slack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: errorMessage }),
    });
    const data = await response.json();
    setNotifyStatus(data.status || "Failed to send notification.");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary">⚡ Issue Resolution Dashboard</h1>

      {/* Form to submit issue */}
      <form className="mt-4 p-4 border rounded shadow bg-light" onSubmit={handleSubmit}>
        <label className="form-label">🔍 Enter Error Message:</label>
        <textarea
          className="form-control"
          rows="3"
          value={errorMessage}
          onChange={(e) => setErrorMessage(e.target.value)}
          placeholder="Paste error here..."
          required
        ></textarea>

        {/* Get Solution Button */}
        <button className="btn btn-primary w-100 mt-3" type="submit">🔎 Get Solution</button>
      </form>

      {/* Display Solution */}
      {solution && (
        <div className="alert alert-info mt-4">
          <h5>✅ Possible Solution:</h5>
          <p>{solution}</p>
        </div>
      )}

      {/* Notify Slack Button */}
      {solution && (
        <button className="btn btn-danger w-100 mt-3" onClick={handleNotify}>🚨 Notify on Slack</button>
      )}

      {/* Slack Notification Status */}
      {notifyStatus && (
        <div className="alert alert-success mt-3">
          <h5>📢 Notification Status:</h5>
          <p>{notifyStatus}</p>
        </div>
      )}
    </div>
  );
}
