import React, { useState } from 'react';
import alasql from 'alasql';
import { useTable } from 'react-table';
import './SQLPlayground.css';
import NLPtoSQLBot from '../bot/Nlp2Sql';
function SQLPlayground() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [tableInfo, setTableInfo] = useState([]);
  const [queryHistory, setQueryHistory] = useState([]);
  const [expandedTables, setExpandedTables] = useState({});
  const [viewBot,setViewBot]=useState(false);
  const toggleExpand = (tableName) => {
    setExpandedTables((prev) => ({
      ...prev,
      [tableName]: !prev[tableName]
    }));
  };

  // Function to execute the SQL query
  const executeQuery = () => {
    try {
      const res = alasql(query); // Executes the SQL query
      setQueryHistory([...queryHistory, query]); // Add query to history
      loadTableInfo(); // Update available tables
      
      if (query.trim().toLowerCase().startsWith('select')) {
        setResult(res); // Display results in table format for SELECT queries
      } else {
        setResult([{ message: JSON.stringify(res, null, 2) }]); // For non-select queries
      }
    } catch (err) {
      setResult([{ message: `Error: ${err.message}` }]);
    }
  };

  // Function to load table information
  const loadTableInfo = () => {
    const tables = alasql.tables;
    const tableData = Object.keys(tables).map(tableName => {
      const columns = tables[tableName].columns.map(col => ({
        name: col.columnid,
        type: col.dbtypeid
      }));
      return { tableName, columns };
    });

    const newTables = tableData.filter(newTable =>
      !tableInfo.some(existingTable => existingTable.tableName === newTable.tableName)
    );
    setTableInfo([...newTables, ...tableInfo]);
  };

  // Function to create a sample table for practice
  const generateBigTable = () => {
    const tableName = 'dummy';

    if (alasql.tables[tableName]) {
      setResult([{ message: `The table "${tableName}" has already been created.` }]);
      return;
    }

    try {
      const createTableQuery = `
        CREATE TABLE ${tableName} (
          id INT,
          name STRING,
          age INT,
          address STRING,
          email STRING,
          phone STRING,
          salary FLOAT
        )`;
      alasql(createTableQuery);

      const insertQuery = `
        INSERT INTO ${tableName} VALUES
        (1, "Alice", 25, "123 Main St", "alice@example.com", "555-1234", 50000.00),
        (2, "Bob", 30, "456 Maple St", "bob@example.com", "555-5678", 55000.00),
        (3, "Charlie", 28, "789 Oak St", "charlie@example.com", "555-8765", 60000.00),
        (4, "David", 35, "321 Pine St", "david@example.com", "555-4321", 65000.00),
        (5, "Eve", 22, "654 Cedar St", "eve@example.com", "555-6789", 45000.00)
      `;
      alasql(insertQuery);

      loadTableInfo();
      setResult([{ message: `Table "${tableName}" created with sample data.` }]);
    } catch (error) {
      setResult([{ message: `Error creating table "${tableName}": ${error.message}` }]);
    }
  };

  // Table component using react-table
  const TableComponent = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data
    });

    return (
      <table {...getTableProps()} className="result-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  // Define columns and data for the table if result is an array of objects
  const columns = result && result.length > 0 && typeof result[0] === 'object' ?
    Object.keys(result[0]).map(key => ({ Header: key, accessor: key })) : [];
  
  return (
   <div className='playground'>
     <div className="playground-container">
      <div className="compiler-section">
        <h2>SQL Playground</h2>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter SQL query"
          className='query-textarea'
          rows="4"
          cols="50"
        />
        <div className='btn-execute'>
        <button onClick={executeQuery}>Run Query</button>
        <button onClick={generateBigTable}>Generate Big Table</button>
        <button onClick={()=>setViewBot(prev=>!prev)}>{viewBot?"History":"bot"}</button>
        </div>
        {/* Result Display */}
        <h2>Result</h2>
        {columns.length > 0 ? (
          <TableComponent columns={columns} data={result} />
        ) : (
          <pre>{result?JSON.stringify(result, null, 2):null}</pre>
        )}
      </div>

      {/* Available Tables and Query History */}
      {viewBot ? <NLPtoSQLBot/>:
      <div className="side-section">
        <h2>Available Tables</h2>
        {tableInfo.length > 0 ? (
          tableInfo.map((table) => (
            <div key={table.tableName}>
              <h3 onClick={() => toggleExpand(table.tableName)} className='btn-expand'>
                Table: {table.tableName} {expandedTables[table.tableName] ? '▲' : '▼'}
              </h3>
              {expandedTables[table.tableName] && (
                <ul>
                  {table.columns.map((col) => (
                    <li key={col.name}>
                      {col.name} ({col.type})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p>No tables available. Click "Generate Big Table" to create one.</p>
        )}

        <h2>Query History</h2>
        <ul>
          {queryHistory.map((q, index) => (
            <li key={index}>{q}</li>
          ))}
        </ul>
      </div>
      }
    </div>
   </div>
  );
}

export default SQLPlayground;
