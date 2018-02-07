/*
* This component shows the buses at various points
*
*/
import _ from 'underscore';
import React, { Component } from "react"
import { get } from "axios"
import { feature } from 'topojson-client'
import Bus from './Bus';

class Buses extends Component {
    constructor() {
        super()
        this.state = {
			busPath: []
        }

		this.loadBuses = this.loadBuses.bind(this);
		this.getBusLocation = this.getBusLocation.bind(this);
    }

	componentDidMount() {
		this.loadBuses();

		this.timer = setInterval(this.loadBuses.bind(this), 5000)
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}


	getBusLocation(routeTag) {
		const time = new Date().getTime() - 1000 * 60;
		return (`http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&r=${routeTag}&t=${time} `);
	}

	loadBuses() {
		get(this.getBusLocation(this.props.routeTag))
		.then(res => {
			if (res.status !== 200) return;

			const buses =  res.data.vehicle;
			const busPath = _.map(buses, bus => this.createBus(bus))

			this.setState({ busPath })
		})
	}

    createBus = (bus) => {
        const busObject = {
            type:"Point",
            properties:{heading:bus.heading},
            coordinates:[bus.lon/1, bus.lat/1, 0]
        }
        return feature({type: "Topology", objects: busObject}, busObject);
    }

    render() {
        return(
            <g className="buses">
			{
				this.state.busPath.map((d,i) => (
                    <Bus key={ i }
	                    color={ this.props.color }
	                    size={ this.props.size }
	                    d={ d }
	                    route={ this.props.route }
                    />
                ))
            }
            </g>
        )
    }
}

export default Buses;
