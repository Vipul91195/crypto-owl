import classNames from 'classnames';
import React from 'react';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import PopOver from '../PopOver';

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

  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <span>
        Search:{' '}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </span>
    )
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data
    },
    useFilters,
    useGlobalFilter
  )

  return (
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
                        <>{header.canFilter ? header.render("Filter") : null}</>
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
  );
};

export default CommonTable;