import React from 'react';
import { Header } from 'semantic-ui-react';
import LabItem from './LabItem';

const Labs = () => (
  <div className="inside-container">
    <Header as="h1">User Profile</Header>
    <div className="labs-container">
      <LabItem />
      <LabItem />
      <LabItem />
      <LabItem />
    </div>
  </div>
);

export default Labs;
