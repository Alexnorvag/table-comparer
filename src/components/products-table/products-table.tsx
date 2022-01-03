import React, { useEffect, useState, useMemo } from 'react'
import { useTable, useRowSelect, usePagination } from 'react-table'
import {
  TableContainer,
  Table as MUITable,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
  Paper,
  useTheme
} from '@material-ui/core'

import EnhancedToolbar from './enhanced-toolbar'
import EnhancedTableHead from './enhanced-head'
import { Product } from '@/api/types'
import { ITableInstance, SelectedRowData, IRowInstanse, ProductsTableProps } from '../types'

import styles from '@/styles/Home.module.css'

function ProductsTable({ data, columns }: ProductsTableProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    toggleRowSelected,
    toggleAllRowsSelected,
    selectedFlatRows,
    state: { selectedRowIds, pageIndex, pageSize }
  }: ITableInstance<Product> = useTable(
    {
      columns,
      data
    },
    usePagination,
    useRowSelect
  ) as ITableInstance<Product>
  const theme = useTheme()
  const colors = [
    theme.palette.secondary.main,
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
    theme.palette.secondary.light,
    theme.palette.primary.light,
    theme.palette.success.light,
    theme.palette.warning.light,
    theme.palette.error.light,
    theme.palette.info.light
  ]

  const [selectedRows, setSelectedRows] = useState<SelectedRowData<Product>[]>([])
  const [isComparing, setIsComparing] = useState<boolean>(false)
  const selectedIds = useMemo<string[]>(() => Object.keys(selectedRowIds), [selectedRowIds])

  const toggleRowSelecting = (row: IRowInstanse<Product>) => {
    row.toggleRowSelected()
  }

  useEffect(() => {
    if (selectedIds.length < selectedRows.length) {
      setSelectedRows((s) => s.filter(({ id }) => selectedIds.includes(id)))
    } else {
      setSelectedRows((s) => Array.from(new Set([...s, ...selectedFlatRows])))
    }
  }, [selectedIds, selectedFlatRows])

  useEffect(() => {
    if (selectedIds.length > 2) {
      toggleRowSelected(selectedRows[0].id)
      setSelectedRows(([, ...s]) => [...s])
    }
  }, [selectedRows, selectedIds])

  const toggleAllRows = () => {
    setSelectedRows(null)
    toggleAllRowsSelected(false)
    setIsComparing(false)
  }

  const toggleCompare = () => {
    if (selectedRows.length >= 2) {
      setIsComparing((s) => !s)
    }
  }

  return (
    <Paper>
      <EnhancedToolbar
        toggleAllRows={toggleAllRows}
        numSelected={selectedRows?.length || 0}
        toggleCompare={toggleCompare}
      />
      <TableContainer className={styles.tableContainer}>
        <MUITable {...getTableProps()} size={'medium'} stickyHeader>
          <EnhancedTableHead
            headerGroups={headerGroups}
            selectedRows={selectedRows}
            isComparing={isComparing}
            itemsColors={colors}
          />
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row)
              const { isSelected } = row

              return (
                <TableRow {...row.getRowProps()} hover selected={isSelected} onClick={() => toggleRowSelecting(row)}>
                  {row.cells.map((cell) => (
                    <TableCell align="center" {...cell.getCellProps()}>
                      {cell.value ? (Array.isArray(cell.value) ? cell.value.join(', ') : cell.render('Cell')) : '-'}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </MUITable>
      </TableContainer>
      <TablePagination
        count={data.length}
        component="div"
        onChangePage={(_, pageNumber) => {
          pageNumber > pageIndex ? nextPage() : previousPage()
        }}
        onChangeRowsPerPage={(event) => {
          setPageSize(+event.target.value)
          gotoPage(0)
        }}
        page={pageIndex}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
      />
    </Paper>
  )
}

export default ProductsTable
