import React, { Component } from "react";
import axios from "axios";

class Swapi extends Component {
	constructor(props) {
		super(props);
		this.state = {
			people: [],
			currentpage: 1,
			index: 1,
			about: [],
			url: '',
		}
		this.previouspage = this.previouspage.bind(this);
		this.nextpage = this.nextpage.bind(this);
		this.aboutperson = this.aboutperson.bind(this);
	}

	async componentDindexMount() {
		const res = await axios.get("https://swapi.co/api/people/")
		this.setState({ 
			people: res.data.results 
		});
	}

	/* Create function nextpage handler. */
	async nextpage() {
		if (this.state.currentpage === 9) alert('Currently on the last page.');
		else {
			await this.setState({ currentpage: this.state.currentpage + 1 })
			const res = await axios.get('https://swapi.co/api/people/?page=' + this.state.currentpage);
				this.setState({ 
					people: res.data.results, 
					index: this.state.index + 10
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
					people: res.data.results, 
					index: this.state.index - 10, 
				});
		}
	}
	
	/* Create function aboutperson handler. */
	async aboutperson(event) {
		const id = event.target.getAttribute('data-key');
		const res = await axios.get('https://swapi.co/api/people/?page=' + this.state.currentpage);
			this.setState({
				url: res.data.results[id].url
			});
			const result = await axios.get(this.state.url);
				if(result.status === 200){
					this.setState({
						about: result.data,
					});
					console.log(this.state.about);
				}
	}

	render() {
		return (
			<div className="container">
				{/* Navigation Bar */}
				<div className="navbar">
					<button onClick={this.previouspage}>Previous</button>
					<button disabled={true}>{this.state.currentpage}</button>
					<button onClick={this.nextpage}>Next</button>
				</div>
				{/* Header Page */}
				<div className="header">
					<h1>WELCOME TO SWAPIL</h1>
					<h5>May the force be with you.</h5>
				</div>
				{/* Body Page */}
				<div className="body">
					{this.state.people.map((person, index) =>
						// <p 
						// 	key={index = index + this.state.index}
						<p 
							key={index}
							onClick={this.aboutperson} 
							data-key={index}> 
								{person.name} <br></br>
								{person.url} <br></br>
						</p>
					)}
				</div>
				{/* Footer Page */}
				<div className="footer">
					<p>Page {this.state.currentpage}</p>
				</div>
			</div>
		);
	}
}

export default Swapi;
