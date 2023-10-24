import React, { Component } from "react";
import BankDataService from "../services/loan.service";

export default class AddLoan extends Component {
    constructor(props) {
        super(props);
        this.onChangeLoanType = this.onChangeLoanType.bind(this);
        this.onChangeLoanNumber = this.onChangeLoanNumber.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeInterest = this.onChangeInterest.bind(this);
        this.onChangeLoanTermYears = this.onChangeLoanTermYears.bind(this);
        this.saveLoan = this.saveLoan.bind(this);
        this.newLoan = this.newLoan.bind(this);

        this.state = {
            loanType: "Personal",
            loanNumber: 1,
            amount: 1000,
            interest: 11,
            loanTermYears: 0.5,

            submitted: false
        };
    }

    onChangeLoanType(e) {
        this.setState({
            loanType: e.target.value
        });
    }
    onChangeLoanNumber(e) {
        this.setState({
            loanNumber: e.target.value
        });
    }
    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }
    onChangeInterest(e) {
        this.setState({
            interest: e.target.value
        });
    }

    onChangeLoanTermYears(e) {
        this.setState({
            loanTermYears: e.target.value
        });
    }

    saveLoan() {
        var data = {
            loanType: this.state.loanType,
            loanNumber: this.state.loanNumber,
            amount: this.state.amount,
            interest: this.state.interest,
            loanTermYears: this.state.loanTermYears
        };
        console.log(data)
        BankDataService.create(data)
            .then(response => {
                this.setState({
                    loanType: response.data.loanType,
                    loanNumber: response.data.loanNumber,
                    amount: response.data.amount,
                    interest: response.data.interest,
                    loanTermYears: response.data.loanTermYears,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newLoan() {
        this.setState({
            loanType: "Personal",
            loanNumber: 1,
            amount: 1000,
            interest: 11,
            loanTermYears: 0.5,

            submitted: false
        });
    }
    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Data submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newLoan}>
                            Add another Loan
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="loanType">Loan Type</label>
                            <input
                                type="text"
                                className="form-control"
                                id="loanType"
                                required
                                value={this.state.loanType}
                                onChange={this.onChangeLoanType}
                                name="loanType"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="loanNumber">Loan Number</label>
                            <input
                                type="number"
                                className="form-control"
                                id="loanNumber"
                                required
                                value={this.state.loanNumber}
                                onChange={this.onChangeLoanNumber}
                                name="loanNumber"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <input
                                type="number"
                                className="form-control"
                                id="amount"
                                required
                                value={this.state.amount}
                                onChange={this.onChangeAmount}
                                name="amount"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="interest">Interest</label>
                            <input
                                type="number"
                                className="form-control"
                                id="interest"
                                required
                                value={this.state.interest}
                                onChange={this.onChangeInterest}
                                name="interest"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Loan Term (Years)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="loanTermYears"
                                required
                                value={this.state.loanTermYears}
                                onChange={this.onChangeLoanTermYears}
                                name="loanTermYears"
                            />
                        </div>
                        <br/>
                        <button onClick={this.saveLoan} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}