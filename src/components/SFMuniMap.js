
import React, { Component } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { get } from "axios";
import Route from './Route';


class SFMuniMap extends Component {
	constructor() {
		super()
		this.state = {
			neighborhoodData: [],
			streetsData:[],
			arteriesData:[],
			freewaysData:[]
		}
	}

	projection() {
		return geoMercator()
			.center([-122.433701, 37.767683])
			.scale(600000)
			.translate([ 1200 / 2, 1100 / 2 ])
	}

	reduceSize(features) {
		return features.map(feature => {
			return {
				type:feature.type,
				geometry: {
					...feature.geometry
				}
			}
		})
	}

	loadNeighborhoods() {
		get("/assets/sfmaps/neighborhoods.json")
			.then(response => {
				if (response.status !== 200) {
					console.log(`There was a problem: ${response.status}`)
					return
				}
				const neighborhoodData = response.data.features;
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
				const streetsData = this.reduceSize(response.data.features);
				console.log(this.reduceSize(response.data.features));
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
				const arteriesData = this.reduceSize(response.data.features);
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
				const freewaysData = this.reduceSize(response.data.features);
				this.setState({freewaysData});
			})
	}

	componentDidMount() {
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
							d={ geoPath().projection(this.projection())(d) }
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
							d={ geoPath().projection(this.projection())(d) }
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
							d={ geoPath().projection(this.projection())(d) }
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
							d={ geoPath().projection(this.projection())(d) }
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
