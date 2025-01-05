'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import Papa from 'papaparse'

interface ResultsTableProps {
  data: string
}

export function ResultsTable({ data }: ResultsTableProps) {
  const parseData = (data: string) => {
    const lines = data.trim().split('\n')
    const headers = lines[0].split('\t')
    const rows = lines.slice(1).map(line => line.split('\t'))
    return { headers, rows }
  }

  const { headers, rows } = parseData(data)

  const handleExport = () => {
    const csv = Papa.unparse({ fields: headers, data: rows })
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'query_results.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4 rounded-lg border bg-card p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Query Results</h3>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>
      <div className="rounded-md border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-muted/50">
              {headers.map((header, index) => (
                <TableHead key={index} className="text-muted-foreground">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="border-border hover:bg-muted/50">
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} className="font-mono">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

