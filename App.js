import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        setCoins(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} />
        </form>
      </div>
      {filteredCoins.map(coin => (
        <div key={coin.id}>
          <h1>{coin.name} ({coin.symbol.toUpperCase()})</h1>
          <p>${coin.current_price}</p>
          <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default App;