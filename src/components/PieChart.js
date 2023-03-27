import React, { useContext, useLayoutEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import { CryptoContext } from "../context/CryptoContext";

function CustomTooltip({ payload, label, active }) {
  const { currency } = useContext(CryptoContext);
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="label text-sm text-cyan">{`${label} : ${new Intl.NumberFormat(
          "en-IN",
          {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 3,
          }
        ).format(payload[0].value)}
            }`}</p>
      </div>
    );
  }

  return null;
}

const ChartComponent = ({ data, currency, type }) => {
  return (
    <ResponsiveContainer height={"90%"}>
      <PieChart width={730} height={250}>
        <Pie
          data={data}
          dataKey={type}
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
          label
        />
      </PieChart>
      {/* <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#14ffec"
          strokeWidth={"2px"}
        />

        <XAxis dataKey="date" hide />
        <YAxis dataKey={type} hide domain={["auto", "auto"]} />
        <CartesianGrid stroke="#323232" />

        <Tooltip
          content={<CustomTooltip />}
          currency={currency}
          cursor={false}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend />
      </LineChart> */}
    </ResponsiveContainer>
  );
};

const ChartOfPie = ({ id }) => {
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

        console.log("converted", convertedData);
        setchartData(convertedData);

        console.log("data frnnnnnnnnnnnnnnnnnnnnnnnom ", data);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    getChartdata(id);
  }, [id, type, days]);

  return (
    <div className="w-full h-[60%]">
      <ChartComponent data={chartData} currency={currency} type={type} />
      <div className="flex">
        <button
          className={`text-sm py-0.5 px-1.5 ml-2  bg-opacity-25 rounded capitalize ${
            type === "prices"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          } `}
          onClick={() => settype("prices")}
        >
          prices
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
        {/* <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize  ${
            days === 14 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setdays(14)}
        >
          14 days
        </button> */}
      </div>
    </div>
  );
};

export default ChartOfPie;
