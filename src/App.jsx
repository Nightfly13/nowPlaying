import { useState, useEffect } from "react";
import axios from "axios";
import { Buffer } from "buffer";

const client_id = import.meta.env.VITE_CLIENT_ID;
const client_secret = import.meta.env.VITE_CLIENT_SECRET;
let token = "";

const getBearerToken = () => {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: new URLSearchParams({
      grant_type: "client_credentials",
    }).toString(),
  };

  axios
    .post(authOptions.url, authOptions.data, { headers: authOptions.headers })
    .then((response) => {
      if (response.status === 200) {
        token = response.data.access_token;
        console.log(`inside token bearer ${token}`);
        //getPlaybackState(token);
      }
    })
    .catch((error) => {
      console.error("Error fetching token:", error);
    });

  return token;
};

const getPlaybackState = ({ token }) => {
  console.log(`inside playback state ${token}`);
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api.spotify.com/v1/me/player",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .request(config)
    .then((response) => {
      setData(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

function App() {
  const [token, setToken] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    console.log("effect");
    getBearerToken();
  }, []);

  /* return (
    <>
      <div>
        <img src={data.item.album.images[0].url} alt="Image" />
      </div>
      <p>Song: {data.item.name}</p>
      <p>Artist: {data.item.album.artists[0].name}</p>
      <p>Album: {data.item.album.name}</p>
    </>
  ); */

  return (
    <>
      <div>;-;</div>
    </>
  );
}

export default App;
