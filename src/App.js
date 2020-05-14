import React from 'react';
import axios from 'axios';
import './covid.css';

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
            <td>{new Date(lastUpdate).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

class Table extends React.Component{
  state = {
    country:[],
  };

  componentDidMount() {
     axios.get(`https://covid19.mathdro.id/api/confirmed`)
       .then(res => {
         const country = res.data;
         this.setState({country});
       })
   }

   render() {
     return (
       <div>
         <table id="thead">
            <thead>
              <tr>
                <th>Country</th>
                <th>Active</th>
                <th>Deaths</th>
                <th>Recovered</th>
                <th>Confirmed</th>
                <th>LastUpdate</th>
              </tr>
            </thead>
            <tbody>
              {this.state.country.map((country, index) => 
                <tr key={index.toString()}>
                  <td>{country.countryRegion}</td>
                  <td>{country.active}</td>
                  <td>{country.deaths}</td>
                  <td>{country.recovered}</td>
                  <td>{country.confirmed}</td>
                  <td>{new Date(country.lastUpdate).toLocaleDateString()}</td>
                </tr>
              )}    
            </tbody>
         </table>
         
       </div>
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
