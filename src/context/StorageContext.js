import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { CryptoContext } from "./CryptoContext";

export const StorageContext = createContext({});

export const StorageProvider = ({ children }) => {
  const [allCoins, setallCoins] = useState([]);
  const [savedData, setsavedData] = useState([]);
  let { currency, sortBy } = useContext(CryptoContext);

  const saveCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));
    if (oldCoins.includes(coinId)) {
      return null;
    } else {
      let newCoin = [...oldCoins, coinId];
      setallCoins(newCoin);
      localStorage.setItem("coins", JSON.stringify(newCoin));
    }
  };
  const getSavedData = async (totalCoins = allCoins) => {
    try {
      const data =
        await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
          ","
        )}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d
`)
          .then((res) => res.json())
          .then((json) => json);

      console.log(data);
      setsavedData(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const RemoveCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));
    let newCoin = oldCoins.filter((coin) => coin !== coinId);
    setallCoins(newCoin);
    localStorage.setItem("coins", JSON.stringify(newCoin));
  };
  //   const getTrendingCoins = async () => {
  //     try {
  //       const data = await fetch(`https://api.coingecko.com/api/v3/search/trending
  //       `)
  //         .then((res) => res.json())
  //         .then((json) => json);

  //       console.log(data.coins);
  //       settrendingCoins(data.coins);
  //     } catch (error) {
  //       console.log("error: ", error);
  //     }
  //   };
  //   const clearSearch = () => {
  //     getTrendingCoins();
  //   };
  const resetSavedResult = () => {
    getSavedData();
  };
  useEffect(() => {
    if (allCoins.length > 0) {
      getSavedData(allCoins);
    } else {
      setsavedData();
    }
  }, [allCoins]);

  useLayoutEffect(() => {
    let isThere = JSON.parse(localStorage.getItem("coins")) || false;
    if (!isThere) {
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      let totalCoins = JSON.parse(localStorage.getItem("coins"));
      setallCoins(totalCoins);
      if (totalCoins.length > 0) {
        getSavedData(totalCoins);
      }
    }
  }, []);

  return (
    <StorageContext.Provider
      value={{ saveCoin, allCoins, RemoveCoin, savedData, resetSavedResult }}
    >
      {children}
    </StorageContext.Provider>
  );
};
