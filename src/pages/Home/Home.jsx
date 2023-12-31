import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.scss";
import { useStateValue } from "../../StateProvider";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [{ isUserBlocked },dispatch] = useStateValue();

  useEffect(() => {
    // get google sheet data
    const fetchData = async () => {
      dispatch({ type: "SET_LOADING", status: true });
      try {
        const spreadsheetId = "1I9lOMzVUdkuXUyLCNYFQtQfYAzOloQPHWB8NIkFdV64";
        const apiKey = process.env.REACT_APP_GSHEET_API_KEY;

        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1?key=${apiKey}`
        );

        const values = response.data.values || [];
        const headers = values[0];
        const jsonDataArray = values.slice(1).map((row) => {
          return headers.reduce((obj, header, index) => {
            obj[header] = row[index];
            return obj;
          }, {});
        });
        setData(jsonDataArray);
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
      }finally{
        dispatch({ type: "SET_LOADING", status: false });
      }
    };

    fetchData();
  }, []);

  const doLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <div className="home-container">
      <button className="primary-btn" onClick={doLogout}>
        Logout
      </button>
      {isUserBlocked && (
        <h4 className="error">Your account is blocked by the admin.</h4>
      )}
      <div className="products-container">
        <h2>Products</h2>
        <div className="cards-container">
          {data.map((item) => (
            <div className="product-item" key={item?.id}>
              <span>{item?.id}</span>
              <h3>{item?.name}</h3>
              <span>Quantity: {item?.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
