import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useTable, useFilters } from 'react-table'
import PopOver from '../PopOver';
import ReactPaginate from 'react-paginate';
import { Arrow } from '../icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedIds } from '../../Redux/commonSlice';
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

  // const [currentPageLocal, setCurrentPageLocal] = useState(1);
  // const [totalPages, setTotalPages] = useState(20);
  // const [selectedIds, setSelectedIds] = useState({});
  const [allSelected, setAllSelected] = useState(false);
  const [allCheckSelected, setAllCheckSelected] = useState(false);

  const { selectedIds, modal } = useSelector(state => ({
    selectedIds : state.commonSlice.tableData.selectedIds,
    modal : state.commonSlice.modal
  }));

  // const handlePaginationChange = () => {
  // }

  // const handlePageClick = (page) => {
    // console.log(page+1)
    // dispatch(getBusinesses({ page: page + 1 }))
    // 
  // }
  // const nextPage = () => {}
  // const previousPage = () => { }

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

  useEffect(() => {
    data && setTableData(data);
    columns && setTableColumns(columns);
  }, [data, columns]);

  const checkHighlight = (rowValues) => {
    return heightLightRow && Object.values(heightLightRow).includes(String(rowValues[Object.keys(heightLightRow)[0]]));
  }

  useEffect(() => {
    // data && setSelectedIds(Object.fromEntries(data.map((d) => [d[selectionColumn] , allSelected])));
    data && dispatch(setSelectedIds(Object.fromEntries(data.map((d) => [d[selectionColumn] , allSelected]))));
  }, [allSelected]);

  useEffect(() => {
    !selectedIds && setAllSelected(false);
    showSelectCheck && selectedIds && handleRowSelect(Object.keys(selectedIds).filter(selectedId => selectedIds[selectedId]))
  }, [selectedIds]);

  // useEffect(() => {
  //   console.log(currentPageLocal, " : page change");
  //   dispatch(getBusinesses({ page: currentPageLocal, page_size: 1 }))
  // }, [currentPageLocal])

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
                        className="bg-checkFalse md:mt-[6px] 2xl:mt-[3px] bg-no-repeat bg-contain checked:bg-checkTrue appearance-none pl-[23px] h-[14px] w-[14px] 2xl:h-[18px] 2xl:w-[18px]"
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
                    className={classNames("", HeadingClasses)}
                    style={
                      Object.keys(headerClasses || {}).includes(header.id)
                        ? headerClasses[header.id]
                        : {}
                    }
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
                      header.render("Header")
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
                            "bg-checkFalse bg-no-repeat bg-contain checked:bg-checkTrue appearance-none h-[14px] w-[14px] 2xl:h-[18px] 2xl:w-[18px] group-last:mb-5 2xl:group-last:mb-0"
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
      {/* <div className="flex justify-center md:justify-end h-max items-center gap-12">
        <ReactPaginate
          breakLabel=".........."
          nextLabel={
            <button className="disabled:opacity-60" onClick={() => nextPage()}>
              <div className="bg-[#DD69AA] md:py-[9px] px-3 md:h-[30px] py-1 group rounded-[3px] ml-2 md:ml-1 md:rounded-[10px] hover:bg-pink-500">
                <Arrow className="text-white group-hover:text-black rotate-180" />
              </div>
            </button>
          }
          forcePage={currentPageLocal - 1}
          onPageChange={setCurrentPageLocal}
          pageRangeDisplayed={1}
          pageCount={totalPages}
          // marginPagesDisplayed={2}
          previousLabel={
            <button
              className="disabled:opacity-60"
              onClick={() => previousPage()}
            >
              <div className="bg-[#DD69AA] md:py-[9px] px-3 md:h-[30px] py-1 group rounded-[3px] mr-2 md:mr-1 md:rounded-[10px] hover:bg-pink-500">
                <Arrow className="text-white group-hover:text-black" />
              </div>
            </button>
          }
          renderOnZeroPageCount={1}
          nextLinkClassName="leading-none flex"
          previousLinkClassName="leading-none flex"
          containerClassName={
            "flex pt-[17px] pb-[25px] md:py-8 justify-center items-center gap-x-[3px] md:gap-x-1 leading-none"
          }
          pageClassName="cursor-pointer md:rounded-[10px] md:min-w-[30px] md:h-[30px] md:flex md:justify-center md:items-center after:content-[','] last:bg-blue-500 after:ml-1 after:text-[#979998] md:after:content-none"
          pageLinkClassName="font-normal md:px-2 md:py-1 h-full w-full text-center text-[14px] md:text-sm leading-[18.87px] text-[#979998] -tracking-tight"
          breakClassName="text-[#979998] tracking-[2px] md:tracking-[3px] 2xl:tracking-[5px]"
          activeLinkClassName="text-[#FFFFFF]"
          activeClassName="md:bg-[#DD69AA]"
        />
      </div> */}
    </div>
  );
};

export default CommonTable;