import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Header } from 'semantic-ui-react';
import axios from 'axios';
import LabItem from './LabItem';
import Loader from '../common/Loader';

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
    const { intl } = this.props;
    if (loading) {
      return <Loader />;
    }
    return (
      <div className="inside-container">
        <Header as="h1">{intl.formatMessage({ id: 'main.title' })}</Header>
        <div className="labs-container">
          {items.map(obj => (
            <LabItem
              key={obj.name}
              item={obj}
            />
          ))}
        </div>
      </div>
    );
  }
}

Labs.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Labs);
