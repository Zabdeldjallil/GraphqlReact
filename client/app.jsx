import React from 'react'
import {render} from 'react-dom'
require('babel-core/register');
require('babel-polyfill');
import image from "./src/spacex.jpg"
import "./src/app.css"
import ApolloClient from "apollo-boost"
import {ApolloProvider} from "react-apollo"
import Launches from "./src/components/launches"
import Launch from "./src/components/Launch"
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
const client = new ApolloClient({
    uri:"http://localhost:8080/graphql"
})
function App(){
    return <ApolloProvider client={client}>
  <Router>
    <div className="App">    
        <img src={image} alt="alt" style={{ height: "150px",width: "150px"}} />  
    </div>
   <Switch>
   <Route exact path='/' component={Launches}/>
    <Route exact path='/launch/:flight_number' component={Launch}/>
   </Switch>
    </Router>
    </ApolloProvider> 
}

render(
<div>
<App/>
</div>,
document.querySelector('.app')
)