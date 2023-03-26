//create context object

import { createContext, useLayoutEffect, useState } from "react";

export const CryptoContext = createContext({});

//creatr the provider component

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [searchData, setsearchData] = useState();
  const [coinSearch, setcoinSearch] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setpage] = useState(1);
  const [coinLength, setCoinLength] = useState();
  const [perPage, setperPage] = useState("10");
  const [coinData, setcoinData] = useState();

  const getCoinList = async () => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/list
        `)
        .then((res) => res.json())
        .then((json) => json);

      setCoinLength(data.length);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const getCryptoData = async () => {
    setcoinData();
    try {
      const data =
        await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d
`)
          .then((res) => res.json())
          .then((json) => json);

      console.log(data);
      setCryptoData(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const clearSearch = () => {
    setpage(10);
    setcoinSearch("");
  };

  const getCoinData = async (coinId) => {
    setcoinData();
    try {
      const data =
        await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false
        `)
          .then((res) => res.json())
          .then((json) => json);

      setcoinData(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const getSearchResult = async (query) => {
    try {
      const data =
        await fetch(`https://api.coingecko.com/api/v3/search?query=${query}
`)
          .then((res) => res.json())
          .then((json) => json);

      console.log(data.coins);
      setsearchData(data.coins);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useLayoutEffect(() => {
    getCryptoData();
    getCoinList();
  }, [coinSearch, currency, sortBy, page, perPage]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        getSearchResult,
        setcoinSearch,
        setsearchData,
        setCurrency,
        currency,
        sortBy,
        setSortBy,
        page,
        setpage,
        coinLength,
        clearSearch,
        setperPage,
        perPage,
        getCoinData,
        coinData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
