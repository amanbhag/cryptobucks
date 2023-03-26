import React, { useContext, useRef } from "react";
import PaginationArrow from "../assets/pagination-arrow.svg";
import { CryptoContext } from "../context/CryptoContext";
import SubmitIcon from "../assets/submit-icon.svg";

const PerPage = () => {
  const { setperPage } = useContext(CryptoContext);
  const inputRef = useRef(null);
  let handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;

    if (val !== 0) {
      setperPage(val);
      inputRef.current.val = val;
    }
  };
  return (
    <form
      className="relative flex items-center font-nunito mr-12 "
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="currency"
        className="flex relative justify-center items-center mr-2 font-semibold"
      >
        View Coins per page:
      </label>
      <input
        type="number"
        name="perpage"
        min={1}
        max={250}
        ref={inputRef}
        className="w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan leading-4 "
        placeholder="10"
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <img src={SubmitIcon} alt="Submit" className="w-full h-auto " />
      </button>
    </form>
  );
};

const Pagination = () => {
  let { page, setpage, coinLength, perPage, cryptoData } =
    useContext(CryptoContext);

  const TotalNumber = Math.ceil(coinLength / perPage);

  const next = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setpage(page + 1);
    }
  };
  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setpage(page - 1);
    }
  };
  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setpage(TotalNumber - 1);
    } else {
      setpage(page + 3);
    }
  };
  const multiStepPrev = () => {
    if (page - 3 >= TotalNumber) {
      setpage(TotalNumber + 1);
    } else {
      setpage(page - 2);
    }
  };

  return (
    <div className="flex items-center ">
      <PerPage />
      <ul className="flex items-center justify-end text-sm">
        <li className="flex items-center">
          <button className="outline-0 hover:text-cyan w-8" onClick={prev}>
            <img
              className="w-full h-auto rotate-180"
              src={PaginationArrow}
              alt="left"
              srcset=""
            />
          </button>
        </li>
        {page + 1 === TotalNumber || page === TotalNumber ? (
          <li>
            <button
              className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-sm"
              onClick={multiStepPrev}
            >
              ...
            </button>
          </li>
        ) : null}

        {page - 1 !== 0 ? (
          <li>
            <button
              onClick={prev}
              className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-sm bg-gray-200 mx-1.5"
            >
              {page - 1}
            </button>
          </li>
        ) : null}
        <li>
          <button
            disabled
            className="outline-0  rounded-full w-8 h-8 flex items-center justify-center  bg-cyan text-gray-200 mx-1.5 text-sm"
          >
            {page}
          </button>
        </li>
        {page + 1 !== TotalNumber && page !== TotalNumber ? (
          <li>
            <button
              onClick={next}
              className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center  bg-gray-200 mx-1.5 text-sm"
            >
              {page + 1}
            </button>
          </li>
        ) : null}
        {page + 1 !== TotalNumber && page !== TotalNumber ? (
          <li>
            <button
              className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-sm"
              onClick={multiStepNext}
            >
              ...
            </button>
          </li>
        ) : null}

        {page !== TotalNumber ? (
          <li>
            <button
              onClick={() => {
                setpage(TotalNumber);
              }}
              className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-sm bg-gray-200 mx-1.5"
            >
              {TotalNumber}
            </button>
          </li>
        ) : null}
        <li>
          <button className="outline-0 hover:text-cyan w-8 " onClick={next}>
            <img
              className="w-full h-auto"
              src={PaginationArrow}
              alt="right"
              srcset=""
            />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
