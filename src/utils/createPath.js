/*
* Utility function to create projection and path
*
*/
import { geoMercator, geoPath } from "d3-geo";

export const createProjection = () => {
	return geoMercator()
		.center([-122.433701, 37.767683])
		.scale(600000)
		.translate([ 1200 / 2, 1100 / 2 ])
};

export const createPath = () => geoPath().projection(createProjection());
