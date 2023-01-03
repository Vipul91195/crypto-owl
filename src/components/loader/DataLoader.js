import classNames from 'classnames';
import React from 'react';

const DataLoader = ({ lines = 1, width = "100%", lineClassName, containerClassName }) => {
  return (
    <div className={classNames("flex w-full", containerClassName || "flex-col gap-[10px]")}>
      {lines &&
        lines > 0 &&
        [...Array(lines)].map((line) => (
          <div
            key={line}
            className={
              classNames("w-full rounded-[5px] animate-pulse",
              lineClassName || "bg-gray-500 h-[20px]")
            }
          ></div>
        ))}
    </div>
  );
}

export default DataLoader