import React from "react";
import "./App.css";
import axios from "axios";
import useSWR from "swr";

const apiUrl = "https://62ee1470a785760e67738881.mockapi.io/name1";
const fetcher = (url) => axios.get(url).then((res) => res.data);

function App() {
  const xml = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl);
    xhr.responseType = "json";
    xhr.send();
    xhr.onload = function () {
      if (xhr.status !== 200) {
        console.log(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        console.log("XMLHttpRequest", xhr.response);
      }
    };
  };

  const fetchapi = () => {
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Fetch API", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ax = () => {
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("axios", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [shouldFetch, setShouldFetch] = React.useState(false);

  function swr() {
    setShouldFetch(true);
  }

  const { data, error } = useSWR(shouldFetch ? apiUrl : null, fetcher);
  if (error) {
    console.log("failed to load", error);
  }
  if (data) {
    console.log("useSWR", data);
  }

  return (
    <div>
      <h2>Data Fetch</h2>
      <button onClick={() => xml()}>XML</button>
      <button onClick={() => fetchapi()}>FetchAPI</button>
      <button onClick={() => ax()}>Axios</button>
      <button onClick={swr}>useSWR</button>
    </div>
  );
}

export default App;
