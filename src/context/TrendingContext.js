import { createContext, useLayoutEffect, useState } from "react";
export const TrendingContext = createContext({});

export const TrendingProvider = ({ children }) => {
  const [trendingCoins, settrendingCoins] = useState();

  const getTrendingCoins = async () => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/search/trending
      `)
        .then((res) => res.json())
        .then((json) => json);

      console.log(data.coins);
      settrendingCoins(data.coins);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const clearSearch = () => {
    getTrendingCoins();
  };

  useLayoutEffect(() => {
    getTrendingCoins();
  }, []);

  return (
    <TrendingContext.Provider
      value={{ trendingCoins, settrendingCoins, getTrendingCoins, clearSearch }}
    >
      {children}
    </TrendingContext.Provider>
  );
};
