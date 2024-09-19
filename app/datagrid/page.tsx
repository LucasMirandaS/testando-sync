'use client'

import { useState } from 'react';
import {
  ColumnDirective, ColumnsDirective, GridComponent,
  Inject, Page, Sort, Filter, Group,
} from '@syncfusion/ej2-react-grids';
import { data } from "./datasource";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Fields = keyof typeof data[number]

const initialColumns: (ColumnDirective['props'] & { field: Fields })[] = [
  {
    field: 'OrderID',
    width: '100',
    textAlign: 'Right'
  },
  {
    field: 'CustomerID',
    width: '100',
    textAlign: 'Right'
  },
  {
    field: 'EmployeeID',
    width: '100',
    textAlign: 'Right'
  },
  {
    field: 'Freight',
    width: '100',
    format: "C2",
    textAlign: "Right"
  },
]

export default function DataGrid() {
  const pageSettings: object = { pageSize: 6 };
  const filterSettings: object = { type: 'Excel' };

  const [columns, setColumns] = useState<(ColumnDirective['props'] & { field: Fields })[]>(initialColumns);
  const [openColumnSelector, setOpenColumnSelector] = useState<boolean>(false);

  const handleColumn = (e: MouseEvent, c: (ColumnDirective['props'] & { field: Fields })) => {
    e.preventDefault()
    if (columns.find(col => col.field === c.field)) {
      setColumns(columns.filter(col => col.field !== c.field));
    } else {
      const newColumns = [...initialColumns.filter(col => columns.some(c2 => c2.field === col.field) || col.field === c.field)];
      setColumns(newColumns)
    }
  }

  return (
    <>
      <div className='h-[100dvh] w-[100dvw] flex flex-col items-center justify-center'>
        <div className='w-full flex justify-end px-2 py-1'>
          <DropdownMenu open={openColumnSelector} onOpenChange={setOpenColumnSelector}>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>Colunas</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {
                initialColumns.map(c => (
                  <DropdownMenuCheckboxItem
                    checked={columns.some(col => col.field === c.field)}
                    onClick={(e) => {
                      // @ts-ignore
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
          dataSource={data}
          // allowGrouping={true}
          allowSorting={true}
          allowFiltering={true}
          allowPaging={true}
          pageSettings={pageSettings}
          filterSettings={filterSettings}
          height={180}
        >
          <ColumnsDirective>
            {
              columns.map(c => (
                <ColumnDirective {...c} />
              ))
            }
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group]} />
        </GridComponent>
      </div>
    </>
  )
}
