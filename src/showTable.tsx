// components/UserTable.js
import React from 'react';
import { connect } from 'react-redux';

// types.ts
export interface User {
    name: string;
    age: number;
    sex: string;
    mobile: string;
    govtIssuedIdType: string;
    govtIssuedId: string;
    // Add other fields as necessary
  }
  
  export interface UserTableProps {
    users: User[];
  }


const UserTable : React.FC<UserTableProps> = ({ users}) => {
  debugger;
  return (
    <table>
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
        {users.map((user: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; age: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; sex: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; mobile: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; govtIssuedIdType: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; govtIssuedId: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.sex}</td>
            <td>{user.mobile}</td>
            <td>{user.govtIssuedIdType}</td>
            <td>{user.govtIssuedId}</td>
            {/* Add more cells as necessary */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state: { secondFormData: User[];  }) => ({
  users: state.secondFormData, // Assuming secondFormData is an array of user data
});

export default connect(mapStateToProps)(UserTable);




  