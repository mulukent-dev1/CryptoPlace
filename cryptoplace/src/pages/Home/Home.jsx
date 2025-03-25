import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { CoinContext } from "../../Context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin = [], currency = { symbol: "$" } } = useContext(CoinContext); // Default values
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (Array.isArray(allCoin)) {
      setDisplayCoin(allCoin);
    } else {
      setDisplayCoin([]);
      console.error("Error: allCoin is not an array", allCoin);
    }
  }, [allCoin]);

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = (event) => {
    event.preventDefault();
    if (!Array.isArray(allCoin)) return;

    const coins = allCoin.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setDisplayCoin(coins);
  };

  return (
    <div className="home">
      <Navbar />

      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>

        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            list="coinlist"
            value={input}
            type="text"
            placeholder="Search crypto..."
            required
          />

          <datalist id="coinlist">
            {(allCoin || []).map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {(displayCoin || []).slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank || "N/A"}</p>
            <div>
              <img src={item.image} alt={item.name} />
              <p>{`${item.name || "Unknown"} - ${item.symbol || "N/A"}`}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price?.toLocaleString() || "N/A"}
            </p>
            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
              {item.price_change_percentage_24h
                ? Math.floor(item.price_change_percentage_24h * 100) / 100
                : "N/A"}
            </p>
            <p className="market-cap">
              {currency.symbol}
              {item.market_cap?.toLocaleString() || "N/A"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
