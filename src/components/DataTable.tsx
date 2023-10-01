import * as React from 'react'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { InstrumentData } from './jsonData'
import jsonData from './jsonData'

const columnHelper = createColumnHelper<InstrumentData>()

const columns = [
  columnHelper.accessor('INSTRUMENT', {
    cell: info => info.getValue(),
  }),
  columnHelper.accessor(row => row.SYMBOL, {
    id: 'SYMBOL',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>SYMBOL</span>,
  }),
  columnHelper.accessor('EXPIRY_DT', {
    header: () => 'EXPIRY_DT',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('STRIKE_PR', {
    header: () => <span>STRIKE_PR</span>,
  }),
  columnHelper.accessor('OPTION_TYP', {
    header: 'OPTION_TYP',
  }),
  columnHelper.accessor('OPEN', {
    header: 'OPEN',
  }),
  columnHelper.accessor('HIGH', {
    header: 'HIGH',
  }),
  columnHelper.accessor('LOW', {
    header: 'LOW',
  }), columnHelper.accessor('CLOSE', {
    header: 'CLOSE',
  }), columnHelper.accessor('SETTLE_PR', {
    header: 'SETTLE_PR',
  }), columnHelper.accessor('CONTRACTS', {
    header: 'CONTRACTS',
  }), columnHelper.accessor('VAL_INLAKH', {
    header: 'VAL_INLAKH',
  }), columnHelper.accessor('OPEN_INT', {
    header: 'OPEN_INT',
  }),
  columnHelper.accessor('CHG_IN_OI', {
    header: 'CHG_IN_OI',
    footer: info => info.column.id,
  }), columnHelper.accessor('TIMESTAMP', {
    header: 'TIMESTAMP',
  }),
]

function DataTable() {
  const [data, setData] = React.useState(() => [...jsonData])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
  <table className="table">
    <thead>
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <th key={header.id} className="table-header">
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody>
      {table.getRowModel().rows.map(row => (
        <tr key={row.id} className="table-row">
          {row.getVisibleCells().map(cell => (
            <td key={cell.id} className="table-cell">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>
  )
}
export default DataTable;