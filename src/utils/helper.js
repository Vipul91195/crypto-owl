import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, getRewardTypes, setCurrentPage, setTableFilter } from '../Redux/commonSlice';
import { useLocation } from 'react-router-dom';
import { getBusinesses } from '../Redux/businessSlice';

export const getAccessToken = () => {
  return Cookies.get("crypt-access");
}

export const setAccessToken = (token) => {
  return Cookies.set("crypt-access", token);
}

export const removeAccessToken = (token) => {
  return Cookies.remove("crypt-access");
}

export const capitalize = (value) =>  {
  if(typeof value === 'string' && value.length > 1) {
    return value[0].toUpperCase()+value.slice(1);
  }
  return null;
}

export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(typeof row.values[id] === 'string' ? row.values[id] : row.values[id].props.children);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  const handleOptionSelect = e => {
    dispatch(setCurrentPage(1));
    dispatch(setTableFilter({value:e.target.id, targetTable: location?.pathname}))
  };
  return (
    <div className="bg-[#303030] rounded-[10px] text-white min-w-[180px] focus-visible:outline-none md:min-w-[240px]">
      {/* px-[18px] py-[8px] md:px-[20px] md:py-[17px] */}
      <p
        id=''
        className="border-b w-full hover:bg-[#DD69AA] cursor-pointer border-solid px-[18px] md:px-5 py-2 md:py-[17px] text-left border-[#545557] tex-sm md:text-[20px]"
        onClick={handleOptionSelect}
      >
        All
      </p>
      {options.map((option, i) => (
        <p
          key={i}
          id={options}
          onClick={handleOptionSelect}
          className="text-left px-[18px] md:px-5 py-2 md:py-[17px] hover:bg-[#DD69AA] cursor-pointer w-full last:border-none border-b border-solid tex-sm md:text-[20px] border-[#545557]"
        >
          {option[0].toUpperCase()+option.slice(1)}
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