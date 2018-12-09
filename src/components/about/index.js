/**
 * @author aferyannie@gmail.com
 * @since 8 December 2019
 */

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			place: '',
			films: [],
		}
	}

	async componentDidMount() {
		const res = await axios.get(this.props.person.homeworld);
		this.setState({
			place: res.data.name,
		});

		let resFilm = [];
		this.props.person.films.map(async (film) => {
			const getfilms = await axios.get(film); // Call url film using axios.
			resFilm.push(getfilms.data.title); // Push result to the resFilm.
			this.setState({
				films: resFilm, // Set result to the state.
			})
		});
	}

	render() {
		const { name, gender, birth_year, height, mass, 
			hair_color, skin_color, eye_color } = this.props.person; // Create variable to make it easier to call.
		return (
			<div className="container">
				{/* Navigation Bar */}
				<div className="navbar">
					<Link className="homepage" to="/">Home</Link> {/* Link to the homepage. */}
				</div>
				{/* Header Page */}
				<div className="header">
					<h1>WELCOME TO SWAPIL</h1>
					<h5>May the force be with you.</h5>
				</div>
				{/* Body Page */}
				<div className="body">
					<h2><i>{ name }</i></h2>
					{ gender } <br></br>
					{ this.state.place } <br></br>
					{ birth_year } <br></br>
					{ height + ' cm' } <br></br>
					{ mass + ' kg' } <br></br>

					<h4>- On Film -</h4>
					{ this.state.films.map((result, index) =>
						<div key={index}>
							{ result } <br></br>
						</div>
					)}

					<h4>- Appeareance -</h4>
					Hair:
					{' ' + hair_color} <br></br>
					Skin:
					{' ' + skin_color} <br></br>
					Eye:
					{' ' + eye_color} <br></br>
				</div>
			</div>
		);
	}
}


/* Create function handle state2props. */
function mapStateToProps(state) {
	return { person: state };
}

export default connect(mapStateToProps, null)(About);
