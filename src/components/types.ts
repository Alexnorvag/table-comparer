import { ProductPropertyEntryDTO, Product } from '@/api/types'
import { MutableRefObject } from 'react'
import {
  Column,
  IdType,
  CellValue,
  TableState,
  UsePaginationState,
  UseRowSelectState,
  Row,
  UseTableRowProps,
  UseRowSelectRowProps,
  TableInstance,
  UseRowSelectInstanceProps,
  UsePaginationInstanceProps,
  HeaderGroup
} from 'react-table'

export interface MaterialTableColumn {
  id?: 'name' | 'code' | 'population' | 'size' | 'density'
  minWidth?: number
  align?: 'left' | 'right' | 'center'
  format?: (value: any) => any
}

export interface ProductTableProperty extends ProductPropertyEntryDTO, MaterialTableColumn {}

export interface ProductsTableProps {
  data: Product[]
  columns: Column<Product>[]
}

export interface SelectedRowData<D> {
  id: string
  values: Record<IdType<D>, CellValue>
}

export interface ITableState<D extends object> extends TableState<D>, UsePaginationState<D>, UseRowSelectState<D> {}

export interface IRowInstanse<D extends object> extends Row<D>, UseTableRowProps<D>, UseRowSelectRowProps<D> {}
export interface ITableInstance<D extends object>
  extends TableInstance<D>,
    UseRowSelectInstanceProps<D>,
    UsePaginationInstanceProps<D> {
  page: IRowInstanse<D>[]
  state: Partial<ITableState<D>>
}

export interface EnhancedTableHeadProps {
  headerGroups: HeaderGroup<Product>[]
  selectedRows: SelectedRowData<Product>[]
  isComparing: boolean
  itemsColors: string[]
}

export interface CompareRowProps {
  parentRef: MutableRefObject<HTMLTableRowElement>
  selectedRows: SelectedRowData<Product>[]
  headerGroup: HeaderGroup<Product>
  itemsColors: string[]
}
