'use client'

import React, { useState } from 'react';
import {
  ColumnDirective, ColumnsDirective, GridComponent,
  Inject, Page, Sort, Filter, Group, Resize,
  Reorder
} from '@syncfusion/ej2-react-grids';
import { data } from "./datasource";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Fields = keyof typeof data[number]

type CustomColumnExtraProps = {
  field: Fields
  id: string
}

type CustomColumn = (ColumnDirective['props'] & CustomColumnExtraProps)

const initialColumns: CustomColumn[] = [
  {
    field: 'OrderID',
    maxWidth: '1000',
    width: '200',
    minWidth: '50',
    textAlign: 'Right',
    id: 'order-id'
  },
  {
    field: 'CustomerID',
    maxWidth: '1000',
    width: '200',
    minWidth: '50',
    textAlign: 'Right',
    id: 'customer-id'
  },
  {
    field: 'EmployeeID',
    maxWidth: '1000',
    minWidth: '50',
    width: '200',
    textAlign: 'Right',
    id: 'employee-id'
  },
  {
    field: 'Freight',
    maxWidth: '1000',
    width: '200',
    minWidth: '50',
    format: "C2",
    textAlign: "Right",
    id: 'freight-id'
  },
]

export default function DataGrid() {
  const pageSettings: object = { pageSize: 6 };
  const filterSettings: object = { type: 'Excel' };

  const gridRef = React.createRef<GridComponent>();

  const [columns, setColumns] = useState<CustomColumn[]>(initialColumns);
  const [openColumnSelector, setOpenColumnSelector] = useState<boolean>(false);

  const handleColumn = (e: any, c: CustomColumn) => {
    e.preventDefault()
    if (columns.find(col => col.field === c.field)) {
      setColumns(columns.filter(col => col.field !== c.field));
    } else {
      const newColumns = [...initialColumns.filter(col => columns.some(c2 => c2.field === col.field) || col.field === c.field)];
      setColumns(newColumns)
    }
  }

  const handleChange = (e: any) => {
    console.log(e)
  }

  const exportSettings = () => {
    const columns = gridRef?.current?.columns as CustomColumn[]
    const coumnsField = columns.map(column => column.field)
    // @ts-expect-error adicionado para permitir recuperação de atributo privado da instância da grid
    const reorder = gridRef?.current?.sortedColumns as string[]
    console.log({ coumnsField, reorder })
  }

  return (
    <>
      <div className='h-[100dvh] w-[100dvw] flex flex-col items-center justify-center'>
        <div className='w-full flex justify-end px-2 py-1'>
          <Button onClick={exportSettings}>
            Exportar configurações
          </Button>
          <DropdownMenu open={openColumnSelector} onOpenChange={setOpenColumnSelector}>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>Colunas</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {
                initialColumns.map(c => (
                  <DropdownMenuCheckboxItem
                    key={c.field}
                    checked={columns.some(col => col.field === c.field)}
                    onClick={(e) => {
                      handleColumn(e, c)
                    }}
                  >
                    {
                      c.field
                    }
                  </DropdownMenuCheckboxItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <GridComponent
          width={'98dvw'}
          dataSource={data}
          allowSorting={true}
          allowFiltering={true}
          allowPaging={true}
          allowResizing
          allowReordering
          pageSettings={pageSettings}
          filterSettings={filterSettings}
          height={180}
          autoFit={true}
          actionComplete={handleChange}
          ref={gridRef}
        >
          <ColumnsDirective>
            {
              columns.map(c => (
                <ColumnDirective {...c} key={c.field} />
              ))
            }
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group, Resize, Reorder]} />
        </GridComponent>
      </div>
    </>
  )
}
