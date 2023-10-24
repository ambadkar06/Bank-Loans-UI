import React, { Component } from "react";
import LoanDataService from "../services/loan.service";
import { Link } from "react-router-dom";

export default class LoansList extends Component {
  constructor(props) {
    super(props);
    this.retrieveLoans = this.retrieveLoans.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLoan = this.setActiveLoan.bind(this);

    this.state = {
      loans: [],
      currentLoan: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveLoans();
  }


  retrieveLoans() {
    LoanDataService.getAll()
      .then(response => {
        this.setState({
          loans: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveLoans();
    this.setState({
      currentLoan: null,
      currentIndex: -1
    });
  }

  setActiveLoan(loan, index) {
    this.setState({
      currentLoan: loan,
      currentIndex: index
    });
  }


  render() {
    const { loans, currentLoan, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Loan List</h4>

          <ul className="list-group">
            {loans &&
              loans.map((loan, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveLoan(loan, index)}
                  key={index}
                >
                  {loan.id}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentLoan ? (
            <div>
              <h4>Loan</h4>
              <div>
                <label>
                  <strong>Loan Type:</strong>
                </label>{" "}
                {currentLoan.loanType}
              </div>
              <div>
                <label>
                  <strong>Loan Number:</strong>
                </label>{" "}
                {currentLoan.loanNumber}
              </div>
              <div>
                <label>
                  <strong>Amount:</strong>
                </label>{" "}
                {currentLoan.amount}
              </div>
              <div>
                <label>
                  <strong>Rate of Interest:</strong>
                </label>{" "}
                {currentLoan.interest}
              </div>
              <div>
                <label>
                  <strong>Loan Term (Years):</strong>
                </label>{" "}
                {currentLoan.loanTermYears}
              </div>
              <div>
                <label>
                  <strong>Start Date:</strong>
                </label>{" "}
                {currentLoan.startDate}
              </div>
              
              <div>
                <label>
                  <strong>Last Payment:</strong>
                </label>{" "}
                {currentLoan.modifiedDate}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentLoan.isDeleted ? "Inactive" : "Active"}
              </div>

              <Link
                to={"/loans/" + currentLoan.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Loan...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}