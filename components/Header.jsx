import React, { PropTypes, Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../components/Home';
import Orders from '../components/Orders';
import TopContent from '../components/TopContent';

const defaultStyle = {
  marginLeft: 20
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { menuActive:1 };
  }
  makeActive = val => {
    this.setState({ menuActive: val });
  }

  render() {
    const {menuActive} = this.state;
    return (
      <header className="header">
      <Router>
        <div>
          <div className="logo">
            <Link to="/home" label="Order" >logo</Link>
          </div>
          <ul className="nav navbar-nav">
            <li><Link to="/home" label="Home" className={menuActive === 1 && 'active'} onClick={() => this.makeActive(1)}>Home</Link></li>
            <li><Link to="/orders" label="Order" className={menuActive === 2 && 'active'} onClick={() => this.makeActive(2)}>Orders</Link></li>
            <li><Link to="/salesquote" label="Sales Quote" className={menuActive === 3 && 'active'} onClick={() => this.makeActive(3)}>Sales Quote</Link></li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/salesquote" component={TopContent} />
        </div>
      </Router>
      </header>
    );
  }
}
export default Header;
