import React from 'react';
import axios from 'axios';
import './covid.css';

export default class App extends React.Component{
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
         <h1>Covid-19 disease in the world</h1>
         <table className="thead">
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


