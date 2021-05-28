import clsx from "clsx";

const Switch = (props) => {
  const { checked, onChange } = props;
  return (
    <div
      className="inline-block relative cursor-pointer bg-transparent select-none border-0 p-0"
      onClick={onChange}
    >
      <div className="w-14 h-6 p-0 rounded-3xl bg-gray-600 transition">
        <div className="absolute w-3.5 h-2.5 top-0 bottom-0 my-auto left-2">
          <span className="flex items-center justify-center w-2.5 h-2.5">
            🌜
          </span>
        </div>
        <div className="absolute w-3.5 h-2.5 top-0 bottom-0 my-auto right-1">
          <span className="flex items-center justify-center w-2.5 h-2.5">
            🌞
          </span>
        </div>
        <div
          className={clsx(
            "absolute w-6 h-6 rounded-full bg-white border border-green-500",
            {
              "left-8": checked,
            }
          )}
        ></div>
      </div>
    </div>
  );
};

export default Switch;
