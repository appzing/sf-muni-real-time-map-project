/*
* This component renders the list of bus routes in the sidebar
*
*/

import React from 'react';
import Checkbox from './Checkbox';



const RoutesList = (props) => (
	<div className="routes-list"> {
            props.routesList.map((route,i) => (
                <Checkbox key={`checkbox-${route.tag}`}
                    tag={route.tag}
                    title={route.title}
                    updateRoute={props.updateRoute}
                    selectedRoutes={props.selectedRoutes}
					routesList={props.routesList}
                />))
        }
    </div>
);

export default RoutesList
