import React, { Component } from "react";
import LoanDataService from "../services/loan.service";
import { withRouter } from '../common/with-router';

class Loan extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getLoan = this.getLoan.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateLoan = this.updateLoan.bind(this);
        this.deleteLoan = this.deleteLoan.bind(this);

        this.state = {
            currentLoan: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getLoan(this.props.router.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentLoan: {
                    ...prevState.currentLoan,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentLoan: {
                ...prevState.currentLoan,
                description: description
            }
        }));
    }

    getLoan(id) {
        LoanDataService.get(id)
            .then(response => {
                this.setState({
                    currentLoan: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentLoan.id,
            title: this.state.currentLoan.title,
            description: this.state.currentLoan.description,
            published: status
        };

        LoanDataService.update(this.state.currentLoan.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentLoan: {
                        ...prevState.currentLoan,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateLoan() {
        LoanDataService.update(
            this.state.currentLoan.id,
            this.state.currentLoan
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The loan was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteLoan() {
        LoanDataService.delete(this.state.currentLoan.id)
            .then(response => {
                console.log(response.data);
                this.props.router.navigate('/loans');
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentLoan } = this.state;

        return (
            <div>
                {currentLoan ? (
                    <div className="edit-form">
                        <h4>Loan</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentLoan.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentLoan.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentLoan.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentLoan.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(true)}
                            >
                                Publish
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteLoan}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateLoan}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Loan...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Loan);