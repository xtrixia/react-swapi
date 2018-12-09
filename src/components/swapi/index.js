/**
 * @author aferyannie@gmail.com
 * @since 7 December 2019
 */

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setPerson } from "../../actions";

class Swapi extends Component {
	constructor(props) {
		super(props);
		this.state = {
			people: [],
			currentpage: 1,
		}
		this.previouspage = this.previouspage.bind(this); // Set binding to previouspage function.
		this.nextpage = this.nextpage.bind(this); // Set binding to nextpage function.
	}

	async componentDidMount() {
		// Call swapi using axios.
		const res = await axios.get("https://swapi.co/api/people/")
		this.setState({ 
			people: res.data.results, // Set results to the state.
		});
	}

	/* Create function nextpage handler. */
	async nextpage() {
		if (this.state.currentpage === 9) alert('Currently on the last page.');
		else {
			await this.setState({ currentpage: this.state.currentpage + 1 })
			const res = await axios.get('https://swapi.co/api/people/?page=' + this.state.currentpage);
				this.setState({ 
					people: res.data.results, // Set results to the state.
				});
		}
	}

	/* Create function previouspage handler. */
	async previouspage() {
		if (this.state.currentpage === 1) alert('Currently on the first page.');
		else {
			await this.setState({ currentpage: this.state.currentpage - 1 })
			const res = await axios.get('https://swapi.co/api/people/?page=' + this.state.currentpage);
				this.setState({ 
					people: res.data.results, // Set results to the state.
				});
		}
	}

	render() {
		return (
			<div className="container">
				{/* Navigation Bar */}
				<div className="navbar">
					<button onClick={ this.previouspage }>Previous</button> {/* Button to the previous page. */}
					<button disabled={true}>{ this.state.currentpage }</button> {/* DisabledButton to display current page. */}
					<button onClick={ this.nextpage }>Next</button> {/* Button to the next page. */}
				</div>
				{/* Header Page */}
				<div className="header">
					<h1>WELCOME TO SWAPIL</h1>
					<h5>May the force be with you.</h5>
				</div>
				{/* Body Page */}
				<div className="body">
					{ this.state.people.map((person, index) =>
						// Set link to about page.
						<Link 
							className="bodytext" 
							to="/about" 
							key={index} 
							onClick={() => { this.props.setPerson(person) }}>
								<p>
									{person.name} <br></br>
								</p>
						</Link>
					)}
				</div>
				{/* Footer Page */}
				<div className="footer">
					<p>Page { this.state.currentpage }</p>
				</div>
			</div>
		);
	}
}

export default connect(null, { setPerson })(Swapi);
