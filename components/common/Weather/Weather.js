import { useEffect, useState } from "react";

import { getDay, request } from "@utils/util";

const Weather = () => {
  const [temperature, setTemperature] = useState("");

  useEffect(async () => {
    const data = await request(
      "/api/simpleWeather/query?city=%E4%B8%8A%E6%B5%B7&key=f452564f45875556bbdc49d9217b7952"
    );
    console.log("--1--11-1-1-", data);
    const { error_code, result } = data;
    if (error_code === 0) {
      const {
        realtime: { temperature },
      } = result;
      setTemperature(temperature);
    }
  }, []);

  return (
    <div className="m-32">
      <div className="text-7xl align-top">
        {temperature}
        <span className="text-3xl align-top">°C</span>
      </div>
      <div className="text-2xl">{getDay()}</div>
    </div>
  );
};

export default Weather;
