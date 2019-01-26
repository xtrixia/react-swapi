/**
 * @author aferyannie@gmail.com
 * @since 8 December 2019
 */

import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import Header from "../../commons/Header";
import Body from "../../commons/BodyText";

const Navbar = styled.div`
  overflow: hidden;
  text-align: center;
  background-color: #f1f1f1;
  margin: auto;
  position: relative;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
`;

const BodyText = styled(Body)`
  cursor: not-allowed;
`;

const Heading1 = styled.h1`
  color: goldenrod;
  text-align: center;
  font-family: Geneva;
`;

const Heading2 = styled.h5`
  color: whitesmoke;
  text-align: center;
  font-family: Tahoma;
`;

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: "",
      films: []
    };
  }

  async componentDidMount() {
    const res = await axios.get(this.props.person.homeworld);
    this.setState({
      place: res.data.name
    });

    let resFilm = [];
    this.props.person.films.map(async film => {
      const getfilms = await axios.get(film); // Call url film using axios.
      resFilm.push(getfilms.data.title); // Push result to the resFilm.
      this.setState({
        films: resFilm // Set result to the state.
      });
    });
  }

  render() {
    const {
      name,
      gender,
      birth_year,
      height,
      mass,
      hair_color,
      skin_color,
      eye_color
    } = this.props.person; // Create variable to make it easier to call.
    return (
      <Fragment>
        {/* Navigation Bar */}
        <Navbar>
          <Link className="homepage" to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>{" "}
          {/* Link to the homepage. */}
        </Navbar>
        {/* Header Page */}
        <Header>
          <Heading1>WELCOME TO SWAPIL</Heading1>
          <Heading2>May the force be with you.</Heading2>
        </Header>
        {/* Body Page */}
        <BodyText>
          <h2>
            <i>{name}</i>
          </h2>
          {gender} <br />
          {this.state.place} <br />
          {birth_year} <br />
          {height + " cm"} <br />
          {mass + " kg"} <br />
          <h4>- On Film -</h4>
          {this.state.films.map((result, index) => (
            <BodyText key={index}>
              {result} <br />
            </BodyText>
          ))}
          <h4>- Appeareance -</h4>
          Hair:
          {" " + hair_color} <br />
          Skin:
          {" " + skin_color} <br />
          Eye:
          {" " + eye_color} <br />
        </BodyText>
      </Fragment>
    );
  }
}

/* Create function handle state2props. */
function mapStateToProps(state) {
  return { person: state };
}

export default connect(
  mapStateToProps,
  null
)(About);
