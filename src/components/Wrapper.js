import _ from 'underscore';
import React, { Component } from 'react';
import {get} from 'axios';
import SFMuniMap from './SFMuniMap';
import RoutesList from './RoutesList';

const routesUrl = 'http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni';
class Wrapper extends Component {
	constructor() {
		super()
		this.state = {
			routesList: [],
			selectedRoutes: []
		};

		this.handleSelectedRoutesChange = this.handleSelectedRoutesChange.bind(this);
		this.getSelectedRoutes = this.getSelectedRoutes.bind(this);
		this.updateRoute = this.updateRoute.bind(this);
	}

	handleSelectedRoutesChange(e) {
		console.log(e);
		const selectedRoutes = _.difference(this.state.selectedRoutes, e);
		this.setState({selectedRoutes});
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

	componentDidMount() {
		
		this.loadRoutesList();
		const selectedRoutes = this.getSelectedRoutes();
		this.setState({selectedRoutes});
	}


	render() {
		return (
			<div className="row">
				<div className="col">
					  <RoutesList
						  routesList={this.state.routesList}
						  selectedRoutes={this.state.selectedRoutes}
						  onSelectedRoutesChange={this.handleSelectedRoutesChange}
						  updateRoute={this.updateRoute}
				  		/>
				</div>
				<div className="col">
					  <SFMuniMap selectedRoutes={this.state.selectedRoutes}/>
				</div>
			</div>
		);
	}
}

export default Wrapper;
