import { useState } from "react";
import "./App.css";

function App() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const names = [
    "Mark",
    "Jacob",
    "Jan",
    "Juan",
    "Tom",
    "Robert",
    "Jake",
    "Michael",
    "Greg",
    "Elon",
    "Frank",
  ];
  const [userID, setUserId] = useState("");

  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("I was clicked!");

    const weight = getRandomInt(80, 90);
    const pulse = getRandomInt(50, 120);
    const bloodPressure = getRandomInt(90, 160);
    const nameVal = getRandomInt(0, 10);
    const name = names[nameVal];

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userID,
        name: name,
        weight: weight,
        bloodPressure: bloodPressure,
        pulse: pulse,
      }),
    };
    setUserId("");
    const response = await fetch("http://192.168.1.156:2000/send-data", requestOptions);

    console.log(response);
    console.log("Operation is done!");
  };

  return (
    <div className="App">
      <h1>Welcome to the website</h1>

      <p>Provide your user ID and click the button to submit your data!</p>
      <input type="text" value={userID} onChange={handleChange} placeholder="User ID..." />
      <button onClick={handleSubmit}>Click me!</button>
    </div>
  );
}

export default App;
