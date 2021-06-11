import { getDay } from "@utils/util";

const Weather = () => {

  return (
    <div className="m-32">
      <div className="text-7xl align-top">
        28<span className="text-3xl align-top">°C</span>
      </div>
      <div className="text-2xl">{getDay()}</div>
    </div>
  );
};

export default Weather;
