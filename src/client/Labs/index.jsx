import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Header } from 'semantic-ui-react';
import axios from 'axios';
import CalendarModal from './CalendarModal';
import LabItem from './LabItem';
import Loader from '../common/Loader';

class Labs extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      items: [],
      selected: {},
      openModal: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.setState({ loading: true });
    axios.get('/GSITAE/labs')
    .then((response) => {
      const items = response.data.labs;
      this.setState({ items, loading: false });
    })
    .catch(err => console.log(err.response));
  }

  handleClick(data) {
    this.setState({ openModal: true, selected: data });
  }

  closeModal() {
    this.setState({ openModal: false, selected: {} });
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
          {(items.length === 0) && (
            <h4>{intl.formatMessage({ id: 'common.noitems' })}</h4>
          )}
          {items.map(obj => (
            <LabItem
              key={obj.name}
              item={obj}
              onClickCalendar={this.handleClick}
            />
          ))}
        </div>
        <CalendarModal
          openModal={this.state.openModal}
          onCloseModal={this.closeModal}
          buttonLabel={intl.formatMessage({ id: 'common.save' })}
          title={intl.formatMessage({ id: 'calendar.title' })}
        />
      </div>
    );
  }
}

Labs.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Labs);
