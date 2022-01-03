import React, { useLayoutEffect, useState, useCallback } from 'react'
import { TableCell, TableRow, Chip, Typography } from '@material-ui/core'
import clsx from 'clsx'

import { CompareRowProps } from '../types'
import styles from '@/styles/Home.module.css'

const CompareRow = ({ parentRef, selectedRows, headerGroup, itemsColors }: CompareRowProps) => {
  const [offsetTop, setOffsetTop] = useState(0)

  useLayoutEffect(() => {
    setOffsetTop(parentRef.current.clientHeight)
  }, [])

  const renderNames = useCallback(
    (prop) => Array.from(new Set(selectedRows.map(({ values }) => values[prop]))).join(' vs '),
    [selectedRows]
  )
  const renderTags = useCallback(
    (prop) =>
      Array.from(new Set(selectedRows.map(({ values }) => (values[prop] ? values[prop] : '-')).flat())).join(', '),
    [selectedRows]
  )

  const renderNutrition = useCallback(
    (prop) =>
      Array.from(new Set(selectedRows.map(({ values }) => values[prop]))).reduce(
        (acc, value, idx, values) => [
          ...acc,
          values.length > 1 ? (
            <Chip
              key={idx}
              className={clsx(!idx && styles.withThrough, styles.withIndent)}
              size="small"
              label={value || '-'}
              style={{ background: itemsColors[idx] }}
            />
          ) : (
            <Typography key={idx} variant="body2" gutterBottom>
              {value || '-'}
            </Typography>
          )
        ],
        []
      ),
    [selectedRows]
  )

  return (
    <TableRow>
      {headerGroup.headers.map((column, i) => (
        <TableCell style={{ top: `${offsetTop}px` }} align="center" key={i} {...column.getHeaderProps()}>
          {column.id === 'name'
            ? renderNames(column.id)
            : column.id === 'tags'
            ? renderTags(column.id)
            : renderNutrition(column.id)}
        </TableCell>
      ))}
    </TableRow>
  )
}

export default CompareRow
