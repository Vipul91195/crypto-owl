import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useTable, useFilters } from 'react-table'
import PopOver from '../PopOver';
import ReactPaginate from 'react-paginate';
import { Arrow, ArrowDown } from '../icons';
import { useDispatch, useSelector } from 'react-redux';
import { setColumnSort, setSelectedIds } from '../../Redux/commonSlice';
import { getBusinesses } from '../../Redux/businessSlice';
import { Oval } from 'react-loader-spinner';

const CommonTable = ({
  columns,
  data,
  initialState,
  cellDefaultStyle,
  tableClasses,
  containerClasses,
  HeaderClasses,
  BodyClasses,
  cellClasses,
  headerClasses,
  HeadingClasses,
  heightLightRow,
  cellTextClassName,
  heighLightCellPrefix,
  showSelectCheck = false,
  heighLightCellPostfix,
  handleRowSelect,
  selectionColumn,
  filteredColumns,
  isLoading,
  ...props
}) => {

  const dispatch = useDispatch();

  const [allSelected, setAllSelected] = useState(false);
  const [allCheckSelected, setAllCheckSelected] = useState(false);

  const { selectedIds, modal, sortColumns } = useSelector(state => ({
    selectedIds : state.commonSlice.tableData.selectedIds,
    modal : state.commonSlice.modal,
    sortColumns : state.commonSlice.tableData.sortColumns,
  }));
  // setColumnSort

  const [tableColumns, setTableColumns] = useState([{
    Headers: "Header",
    accessor: "noData"
  }]);
  const [tableData, setTableData] = useState([{
    noData: "No Date"
  }]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns : tableColumns,
      data: tableData,
      initialState: initialState || {}
    },
    useFilters
  );

  const makeForceCenter = (row_id) => {
    const target_ids = ["fromTo", "emailId", "date", "serial_no"];
    return target_ids.includes(row_id) ? "absolute top-0 -translate-y-1/2" : "";
  }

  const checkHighlight = (rowValues) => {
    return heightLightRow && Object.values(heightLightRow).includes(String(rowValues[Object.keys(heightLightRow)[0]]));
  }

  const handleSortingChange = (id) => {
    dispatch(setColumnSort({...sortColumns, [id] : Object.keys(sortColumns || {}).includes(id) ? sortColumns[id] === 'ascending' ? 'descending' : 'ascending' : 'ascending' }));
    console.log("sorting .....");
  }

  useEffect(() => {
    data && setTableData(data);
    columns && setTableColumns(columns);
  }, [data, columns]);

  useEffect(() => {
    data && dispatch(setSelectedIds(Object.fromEntries(data.map((d) => [d[selectionColumn] , allSelected]))));
  }, [allSelected]);

  useEffect(() => {
    !selectedIds && setAllSelected(false);
    showSelectCheck && selectedIds && handleRowSelect(Object.keys(selectedIds).filter(selectedId => selectedIds[selectedId]))
  }, [selectedIds]);

  if (showSelectCheck && !selectionColumn) {
    return <p className='text-white text-xl text-center' >'selectionColumn' is required if 'showSelectCheck' is enabled </p>
  }

  return (
    <div>
      <div
        className={classNames(containerClasses, "max-w-[100vw] rounded-[20px]")}
      >
        <table {...getTableProps()} className={tableClasses + " min-h-[130px]"}>
          <thead className={HeaderClasses}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {showSelectCheck && (
                  <th className='2xl:pr-[10px] 4xl:pr-0'>
                    <div className="pl-[10px] md:pl-[23px] w-max h-[22px] 2xl:h-[20px]">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        className="bg-checkFalse cursor-pointer md:mt-[6px] 2xl:mt-[3px] bg-no-repeat bg-contain checked:bg-checkTrue appearance-none pl-[23px] h-[14px] w-[14px] 2xl:h-[18px] 2xl:w-[18px]"
                        onChange={(e) =>
                          setAllSelected(!allSelected && !allCheckSelected)
                        }
                      />
                    </div>
                  </th>
                )}
                {headerGroup.headers.map((header) => (
                  <th
                    {...header.getHeaderProps()}
                    className={classNames("relative", HeadingClasses)}
                    style={
                      Object.keys(headerClasses || {}).includes(header.id)
                        ? headerClasses[header.id]
                        : {}
                    }
                    onClick={header.sortable ? () => handleSortingChange(header.id) : null}
                  >
                    {filteredColumns.includes(header.id) ? (
                      <>
                        <PopOver
                          LabelIconClassName="text-[#DD69AA] pl-1 pt-[2px]"
                          LabelClassName="text-[16px] 2xl:text-[20px] font-[500] leading-[24px] -tracking-[0.02em] text-[#DD69AA]"
                          label={header.render("Header")}
                        >
                          <>
                            {header.canFilter ? header.render("Filter") : null}
                          </>
                        </PopOver>
                      </>
                    ) : (
                      // <span className={makeForceCenter(header.id)} >{
                        header.sortable ?
                          <span className="flex gap-1 cursor-pointer items-center">
                            {header.render("Header")}
                            <ArrowDown className={classNames("text-[#DD69AA]", {"rotate-180": Object.keys(sortColumns || {}).includes(header.id) ? sortColumns[header?.id] === 'ascending' : false })} />
                          </span>
                        :
                        header.render("Header")
                        // }</span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className={BodyClasses}>
            {!isLoading && rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={classNames(
                    {
                      "bg-[#20191D]": checkHighlight(row.values),
                    },
                    "group"
                  )}
                >
                  {showSelectCheck && (
                    <td className='pt-3 group-last:pb-4 2xl:group-last:pb-1'>
                      <div className="pl-[10px] md:pl-[23px] w-max h-[14px] 2xl:h-[25px]">
                        <input
                          type="checkbox"
                          checked={selectedIds[row.values[selectionColumn]]}
                          className={classNames(
                            "bg-checkFalse cursor-pointer bg-no-repeat bg-contain checked:bg-checkTrue appearance-none h-[14px] w-[14px] 2xl:h-[18px] 2xl:w-[18px] group-last:mb-5 2xl:group-last:mb-0"
                          )}
                          onChange={(e) => {
                            dispatch(
                              setSelectedIds({
                                ...selectedIds,
                                [row.values[selectionColumn]]:
                                  !selectedIds[row.values[selectionColumn]],
                              })
                            );
                            allSelected &&
                              selectedIds[row.values[selectionColumn]] &&
                              setAllCheckSelected(false);
                          }}
                        />
                      </div>
                    </td>
                  )}
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className={classNames(
                        cellDefaultStyle,
                        "group-last:pb-5"
                      )}
                      style={
                        Object.keys(cellClasses || {}).includes(cell.column.id)
                          ? cellClasses[cell.column.id]
                          : {}
                      }
                    >
                      <span
                        className={classNames(
                          "flex items-center w-full justify-center"
                        )}
                        style={
                          Object.keys(cellTextClassName || {}).includes(
                            cell.column.id
                          )
                            ? cellTextClassName[cell.column.id]
                            : {}
                        }
                      >
                        {heighLightCellPrefix && checkHighlight(row.values) && (
                          <span className="text-[#979998] ml-1">
                            {heighLightCellPrefix[cell.column.id]}
                          </span>
                        )}
                        <span className="text-center block w-max">
                        {/* {cell.column.id === "awardPersonalPoints" && cell.value !== '-' && "- "}
                        {cell.column.id === "awardBusinessPoints" && cell.value !== '-' && "+ "} */}
                          {cell.render("Cell")}
                        </span>
                        {heighLightCellPostfix &&
                          checkHighlight(row.values) && (
                            <span className="text-[#979998] ml-1">
                              {heighLightCellPostfix[cell.column.id]}
                            </span>
                          )}
                      </span>
                    </td>
                  ))}
                </tr>
              );

            })} 
            
          </tbody>
        </table>
        {rows.length === 0 &&
          <div>
            <p className="text-white text-center pb-5 text-xl">No Record Found</p>
          </div>
        }
        {isLoading && 
          <div className='w-full py-10 flex justify-center'>
          <Oval
                  color="#FFFFFF"
                  height={30}
                  width={30}
                  secondaryColor="#FAFAFA"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
          </div> 
        }
      </div>
    </div>
  );
};

export default CommonTable;