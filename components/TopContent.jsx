import React from 'react';
import {cyan500, grey50, grey900} from 'material-ui/styles/colors';

import DropDownMenu from 'material-ui/DropDownMenu';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import axios from 'axios';

import MenuItem from 'material-ui/MenuItem';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const styles = {
  customWidth: {
    width: 250
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  tabs:{
    backgroundColor: grey50,
    color: grey900
  }
};

export default class TopContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      customerId: 0,
      salesOrgValue: 0,
      orderTypeValue: 0,
      shipToValue: 0,
      siteValue: 0,
      completedByValue: 0,
      controlledDate: null,
      selected: [1],
      salesOrgList:[],
      customerList:[],
      ShipToList:[],
      siteList:[],
      orderTypeList:[],
      completedByList:[]
    };
    this.getSalesOrganisation = this.getSalesOrganisation.bind(this);
  }

  handleCustomerOnchange = (event, index) => {
    console.log('handleCustomerOnchange');
    console.log('index', index);
    console.log('value', event);
    this.getShipToList(event.value);
    this.setState({
      customerId: event.value
    });
  }

  handleSalesOnchange = (event, index, value) => {
    console.log('event', event);
    console.log('index', index);
    console.log('value', value);
    this.setState({salesOrgValue:value});
  };

  handleShipToOnchange = (event, index, value) => {
    console.log('handleShipToOnchange');
    console.log('event', event);
    console.log('index', index);
    console.log('value', value);
    this.setState({
      shipToValue:value
    });
    this.getSiteList();
  };

  handleOrderTypeOnchange = (event, index, value) => {
    console.log('event', event);
    console.log('index', index);
    console.log('value', value);
    this.setState({orderTypeValue:value});
  };

  handleCompletedByOnchange = (event, index, value) => {
    console.log('event', event);
    console.log('index', index);
    console.log('value', value);
    this.setState({completedByValue:value});
  };

  handleDateChange = (event, date) => {
    this.setState({
      controlledDate: date
    });
  };

  getSalesOrganisation () {
  	console.log('getSalesOrganisation!')
  	axios.get(
    'http://5ac31345852b8c0014ab14c6.mockapi.io/api/v1/Quote_Get_Sales_Orgs'
    ).then((response) => {
      this.setState({
        'salesOrgList': response.data
      });
    });
	};

  getCustomerList () {
  	console.log('getCustomerList!')
  	axios.get(
    'http://5ac31345852b8c0014ab14c6.mockapi.io/api/v1/Quote_Get_Customers?search=userId-1'
    ).then((response) => {
      this.setState({
        'customerList': response.data
      });
    });
	};

  getShipToList (cId) {
  	console.log('getShipToList!')
  	axios.get(
    'http://5ac31345852b8c0014ab14c6.mockapi.io/api/v1/Quote_Get_Customers/'+cId+'/Quote_Get_Ship_To_Locations_For_Customer'
    ).then((response) => {
      this.setState({
        'ShipToList': response.data
      });
    });
	};

  getSiteList () {
  	console.log('getShipToList!')
  	console.log(this.state.customerId)
  	axios.get(
    'http://5ac31345852b8c0014ab14c6.mockapi.io/api/v1/Quote_Get_Customers/'+this.state.customerId+'/Quote_Get_Ship_To_Locations_For_Customer/shipTo-3/Quote_Get_Sites_For_Ship_To_Location'
    ).then((response) => {
      this.setState({
        'siteList': response.data
      });
    });
	};

  getOrderType () {
  	console.log('getOrderType!')
  	axios.get(
    'http://5ac31345852b8c0014ab14c6.mockapi.io/api/v1/Quote_Get_Order_Types'
    ).then((response) => {
      this.setState({
        'orderTypeList': response.data
      });
    });
	};

  getCompletedBy () {
  	console.log('getCompletedBy!')
  	axios.get(
    'http://5ac31345852b8c0014ab14c6.mockapi.io/api/v1/Quote_Get_Complete_By_Options'
    ).then((response) => {
      this.setState({
        'completedByList': response.data
      });
    });
	};

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows
    });
  };

  componentWillMount(){
    this.getSalesOrganisation();
    this.getCustomerList();
    this.getOrderType();
    this.getCompletedBy();
  }

  buildSalesOrgDropDown = () => {
    let items= [];
    if(this.state.salesOrgList && this.state.salesOrgList.length) {
      items.push(<MenuItem value={0} primaryText="Sales Organisation" />)
      this.state.salesOrgList.map((key,value) => {
        items.push(<MenuItem value={key.id} primaryText={key.name} />)
      })
    } else {
      items.push(<MenuItem value={0} primaryText="No item found" />)
    }
    return (
      <DropDownMenu
        value={this.state.salesOrgValue}
        onChange={this.handleSalesOnchange}
        style={styles.customWidth}
        autoWidth={false}
      >
        {items}
      </DropDownMenu>
   )
  }

  buildCustomerDropDown = () => {
    console.log('buildCustomerDropDown');
    let customersArr = [];
    if(this.state.customerList && this.state.customerList.length) {
      this.state.customerList.map((key,value) => {
        customersArr.push({"text":key.customerName,"value":key.customerId});
      })
    } else {
      customersArr.push("");
    }
    console.log(customersArr);
    return (
      <AutoComplete
        floatingLabelText="Customer"
        filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
        style={styles.customWidth}
        dataSource={customersArr}
        onNewRequest={this.handleCustomerOnchange}
      />
    )
  }

  buildShipToDropDown = () => {
    let items= [];
    if(this.state.ShipToList && this.state.ShipToList.length) {
      items.push(<MenuItem value={0} primaryText="Ship To" />)
      this.state.ShipToList.map((key,value) => {
        items.push(<MenuItem value={key.id} primaryText={key.name} />)
      })
    } else {
      items.push(<MenuItem value={0} primaryText="No item found" />)
    }
    return (
      <DropDownMenu
        value={this.state.shipToValue}
        onChange={this.handleShipToOnchange}
        style={styles.customWidth}
        autoWidth={false}
      >
        {items}
      </DropDownMenu>
   )
  }

  buildSiteDropDown = () => {
    let items= [];
    if(this.state.siteList && this.state.siteList.length) {
      items.push(<MenuItem value={0} primaryText="Site" />)
      this.state.siteList.map((key,value) => {
        items.push(<MenuItem value={key.Quote_Get_Ship_To_Locations_For_CustomerId} primaryText={key.name} />)
      })
    } else {
      items.push(<MenuItem value={0} primaryText="No item found" />)
    }
    return (
      <DropDownMenu
        value={this.state.siteValue}
        onChange={this.handleSiteOnchange}
        style={styles.customWidth}
        autoWidth={false}
      >
        {items}
      </DropDownMenu>
   )
  }

  buildOrderTypeDropDown = () => {
    let items= [];
    if(this.state.orderTypeList && this.state.orderTypeList.length) {
      items.push(<MenuItem value={0} primaryText="Order Type" />)
      this.state.orderTypeList.map((key,value) => {
        items.push(<MenuItem value={key.salestype} primaryText={key.description} />)
      })
    } else {
      items.push(<MenuItem value={0} primaryText="No item found" />)
    }
    return (
      <DropDownMenu
        value={this.state.orderTypeValue}
        onChange={this.handleOrderTypeOnchange}
        style={styles.customWidth}
        autoWidth={false}
      >
        {items}
      </DropDownMenu>
   )
  }

  buildCompletedByDropDown = () => {
    let items= [];
    if(this.state.completedByList && this.state.completedByList.length) {
      items.push(<MenuItem value={0} primaryText="Completed By" />)
      this.state.completedByList.map((key,value) => {
        items.push(<MenuItem value={key.id} primaryText={key.description} />)
      })
    } else {
      items.push(<MenuItem value={0} primaryText="No item found" />)
    }
    return (
      <DropDownMenu
        value={this.state.completedByValue}
        onChange={this.handleCompletedByOnchange}
        style={styles.customWidth}
        autoWidth={false}
      >
        {items}
      </DropDownMenu>
   )
  }

  render() {
    const { customerList } = this.state;
    return (
    <div>
          {this.buildSalesOrgDropDown()}
          {this.buildShipToDropDown()}
          {this.buildSiteDropDown()}
          <br/>
          {this.buildCustomerDropDown()}
          {this.buildOrderTypeDropDown()}
          {this.buildCompletedByDropDown()}

          <DatePicker
            hintText="Delivery Date"
            value={this.state.controlledDate}
            onChange={this.handleDateChange}
          />
          <br />
          <Table onRowSelection={this.handleRowSelection}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow selected={this.isSelected(0)}>
            <TableRowColumn>1</TableRowColumn>
            <TableRowColumn>John Smith</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
          <TableRow selected={this.isSelected(1)}>
            <TableRowColumn>2</TableRowColumn>
            <TableRowColumn>Randal White</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow selected={this.isSelected(2)}>
            <TableRowColumn>3</TableRowColumn>
            <TableRowColumn>Stephanie Sanders</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
          <TableRow selected={this.isSelected(3)}>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>Steve Brown</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>

      </div>
    );
  }
}
