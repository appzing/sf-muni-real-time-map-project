import _ from 'underscore';
import React, { Component } from "react"
import { get } from "axios"
import { geoMercator, geoPath } from "d3-geo";
import { feature } from 'topojson-client'
import Buses from './Buses';

class Route extends Component {
    constructor() {
        super()
        this.state = {
          paths: [],
          color: "#0d4eea",
          strokeWidth: 5,
          size: "20px"
        }

		this.loadRoutes = this.loadRoutes.bind(this);
		this.createProjection = this.createProjection.bind(this);
		this.createPath = this.createPath.bind(this);
		this.getRouteConfig = this.getRouteConfig.bind(this);
    }

	componentDidMount() {
		this.loadRoutes();
	}

	createProjection() {
		return geoMercator()
			.center([-122.433701, 37.767683])
			.scale(600000)
			.translate([ 1200 / 2, 1100 / 2 ])
	}

	createPath() {
		return geoPath().projection(this.createProjection());
	}


	getRouteConfig(routeTag) {
		return (`http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=sf-muni&r=${routeTag}`);
	}

	loadRoutes() {
		get(this.getRouteConfig(this.props.routeTag))
		.then(res => {
			if (res.status !== 200) return

			const stops =  res.data.route.stop;
			const color = res.data.route.color;
			const busRouteStops = _.map(stops, stop => this.createStop(stop))
			this.setState({ paths: busRouteStops, color: `#${color}` })
		})
	}

    createStop = (stop) => {
        const stopObject = {
            type:"Point",
            properties:{title:stop.title},
            coordinates:[stop.lon/1, stop.lat/1, 0]
        }
        return feature({type: "Topology", objects: stopObject}, stopObject);
    }

    render() {
        return(
            <g className="paths">
			{
                this.state.paths.map((d,i) => (
					<path
						key={ `path-${ i }` }
						d={ this.createPath()(d) }
						className="paths"
						fill={this.state.color}
						stroke={this.state.color}
						strokeWidth={5}
		            />
                )
            	)
            }
			<Buses
				routeTag={this.props.routeTag}
				color={this.state.color}
			/>
            </g>

        )
    }
}

export default Route;