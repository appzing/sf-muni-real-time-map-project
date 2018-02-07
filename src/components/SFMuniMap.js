/*
* This component draws the map and renders the different bus routes on the map
*
*/
import React, { Component } from "react";
import { createPath } from '../utils/createPath';
import { filterMapData } from '../utils/filterMapData';
import { get } from "axios";
import Route from './Route';


class SFMuniMap extends Component {

	constructor(props) {

		super(props)

		this.state = {
			neighborhoodData: [],
			streetsData:[],
			arteriesData:[],
			freewaysData:[]
		}
	}

	loadNeighborhoods() {
		get("/assets/sfmaps/neighborhoods.json")
			.then(response => {
				if (response.status !== 200) {
					console.log(`There was a problem: ${response.status}`)
					return
				}
				const neighborhoodData = filterMapData(response.data.features);
				this.setState({neighborhoodData});
			})
	}

	loadStreets() {
		get("/assets/sfmaps/streets.json")
			.then(response => {
				if (response.status !== 200) {
					console.log(`There was a problem: ${response.status}`)
					return
				}
				const streetsData = filterMapData(response.data.features);
				this.setState({streetsData});
			})
	}

	loadArteries() {
		get("/assets/sfmaps/arteries.json")
			.then(response => {
				if (response.status !== 200) {
					console.log(`There was a problem: ${response.status}`)
					return
				}
				const arteriesData = filterMapData(response.data.features);
				this.setState({arteriesData});
			})
	}

	loadFreeways() {
		get("/assets/sfmaps/freeways.json")
			.then(response => {
				if (response.status !== 200) {
					console.log(`There was a problem: ${response.status}`)
					return
				}
				const freewaysData = filterMapData(response.data.features);
				this.setState({freewaysData});
			})
	}

	componentWillMount() {
		this.loadStreets();
		this.loadNeighborhoods();
		this.loadArteries();
		this.loadFreeways();

	}

	render() {
		return (
		  <svg width={ 1200 } height={ 1100 } viewBox="0 0 1200 1100">
			<g className="streets">
				{
					this.state.streetsData.map((d,i) => (
						<path
							key={ `path-${ i }` }
							d={ createPath()(d) }
							className="streets"
							fill={ `rgba(255,255,255,${1 / this.state.streetsData.length * i})` }
							stroke="#38414e"
							strokeWidth={ 1 }
						/>
					))
				}
			</g>
			<g className="neighborhoods">
				{
					this.state.neighborhoodData.map((d,i) => (
						<path
							key={ `path-${ i }` }
							d={ createPath()(d) }
							className="neighborhoods"
							fill={ `rgba(232,232,232,${1 / this.state.neighborhoodData.length * i})` }
							stroke="#e8e8e8"
							strokeWidth={ 1 }
						/>
					))
				}
			</g>
			<g className="arteries">
				{
					this.state.arteriesData.map((d,i) => (
						<path
							key={ `path-${ i }` }
							d={ createPath()(d) }
							className="arteries"
							fill={ `rgba(255,255,255,${1 / this.state.arteriesData.length * i})` }
							stroke="#FFFFFF"
							strokeWidth={ 2 }
						/>
					))
				}
			</g>
			<g className="freeways">
				{
					this.state.freewaysData.map((d,i) => (
						<path
							key={ `path-${ i }` }
							d={ createPath()(d) }
							className="freeways"
							fill={ `rgba(255,238,156,${1 / this.state.freewaysData.length * i})` }
							stroke="#FFEE9C"
							strokeWidth={ 2 }
						/>
					))
				}
			</g>
			{ this.props.selectedRoutes.map(routeTag =>
				<Route
					key={routeTag}
					routeTag={routeTag}
				/>
				)
			}
		  </svg>
		)
	}
}

export default SFMuniMap
