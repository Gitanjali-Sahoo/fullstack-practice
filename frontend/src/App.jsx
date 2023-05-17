import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8800/persons")
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        // Handle errors
      });
  }, []);

  // Post Data
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Address: "",
    City: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8800/persons/submit-form", formData)
      .then(() => {
        // Handle success
        setSuccess(true);
      })
      .catch(() => {
        // Handle errors
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          FirstName:
          <input type="text" name="FirstName" onChange={handleChange} />
        </label>
        <br />
        <label>
          LastName:
          <input type="text" name="LastName" onChange={handleChange} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="Address" onChange={handleChange} />
        </label>
        <br />
        <label>
          City:
          <input type="text" name="City" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
        <div>{success && <p>Form is submitted</p>}</div>
      </form>

      {data.map((item) => (
        <div key={item.id}>
          <p>
            {item.firstname} {item.lastname}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
