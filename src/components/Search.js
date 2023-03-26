import React, { useContext } from "react";
import SearchIcon from "../assets/search-icon.svg";
import { useState } from "react";
import { CryptoContext } from "../context/CryptoContext";
import debounce from "lodash.debounce";

const SearchInput = ({ handleSearch }) => {
  const [searchText, setsearchText] = useState("");
  let { searchData, setcoinSearch, setsearchData } = useContext(CryptoContext);
  let handleInput = (e) => {
    e.preventDefault();
    let query = e.target.value;
    setsearchText(query);
    handleSearch(query);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  const selectCoin = (coin) => {
    setcoinSearch(coin);
    setsearchText("");
    setsearchData();
  };
  return (
    <>
      <form
        className="w-96 relative flex items-center ml-7 font-nunito"
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleInput}
          value={searchText}
          type="text"
          name="search"
          placeholder="Search..."
          className="w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan"
        />
        <button type="submit" className="absolute right-1 cursor-pointer">
          <img src={SearchIcon} alt="Searchbutton" className="w-full h-auto" />
        </button>
      </form>
      {searchText.length > 0 ? (
        <ul className="absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thum-gray-100 scrollbar-track-gray-200">
          {searchData ? (
            searchData.map((coin) => {
              return (
                <li
                  className="flex items-center ml-4 my-2 cursor-pointer"
                  key={coin.id}
                  onClick={() => {
                    selectCoin(coin.id);
                  }}
                >
                  <img
                    src={coin.thumb}
                    alt={coin.name}
                    className="w-[1rem] h-[1rem] mx-1.5"
                  />
                  <span>{coin.name}</span>
                </li>
              );
            })
          ) : (
            <div className="w-full h-full flex justify-center items-center ">
              <div className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin" />
              <span className="ml-2">Searching</span>
            </div>
          )}
        </ul>
      ) : null}
    </>
  );
};

const Search = () => {
  let { getSearchResult } = useContext(CryptoContext);
  const deboundeFunc = debounce(function (val) {
    getSearchResult(val);
  }, 2000);

  return (
    <div className="relative">
      <SearchInput handleSearch={deboundeFunc} />
    </div>
  );
};

export default Search;
