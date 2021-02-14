import React, { Fragment } from "react";

const RowItem = (props) => {
  return (
    <div className="container mb-3">
      <h1>Информация о пользователе</h1>
      <p>
        Выбран пользователь:{" "}
        <b>
          {props.data.firstName} {props.data.lastName}
        </b>
      </p>
      {props.data.address && props.data.description ? (
        <Fragment>
          <textarea
            className="form-control"
            defaultValue={props.data.description}
          ></textarea>
          <p>
            Адрес проживания: <b>{props.data.address.streetAddress}</b>
          </p>
          <p>
            Город: <b>{props.data.address.city}</b>
          </p>
          <p>
            Провинция: <b>{props.data.address.state}</b>
          </p>
          <p>
            Индекс: <b>{props.data.address.zip}</b>
          </p>
        </Fragment>
      ) : null}
    </div>
  );
};
export default RowItem;
