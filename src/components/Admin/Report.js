import react from 'react'
import { useTable } from 'react-table'


const Table =({columns,data}) =>{

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
    }=useTable({
        columns,
        data
    })
    
    return (
    <div>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) =>(

                
                <tr {...headerGroup.getHeaderGroupProps()}>
                   {headerGroup.headers.map(column=>(
                    <th {...column.getHeaderProps()}>{column.render(Header)}</th>
                   ))}
                </tr>))}
            </thead>

            <tbody {...getTableBodyProps()}>
               {rows.map((row,i)=>{
                prepareRow(row)
                return (
                    
                )
               })}
            </tbody>
        </table>
    </div>)
}