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
      selectedDates: [],
      userDates: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveDate = this.saveDate.bind(this);
    this.deleteDate = this.deleteDate.bind(this);
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

  deleteDate(selectedDate) {
    const { selected } = this.state;
    axios.delete('/GSITAE/calendar', {
      data:{
        application: selected.name,
        selectedDate,
      },
    })
    .then(() => {
      this.setState({ openModal: false });
    })
    .catch((err) => {
      console.log(err);
      this.setState({ openModal: false });
    });
  }

  saveDate(selectedDate) {
    const { selected } = this.state;
    axios.post('/GSITAE/calendar', {
      application: selected.name,
      selectedDate,
    })
    .then(() => {
      this.setState({ openModal: false });
    })
    .catch((err) => {
      console.log(err);
      this.setState({ openModal: false });
    });
  }

  handleClick(data) {
    axios.get(`/GSITAE/calendar/${data.name}/user`)
    .then((response) => {
      console.log(response);
      const { dates } = response.data;
      const userDates = dates.map(obj => obj.selectedDate);
      this.setState({ openModal: true, selected: data, userDates });
    })
    .catch((err) => {
      console.log(err);
      this.setState({ openModal: false });
    });
    axios.get(`/GSITAE/calendar/${data.name}`)
    .then((response) => {
      console.log(response);
      const { dates } = response.data;
      const selectedDates = dates.map(obj => obj.selectedDate);
      this.setState({ openModal: true, selected: data, selectedDates });
    })
    .catch((err) => {
      console.log(err);
      this.setState({ openModal: false });
    });
  }

  closeModal() {
    this.setState({ openModal: false, selected: {} });
  }

  render() {
    const { loading, items, userDates } = this.state;
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
          userTitle={intl.formatMessage({ id: 'calendar.titleuser' })}
          saveDate={this.saveDate}
          selectedDates={this.state.selectedDates}
          userDates={userDates}
          onButtonClick={this.deleteDate}
        />
      </div>
    );
  }
}

Labs.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Labs);
