import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import axios from 'axios';
import LabItem from './LabItem';

class Labs extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      items: [],
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
    axios.get('/GSITAE/labs')
    .then((response) => {
      const items = response.data.labs;
      this.setState({ items, loading: false });
    })
    .catch(err => console.log(err.response));
  }

  render() {
    const { loading, items } = this.state;
    if (loading) {
      return <p>Loading....</p>;
    }
    return (
      <div className="inside-container">
        <Header as="h1">GSITAE Labs</Header>
        <div className="labs-container">
          {items.map(obj => (
            <LabItem
              key={obj.name}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Labs;
