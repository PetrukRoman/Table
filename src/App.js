import React, { Component } from "react";
import "./App.css";
import Table from "./containers/Table/Table";
import Loader from "./components/UI/Loader/Loader.js";
import ModeDisplay from "./components/ModeDisplay/modeDisplay";
import _ from "lodash";
import RowItem from "./containers/Table/RowItem/Rowitem";
import ReactPaginate from "react-paginate";
import axios from "axios";
import TableSearch from "./components/TableSearch/TableSearch";
import Button from "./components/UI/Button/Button";
import { Fragment } from "react";
import Form from "./components/Form/Form";

class App extends Component {
  state = {
    modeDispay: false,
    isLoading: false,
    data: [],
    search: "",
    sort: "",
    sortField: "id",
    row: null,
    currentPage: 0,
    toggleForm: false,
  };

  async fetchData(url) {
    try{
    const response = await axios.get(url);
    const data = response.data;
    }catch(err){
      console.log(err)
    }
    
    this.setState({
      isLoading: false,
      data,
    });
  }
  modeSelectHandler = (url) => {
    this.setState({
      isModeSelected: true,
      isLoading: true,
    });
    this.fetchData(url);
  };
  pageChangeHandler = ({ selected }) =>
    this.setState({ currentPage: selected });
  onSort = (sortField) => {
    const cloneData = this.state.data.concat();

    const sort = this.state.sort === "asc" ? "desc" : "asc";

    const data = _.orderBy(cloneData, sortField, sort);
    this.setState({ data, sort, sortField });
  };

  onRowSelect = (row) => {
    this.setState({ row });
    console.log(this.state.row);
  };

  getFilteredData() {
    const { data, search } = this.state;
    if (!search) {
      return data;
    }
    if (search)
      return data.filter((item) => {
        return (
          item["firstName"].toLowerCase().includes(search.toLowerCase()) ||
          item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
          item["email"].toLowerCase().includes(search.toLowerCase())
        );
      });
  }

  searchHandler = (search) => {
    this.setState({ search, currentPage: 0 });
  };
  toggleForm = () => {
    let toggleForm = this.state.toggleForm ? false : true;
    this.setState({ toggleForm });
  };
  add = (id, firstName, lastName, email, phone) => {
    let data = [...this.state.data];
    data.unshift({
      id,
      firstName,
      lastName,
      email,
      phone,
    });
    this.setState({ data });
  };
  render() {
    console.log(this.state.sort);
    console.log(this.state.sortField);
    const pageSize = 50;
    const filteredData = this.getFilteredData();
    const pageCount = Math.ceil(filteredData.length / pageSize);
    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage];

    if (!this.state.isModeSelected) {
      return (
        <div className="container mt-3">
          <ModeDisplay onSelect={this.modeSelectHandler} />
        </div>
      );
    }
    return (
      <div className="container mt-3">
        <TableSearch onSearch={this.searchHandler} />
        {this.state.isLoading && this.state.data !== [] ? (
          <Loader />
        ) : (
          <Fragment>
            <Button type="success" onClick={this.toggleForm}>
              Добавить пользователя
            </Button>
            {this.state.toggleForm ? <Form add={this.add} /> : null}

            <Table
              data={displayData}
              onSort={this.onSort}
              sort={this.state.sort}
              sortField={this.state.sortField}
              onRowSelect={this.onRowSelect}
              row={this.state.form}
            />
          </Fragment>
        )}
        {this.state.data.length > pageSize ? (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.pageChangeHandler}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            forcePage={this.state.currentPage}
          />
        ) : null}
        {this.state.row ? <RowItem data={this.state.row}></RowItem> : null}
      </div>
    );
  }
}
export default App;
