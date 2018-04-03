import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import List from '../List/index';
import Form from '../Form/index';

export default class main extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link to='/'>Orders</Link></li>
          <li><Link to='/salesquote'>Sales Quote</Link></li>
          <li><Link to='/atpplanner'>ATP Planner</Link></li>
        </ul>
      </nav>

    );
  }
}

