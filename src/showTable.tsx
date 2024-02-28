import DataTables, { Config } from "datatables.net-dt";
import { useEffect, useRef } from "react";
import { User } from "./formSlice";
import { useSelector } from "react-redux";

const EmployeeTable = () => {
  const users = useSelector( (state: { form:{ users: User[] }  }) => ({
      users: state.form.users, // Assuming secondFormData is an array of user data
    }));

    const columns = [
      { data: "name", title: "Name" },
      { data: "age", title: "Age" },
      { data: "sex", title: "Sex" },
      { data: "mobile", title: "Mobile" },
      { data: "idType", title: "ID Type" },
      { data: "idNumber", title: "ID Number" },
      { data: "address", title: "Address" },
      { data: "state", title: "State" },
      { data: "city", title: "City" },
      { data: "country", title: "Country" },
      { data: "pincode", title: "Pincode" },
     ];     

  return <ReactDataTables data={users.users} columns={columns} />;
};

export default EmployeeTable;


function ReactDataTables({ ...props }: Config) {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const dt = new DataTables(tableRef.current!, props);
    return () => {
      dt.destroy();
    };
  }, []);

  return <table ref={tableRef} className="employee-table"></table>;
}
