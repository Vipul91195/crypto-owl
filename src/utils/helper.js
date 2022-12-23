import Cookies from 'js-cookie';
import React from 'react';

export const getAccessToken = () => {
  return Cookies.get("crypt-access");
}

export const setAccessToken = (token) => {
  return Cookies.set("crypt-access", token);
}

export const removeAccessToken = (token) => {
  return Cookies.remove("crypt-access");
}

export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  console.log(preFilteredRows, " test");
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(typeof row.values[id] === 'string' ? row.values[id] : row.values[id].props.children);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);
  console.log(options, " test");
  return (
    <div className="bg-[#303030] px-[18px] py-[8px] md:px-[20px] md:py-[17px] rounded-[10px] text-white min-w-[180px] focus-visible:outline-none md:min-w-[240px]">
      <p
        className="border-b w-full hover:bg-[#DD69AA] cursor-pointer border-solid py-2 md:pb-3 text-left border-[#545557] tex-sm md:text-[20px]"
        onClick={() => {
          // api call ...
        }}
      >
        All
      </p>
      {options.map((option, i) => (
        <p
          key={i}
          onClick={(e) => {
            // api call ...
          }}
          className="text-left py-2 hover:bg-[#DD69AA] cursor-pointer w-full last:border-none border-b border-solid md:pb-3 tex-sm md:text-[20px] border-[#545557]"
        >
          {option}
        </p>
      ))}
    </div>
  );
}

// function SelectColumnFilter({
//   column: { filterValue, setFilter, preFilteredRows, id },
// }) {
//   const options = React.useMemo(() => {
//     const options = new Set();
//     preFilteredRows.forEach((row) => {
//       options.add(typeof row.values[id] === 'string' ? row.values[id] : row.values[id].props.children);
//     });
//     return [...options.values()];
//   }, [id, preFilteredRows]);
//   return (
//     <div className="bg-[#303030] px-[20px] py-[25px] rounded-[10px] text-white min-w-[240px]">
//       <p
//         className="border-b w-full cursor-pointer border-solid pb-3 text-left border-[#545557] text-[20px]"
//         onClick={() => {
//           // api ....
//         }}
//       >
//         All
//       </p>
//       {options.map((option, i) => (
//         <p
//           key={i}
//           onClick={(e) => {
//             console.log("id :", option);
//             // api ....
//           }}
//           className="text-left py-3 cursor-pointer w-full last:pb-0 last:border-none border-b border-solid pb-3 text-[20px] border-[#545557]"
//         >
//           {option}
//         </p>
//       ))}
//     </div>
//   );
// }