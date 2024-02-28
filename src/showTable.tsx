import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { User } from './formSlice';
import 'datatables.net';
import $ from 'jquery';

const UserTable = () => {
 const users = useSelector( (state: { form:{ users: User[] }  }) => ({
  users: state.form.users, // Assuming secondFormData is an array of user data
}));
 const tableRef = useRef(null);

 useEffect(() => {
    if (tableRef.current) {
      // const $dt: JQuery & { DataTable?: any } = $('#my-table-id'); // DataTable is an optional property
      // $dt.DataTable();
      $(tableRef.current).DataTable();
    }
 }, []);

 return (
    <table ref={tableRef}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Sex</th>
          <th>Mobile</th>
          <th>Govt Issued ID Type</th>
          <th>Govt Issued ID</th>
          {/* Add more headers as necessary */}
        </tr>
      </thead>
      <tbody>
        {users.users.map((user: User, index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.sex}</td>
            <td>{user.mobile}</td>
            <td>{user.idType}</td>
            <td>{user.idNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
 );
};

export default UserTable;
