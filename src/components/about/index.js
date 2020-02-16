/**
 * @flow
 * @author aferyannie@gmail.com
 * @since 8 December 2018
 */

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Particle from 'react-particles-js';

import dataSetting from '../../libs/particlesjs-config.json';
import BodyText from '../../commons/BodyText';
import Films from '../helpers/films';
import Appeareance from '../helpers/appeareance';

type Props = {
  person: any
};

type State = {
  place: string,
  films: Array<any>,
  click1: boolean,
  click2: boolean
};

class About extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      place: '',
      films: [],
      click1: false,
      click2: false
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

  cek1 = () => {
    this.setState({
      click1: !this.state.click1
    });
  };

  cek2 = () => {
    this.setState({
      click2: !this.state.click2
    });
  };

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
      <Wrapper>
        <Particle className='particle' params={dataSetting} />
        {/* Navigation Bar */}
        <Navbar>
          <Link className='homepage' to='/' style={{ textDecoration: 'none' }}>
            Home
          </Link>{' '}
          {/* Link to the homepage. */}
        </Navbar>
        {/* Header Page */}
        <Heading1>WELCOME TO SWAPIL</Heading1>
        <Heading2>May the force be with you.</Heading2>
        {/* Body Page */}
        <BodyText>
          <h2>
            <i>{name}</i>
          </h2>
          {gender} <br />
          {this.state.place} <br />
          {birth_year} <br />
          {height + ' cm'} <br />
          {mass + ' kg'} <br />
          <button
            onClick={this.cek1}
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              marginTop: 30,
              border: 'none'
            }}
          >
            <h4 style={{ color: 'yellow' }}>Films</h4>
            {this.state.click1 ? <Films film={this.state.films} /> : null}
          </button>
          <button
            onClick={this.cek2}
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              marginLeft: 20,
              paddingLeft: 15,
              paddingRight: 15,
              border: 'none'
            }}
          >
            <h4 style={{ color: 'yellow' }}>Appeareance</h4>
            {this.state.click2 ? (
              <Appeareance
                hair={hair_color}
                skin={skin_color}
                eye={eye_color}
              />
            ) : null}
          </button>
        </BodyText>
      </Wrapper>
    );
  }
}

/* Create function handle state2props. */
function mapStateToProps(state) {
  return { person: state };
}

export default connect(mapStateToProps, null)(About);

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
