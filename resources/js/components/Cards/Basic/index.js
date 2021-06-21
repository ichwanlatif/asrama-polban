import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CardBasic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
    }
  }

  componentDidMount() {
    this.setState({ title: this.props.title ? this.props.title : 'Basic Card Example' });
  }

  render() {

    return (
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="row no-gutters align-items-center">
            <div className="col">
              <h6 className="m-0 font-weight-bold text-primary">{this.state.title}</h6>
            </div>
            <div className="col-auto">
              <Link to={this.props.link}>Lihat detail</Link>
            </div>
          </div>
        </div>
        <div className="card-body">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default CardBasic;