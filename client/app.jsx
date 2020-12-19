import React,{useState} from 'react'
import {render} from 'react-dom'
require('babel-core/register');
require('babel-polyfill');
import image from "./src/spacex.jpg"
import "./src/app.css"
import ApolloClient from "apollo-boost"
import {ApolloProvider} from "react-apollo"
import Launches from "./src/components/launches"
import Launch from "./src/components/Launch"
import { useForm } from "react-hook-form";
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
const client = new ApolloClient({
    uri:"http://localhost:8080/graphql"
})
function App(){
    const { register, handleSubmit, watch, errors } = useForm();
    const[connected,setConnected]=useState(false)
    const onSubmit = (data) => {
        const requestOptions = {
          method: "POST",
          allowed_headers: "Content-Type,Authorization",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        };
        console.log(requestOptions.body)
        fetch("http://localhost:8080/connection", requestOptions)
          .then((response) => response.json())
          .then((toto) => {
            if (toto.message === "working!") {
            console.log(toto.message)
            setConnected(true)
            } else console.log(toto.message);
          });
      };
    {if(!connected)        
        return (
        <div>
        <form  action="/connection"
                method="POST" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" ref={register({ required: true })}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" ref={register({ required: true })}/>
            <button type="submit">Submit</button>
        </form>
    </div>
    ) 
    else return <ApolloProvider client={client}>
    <Router>
      <div className="App">    
          <img src={image} alt="alt" style={{ height: "150px",width: "150px"}} />  
      </div>
     <Switch>
     <Route exact path='/' component={Launches}/>
      <Route exact path='/launch/:flight_number' component={Launch}/>
     </Switch>
      </Router>
      </ApolloProvider> }
    
}

render(
<div>
<App/>
</div>,
document.querySelector('.app')
)