import React, { Component } from 'react';
import { geoMercator, geoPath } from "d3-geo";

class Bus extends Component {

	constructor() {
		super()

		this.createProjection = this.createProjection.bind(this);
		this.createPath = this.createPath.bind(this);
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

	render() {
		return (
			<g transform={`translate(${this.createPath().centroid(this.props.d)})`}>
				<svg viewBox="0 0 100 100" width={300} height={300}>
					<path
						fill={this.props.color}
						d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218"
						strokeWidth={20}
					/>
				</svg>
			</g>
		)
	}
}


export default Bus;
