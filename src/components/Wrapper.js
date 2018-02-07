/*
* Main component to show map and sidebar
*
*/
import React, { Component } from 'react';
import {get} from 'axios';
import SFMuniMap from './SFMuniMap';
import RoutesList from './RoutesList';

const routesUrl = 'http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni';

class Wrapper extends Component {
	constructor(props) {
		super(props)
		this.state = {
			routesList: [],
			selectedRoutes: []
		};

		this.getSelectedRoutes = this.getSelectedRoutes.bind(this);
		this.updateRoute = this.updateRoute.bind(this);
	}

	loadRoutesList() {
		get(routesUrl)
			.then(response => {
				if (response.status !== 200) {
					console.log(`There was a problem: ${response.status}`)
					return
				}
				const routesList = response.data.route;
				this.setState({routesList});
			})
	}

	getSelectedRoutes() {
		if (this.state && this.state.selectedRoutes) {
			return this.state.selectedRoutes;
		}

		return [];

	}

	updateRoute(routeTag) {

		let selectedRoutes = this.state.selectedRoutes;
		const selected = selectedRoutes.indexOf(routeTag);

		if(selected > -1) {

			const index = selectedRoutes.findIndex((value) => {
				return value === routeTag;
			});

			selectedRoutes.splice(index, 1);

		} else {
			selectedRoutes.push(routeTag);
		}


		this.setState({selectedRoutes});

	}

	componentWillMount() {
		this.loadRoutesList();
	}


	componentDidMount() {
		let selectedRoutes = this.getSelectedRoutes();
		this.setState({selectedRoutes});
	}


	render() {
		return (
			<div className="row">
				<div className="col-3">
					<div className="sidebar">
						<header className="App.header sidebar__header">
							<h1 className="App.title sidebar__text"> Select Route</h1>
						</header>
						<RoutesList
						  routesList={this.state.routesList}
						  selectedRoutes={this.state.selectedRoutes}
						  updateRoute={this.updateRoute}
						  selectFirstTenRoutes={this.selectFirstTenRoutes}
				  		/>
					</div>
				</div>
				<div className="col-8 mapContainer">
					<header className="App.header mapContainer__header">
						<h1 className="App.title mapContainer__text"> SF Muni Realtime Map</h1>
					</header>
					<SFMuniMap selectedRoutes={this.state.selectedRoutes}/>
				</div>
			</div>
		);
	}
}

export default Wrapper;
