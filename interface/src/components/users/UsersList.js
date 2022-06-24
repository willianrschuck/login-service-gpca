import { ActionIcon, Button, Group, Table } from '@mantine/core';
import { Action } from 'history';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTable, usePagination } from 'react-table';
import { Edit, Plus, Trash } from 'tabler-icons-react';
import Toolbar from '../shell/Toolbar';

const userService = require('../../service/user-service');

export default () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const [data, error] = await userService.getUsers();
    if (error) {
      return console.log(error);
    }
    setUsers(data);
    console.log(data);
  }

  const data = useMemo(() => {
    return users;
  }, [users])

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        width: 0
      },
      {
        Header: "Username",
        accessor: "username",
        width: 'auto'
      },
      {
        Header: "E-mail",
        accessor: "email",
        width: 'auto'
      },
      {
        accessor: 'action',
        width: 0,
        Header: "",
        Cell: ({ row }) => (
          <ActionIcon component={Link} to={`/users/edit/${row.original.id}`} variant='hover' color='blue'>
            <Edit size={16} />
          </ActionIcon>
        )
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable({
    id: 'user-table',
    columns,
    data,
    initialState: { pageIndex: 0, pageSize: 10 }
  }, usePagination);

  return (
    <div>
      <Toolbar>
        <Button component={Link} to="/users/new" leftIcon={<Plus />}>Novo</Button>
      </Toolbar>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th style={{width: column.width}} {...column.getHeaderProps()}>
                  <span>{column.render("Header")}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}