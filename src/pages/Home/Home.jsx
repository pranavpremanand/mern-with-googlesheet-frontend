import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.scss";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const spreadsheetId = "1I9lOMzVUdkuXUyLCNYFQtQfYAzOloQPHWB8NIkFdV64";
        const apiKey = import.meta.env.VITE_GSHEET_API_KEY;

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
      }
    };

    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="home-container">
      <h2>Products</h2>
      <div className="products-container">
        {data.map((item) => (
          <div className="product-item">
            <span>{item?.id}</span>
            <h3>{item?.name}</h3>
            <span>Quantity: {item?.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
