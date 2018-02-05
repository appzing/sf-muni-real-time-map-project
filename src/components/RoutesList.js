import React, { Component } from 'react';
import Checkbox from './Checkbox';



class RoutesList extends Component {

	render() {
		return (
			<div className="routes-list"> {
                    this.props.routesList.map((route,i) => (
                        <Checkbox key={`checkbox-${route.tag}`}
                            tag={route.tag}
                            title={route.title}
                            updateRoute={this.props.updateRoute}
                            selectedRoutes={this.props.selectedRoutes}
                        />))
                }
            </div>
		);
	}
}

export default RoutesList
