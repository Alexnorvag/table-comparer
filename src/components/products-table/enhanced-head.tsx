import React, { Fragment, useRef } from 'react'
import { TableCell, TableHead, TableRow } from '@material-ui/core'

import CompareRow from './compare-row'
import { EnhancedTableHeadProps } from '../types'

const EnhancedTableHead = ({ headerGroups, selectedRows, isComparing, itemsColors }: EnhancedTableHeadProps) => {
  const mainHeaderEl = useRef<HTMLTableRowElement>()

  return (
    <TableHead>
      {headerGroups.map((headerGroup, i) => (
        <Fragment key={i}>
          <TableRow ref={mainHeaderEl} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell align="center" {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
          {isComparing && selectedRows && (
            <CompareRow
              parentRef={mainHeaderEl}
              selectedRows={selectedRows}
              headerGroup={headerGroup}
              itemsColors={itemsColors}
            />
          )}
        </Fragment>
      ))}
    </TableHead>
  )
}

export default EnhancedTableHead
