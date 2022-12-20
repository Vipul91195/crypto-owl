import classNames from 'classnames';
import React, { useState } from 'react';
import { useTable, useFilters } from 'react-table'
import PopOver from '../PopOver';
import ReactPaginate from 'react-paginate';
import { Arrow } from '../icons';

const CommonTable = ({
  columns,
  data,
  cellDefaultStyle,
  tableClasses,
  containerClasses,
  HeaderClasses,
  BodyClasses,
  cellClasses,
  headerClasses,
  HeadingClasses,
  filteredColumns,
  ...props
}) => {
  const [currentPageLocal, setCurrentPageLocal] = useState(1);
  const [totalPages, setTotalPages] = useState(20);
    
  const handlePageClick = () => {}
  const nextPage = () => {}
  const previousPage = () => {}

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useFilters
  )

  return (
    <div>
      <div className={containerClasses}>
        <table {...getTableProps()} className={tableClasses}>
          <thead className={HeaderClasses}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((header) => (
                  <th
                    {...header.getHeaderProps()}
                    className={classNames("", HeadingClasses)}
                    style={headerClasses[header.id]}
                  >
                    {filteredColumns.includes(header.id) ? (
                      <>
                        <PopOver
                          LabelIconClassName="text-[#DD69AA] pl-1 pt-1"
                          LabelClassName="text-[20px] font-[500] leading-[24px] -tracking-[0.02em] text-[#DD69AA]"
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
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className={cellDefaultStyle}
                      style={cellClasses[cell.column.id]}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center h-max items-center gap-12">
        <ReactPaginate
          breakLabel=".........."
          nextLabel={
            <button
              className="disabled:opacity-60"
              onClick={() => nextPage()}
              // disabled={!canNextPage}
            >
              <div className="bg-[#DD69AA] md:py-[14px] group rounded-[3px] px-4 py-1 hover:bg-pink-500">
                <Arrow className="text-white group-hover:text-black rotate-180" />
              </div>
            </button>
          }
          forcePage={currentPageLocal - 1}
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={totalPages}
          previousLabel={
            <button
              className="disabled:opacity-60"
              onClick={() => previousPage()}
              // disabled={!canPreviousPage}
            >
              <div className="bg-[#DD69AA] md:py-[14px] group rounded-[3px] px-4 py-1 hover:bg-pink-500">
                <Arrow className="text-white group-hover:text-black" />
              </div>
            </button>
          }
          renderOnZeroPageCount={1}
          nextLinkClassName="leading-none flex"
          previousLinkClassName="leading-none flex"
          containerClassName={"flex py-8 justify-center items-center gap-x-3 leading-none"}
          pageClassName="cursor-pointer md:border md:border-solid md:border-white md:rounded-[10px] md:min-w-[40px] md:flex md:justify-center md:items-center "
          pageLinkClassName="font-normal md:px-2 md:py-1 h-full w-full text-center text-[14px] md:text-lg leading-[18.87px] text-[#979998] -tracking-tight after:content-[','] after:ml-1 after:text-[#979998] md:after:content-none "
          breakClassName="text-[#979998] tracking-[5px]"
          activeLinkClassName="text-[#FFFFFF]"
          activeClassName="md:bg-[#DD69AA]"
        />
      </div>
    </div>
  );
};

export default CommonTable;