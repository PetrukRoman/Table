import React, { Fragment } from "react";
import {
  SortNumericDown,
  SortNumericUpAlt,
  ArrowDownUp,
  SortAlphaDown,
  SortAlphaUpAlt,
} from "react-bootstrap-icons";
const Table = (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={props.onSort.bind(null, "id")}>
            ID{" "}
            {props.sortField === "id" && props.sort ? (
              <Fragment>
                {props.sort === "asc" ? (
                  <SortNumericDown />
                ) : (
                  <SortNumericUpAlt />
                )}
              </Fragment>
            ) : (
              <ArrowDownUp />
            )}
          </th>
          <th onClick={props.onSort.bind(null, "firstName")}>
            First Name{" "}
            {props.sortField === "firstName" ? (
              <Fragment>
                {props.sort === "asc" ? <SortAlphaDown /> : <SortAlphaUpAlt />}
              </Fragment>
            ) : (
              <ArrowDownUp />
            )}
          </th>
          <th onClick={props.onSort.bind(null, "lastName")}>
            Last Name{" "}
            {props.sortField === "lastName" ? (
              <Fragment>
                {props.sort === "asc" ? <SortAlphaDown /> : <SortAlphaUpAlt />}
              </Fragment>
            ) : (
              <ArrowDownUp />
            )}
          </th>
          <th onClick={props.onSort.bind(null, "email")}>
            E-mail{" "}
            {props.sortField === "email" ? (
              <Fragment>
                {props.sort === "asc" ? <SortAlphaDown /> : <SortAlphaUpAlt />}
              </Fragment>
            ) : (
              <ArrowDownUp />
            )}
          </th>
          <th onClick={props.onSort.bind(null, "phone")}>
            Phone{" "}
            {props.sortField === "phone" ? (
              <Fragment>
                {props.sort === "asc" ? (
                  <SortNumericDown />
                ) : (
                  <SortNumericUpAlt />
                )}
              </Fragment>
            ) : (
              <ArrowDownUp />
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {props.data ? (
          <Fragment>
            {props.data.map((item) => (
              <tr
                key={item.id + item.phone}
                onClick={props.onRowSelect.bind(null, item)}
              >
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </Fragment>
        ) : (
          <h3>ничего не найдено</h3>
        )}
      </tbody>
    </table>
  );
};

export default Table;
