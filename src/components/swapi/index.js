/**
 * @flow
 * @author aferyannie@gmail.com
 * @since 7 December 2018
 */

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Particle from 'react-particles-js';

import dataSetting from '../../libs/particlesjs-config.json';
import { setPerson } from '../../actions';
import BodyText from '../../commons/BodyText';

type Props = {
  setPerson: Function
};

type State = {
  people: Array<any>,
  currentpage: number
};

class Swapi extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      currentpage: 1
    };
  }

  async componentDidMount() {
    // Call swapi using axios.
    const res = await axios.get('https://swapi.co/api/people/');
    this.setState({
      people: res.data.results // Set results to the state.
    });
  }

  /* Create function nextpage handler. */
  async nextpage() {
    if (this.state.currentpage === 9) alert('Currently on the last page.');
    else {
      await this.setState({ currentpage: this.state.currentpage + 1 });
      const res = await axios.get(
        'https://swapi.co/api/people/?page=' + this.state.currentpage
      );
      this.setState({
        people: res.data.results // Set results to the state.
      });
    }
  }

  /* Create function previouspage handler. */
  async previouspage() {
    if (this.state.currentpage === 1) alert('Currently on the first page.');
    else {
      await this.setState({ currentpage: this.state.currentpage - 1 });
      const res = await axios.get(
        'https://swapi.co/api/people/?page=' + this.state.currentpage
      );
      this.setState({
        people: res.data.results // Set results to the state.
      });
    }
  }

  render() {
    return (
      <Wrapper>
        <Particle className='particle' params={dataSetting} />
        {/* Navigation Bar */}
        <Navbar>
          <Navbtn onClick={this.previouspage}>Previous</Navbtn>{' '}
          {/* Button to the previous page. */}
          <Navbtn disabled={true}>{this.state.currentpage}</Navbtn>{' '}
          {/* DisabledButton to display current page. */}
          <Navbtn onClick={this.nextpage}>Next</Navbtn>{' '}
          {/* Button to the next page. */}
        </Navbar>
        {/* Header Page */}
        <Heading1>WELCOME TO SWAPIL</Heading1>
        <Heading2>May the force be with you.</Heading2>
        {/* Body Page */}
        <BodyText>
          {this.state.people.map((person, index) => (
            // Set link to about page.
            <StyledLink
              to='/about'
              key={index}
              onClick={() => {
                this.props.setPerson(person);
              }}
            >
              <p>
                {person.name} <br />
              </p>
            </StyledLink>
          ))}
        </BodyText>
        {/* Footer Page */}
        <Footer>
          <p>Page {this.state.currentpage}</p>
        </Footer>
      </Wrapper>
    );
  }
}

export default connect(null, { setPerson })(Swapi);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: black;
  background-size: cover;
  * {
    box-sizing: border-box;
  }

  .blur {
    -webkit-filter: blur(5px);
    -o-filter: blur(5px);
    filter: blur(5px);
    filter: progid: DXImageTransform.Microsoft.Blur(PixelRadius='5');
  }

  .particle {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0.3;
  }
`;

const Navbar = styled.div`
  overflow: hidden;
  text-align: center;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  margin: auto;
`;

const Navbtn = styled.button`
	background-color: inherit;
	position: relative;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 14px 16px;
	transition: 0.3s;
	font-size: 17px;

	:hover {
		background-color: #ddd;
	} 
	
	:active {
		background-color: #ccc;
`;

const Heading1 = styled.h1`
  color: goldenrod;
  text-align: center;
  font-family: Overlock;
`;

const Heading2 = styled.h5`
  color: whitesmoke;
  text-align: center;
  font-family: Pangolin;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:focus,
  &:hover {
    color: yellow;
  }
`;

const Footer = styled.div`
  color: whitesmoke;
  text-align: center;
  font-family: Pangolin;
  font-size: 9pt;
  padding: 25pt;
`;
