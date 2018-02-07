/*
* Utility function to filter unwanted data from GeoJSON file
*
*/

export const filterMapData = (features) => {
	return features.map(feature => {
		return {
			type:feature.type,
			geometry: {
				...feature.geometry
			}
		}
	})
}
