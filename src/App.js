// import React from 'react';
import axios from 'axios';
import './covid.css';
import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import TimeAgo from 'react-timeago';
// import { MoveColumnController } from 'ag-grid-community';
import Moment from 'react-moment';





class Total extends React.Component{
  state = {
    load:false,
    total:{},
  };
   
  componentDidMount() {
    axios.get(`https://covid19.mathdro.id/api`)
      .then(res => {
        console.log(res.data)
        this.setState({total:res.data,load:true});
       
      })
  }

  render() {
    
    if(!this.state.load)
    return null;
    const {confirmed, deaths, lastUpdate, recovered} =this.state.total;
    return (
      <table id="total">
        <tbody>
          <tr>
            <th>Confirmed</th>
            <th>Recovered</th>
            <th>Deaths</th>
            <th>LastUpdate</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>{confirmed.value}</td>
            <td>{recovered.value}</td>
            <td>{deaths.value}</td>
            <td>{<TimeAgo date={new Date(lastUpdate).toLocaleDateString()}/>}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

class Table extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {headerName: 'Country', field: 'countryRegion', sortable: true, filter: true},
        {headerName: 'Active', field: 'active'},
        {headerName: 'Deaths', field: 'deaths'},
        {headerName: 'Recovered', field: 'recovered'},
        {headerName: 'Confirmed', field: 'confirmed'},
        //{headerName: 'LastUpdate', field: '<TimeAgo date={new Date(lastUpdate).toLocaleDateString()}/>'},
        //{headerName: 'LastUpdate', field: 'lastUpdate'},
        //{headerName: 'LastUpdate', field: 'lastUpdate', cellRenderer:(lastUpdate) => {return (lastUpdate) ? (new Date(lastUpdate)) : 'something wrong'} },
        //{headerName: 'LastUpdate', field: 'lastUpdate', cellRenderer:(lastUpdate) => {return (lastUpdate) ? format(new Date(data.value), 'MMMM DD, YYYY') : 'something wrong'} },
        {headerName: 'LastUpdate', field: 'lastUpdate',  cellRendererFramework: function (props) { return <TimeAgo date={props.value} />; },
       
      }

      ],
      rowData: [], 
    };   
}

  componentDidMount() {
     axios.get(`https://covid19.mathdro.id/api/confirmed`)
      //  .then(res => {
      //    const country = res.data;
      //    this.setState({country});
      //  })
        .then(res => {
          const rowData = res.data;
          //rowData.map((lastUpdate) => (lastUpdate) ? (new Date(lastUpdate)).toLocaleDateString() : 'something wrong' );
         //console.log(rowData);
          this.setState({rowData});
        })
        
   }
  
   render() {
     //console.log(this.state.rowData);
     return (
      <div style={{ height: '100vh', width: '1220px' }} className="ag-theme-alpine table">
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}>
        </AgGridReact>
      </div>

      //  <div>
      //    <table id="thead">
      //       <thead>
      //         <tr>
      //           <th>Country</th>
      //           <th>Active</th>
      //           <th>Deaths</th>
      //           <th>Recovered</th>
      //           <th>Confirmed</th>
      //           <th>LastUpdate</th>
      //         </tr>
      //       </thead>
      //       <tbody>
      //         {this.state.country.map((country, index) => 
      //           <tr key={index.toString()}>
      //             <td>{country.countryRegion}</td>
      //             <td>{country.active}</td>
      //             <td>{country.deaths}</td>
      //             <td>{country.recovered}</td>
      //             <td>{country.confirmed}</td>
      //             <td>
      //                {<TimeAgo date={new Date(lastUpdate).toLocaleDateString()}/>}
      //             </td>
      //             
      //           </tr>
      //         )}    
      //       </tbody>
      //    </table>
         
      //  </div>
     )
   }
}
export default function App(){
  return <div>
    <h1>Covid-19 disease in the world</h1>
    <input type="text" id="searchInput" onkeyup="myFunction()" placeholder="search..." title="Type in a name"/>
    <Total />
    <Table />
  </div>
}

//<h1>Covid-19 disease in the world</h1>
//<input type="text" id="searchInput" onkeyup="myFunction()" placeholder="search..." title="Type in a name"/>
//<Total />