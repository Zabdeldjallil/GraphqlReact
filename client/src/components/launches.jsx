import React from 'react'
import {render} from 'react-dom'
import gql from "graphql-tag"
import {Query} from "react-apollo"
import LaunchItem from "./LaunchItem"

const LAUNCHES_QUERY=gql`
    query LaunchesQuery{
        launches{
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
    }

`;
function Launches(){
return <div>
    <h1>Launches we had</h1>
    <Query query={LAUNCHES_QUERY}>
        {
            ({loading,error,data})=>{
                if(loading) return <h4>Loading...</h4>
                if(error) console.log(error)
                return <div>
                    {
                    data.launches.map(launch=>(
                        <LaunchItem key={launch.flight_number} launch={launch}/>
                    ))
                    }
                </div>
            }
        }
    </Query>
</div>
}

export default Launches