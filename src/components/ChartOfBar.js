import React, { useContext, useLayoutEffect, useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { CryptoContext } from "../context/CryptoContext";

// function CustomTooltip({ payload, label, active }) {
//   const { currency } = useContext(CryptoContext);
//   if (active && payload && payload.length > 0) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label text-sm text-white">{`${label} : ${new Intl.NumberFormat(
//           "en-IN",
//           {
//             style: "currency",
//             currency: currency,
//             minimumFractionDigits: 3,
//           }
//         ).format(payload[0].value)}
//             }`}</p>
//       </div>
//     );
//   }

//   return null;
// }

const ChartComponent = ({ data, currency, type }) => {
  const colors = [
    "#70B0FA",
    "#3D6BD4",
    "#3D36B2",
    "#7DEBD9",
    "#00A7BD",
    "#017991",
    "#C996BF",
    "#850A4D",
    "#600336",
  ];
  return (
    <ResponsiveContainer height={"90%"} width={"90%"}>
      <BarChart width={730} height={250} data={data} barCategoryGap="15%">
        <CartesianGrid strokeDasharray="3" />

        <XAxis dataKey="date" />
        <YAxis />
        {/* <YAxis dataKey={type} hide domain={["auto", "auto"]} /> */}
        {/* <CartesianGrid stroke="#323232" /> */}

        <Tooltip />
        <Legend iconType="circle" />
        <Bar dataKey={type} fill="cyan" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const ChartOfBar = ({ id }) => {
  const [type, settype] = useState("prices");
  const [days, setdays] = useState(7);
  const [chartData, setchartData] = useState();
  const { currency } = useContext(CryptoContext);
  useLayoutEffect(() => {
    const getChartdata = async (id) => {
      try {
        const data =
          await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=daily
        `)
            .then((res) => res.json())
            .then((json) => json);
        let convertedData = data[type].map((item) => {
          return {
            date: new Date(item[0]).toLocaleDateString(),
            [type]: item[1],
          };
        });
        setchartData(convertedData);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    getChartdata(id);
  }, [id, type, days]);

  return (
    <div className="w-full h-[60%]">
      <ChartComponent
        data={chartData}
        currency={currency}
        type={type}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      />
      <div className="flex">
        <button
          className={`text-sm py-0.5 px-1.5 ml-2  bg-opacity-25 rounded capitalize ${
            type === "prices"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          } `}
          onClick={() => settype("prices")}
        >
          price
        </button>
        {/* <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "market_caps"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          } `}
          onClick={() => settype("market_caps")}
        >
          MarketCap
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2  bg-opacity-25 rounded capitalize ${
            type === "total_volumes"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => settype("total_volumes")}
        >
          Total Volumes
        </button> */}
        <button
          className={`text-sm py-0.5 px-1.5 ml-2  bg-opacity-25 rounded capitalize ${
            days === 7 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setdays(7)}
        >
          7 days
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize  ${
            days === 14 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          } `}
          onClick={() => setdays(14)}
        >
          14 days
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize  ${
            days === 30 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setdays(30)}
        >
          30 days
        </button>
      </div>
    </div>
  );
};

export default ChartOfBar;
