/*
* This component to select each individual route
*
*/

import React, { Component } from 'react'

class Checkbox extends Component {
    constructor(props){
        super(props)
        this.state = {
            isActive: false
        }
    }

    componentDidMount(){
        if(this.props.selectedRoutes){
            this.updateSelected(this.props.selectedRoutes)
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.currentRoutes !== this.props.currentRoutes) {
            this.updateSelected(nextProps.currentRoutes)
        }
    }

    updateSelected = (selectedRoutes) => {
        if(selectedRoutes.indexOf(this.props.tag)>-1){
            this.setState({
                isActive: true
            })
        } else {
            this.setState({
                isActive: false
            })
        }
    }

    toggleClick= () => {
        this.setState({
            isActive: !this.state.isActive
        })

		if(this.props.updateRoute) {
			this.props.updateRoute(this.props.tag);
		}

    }

    render() {
        return(
            <span className={"input input--checkbox input--routes input--routes-"+this.props.tag}>
                <input type="checkbox" checked={ this.state.isActive } id={this.props.tag} onClick={this.toggleClick}/>
                <label htmlFor={this.props.tag}>{ this.props.title } </label>
            </span>
        )
    }
}

export default Checkbox;
