/**
 * @author aferyannie@gmail.com
 * @since 6 March 2019
 */

import React, { Component } from "react";
import styled from "styled-components";
import Particle from "react-particles-js";

import dataSetting from "../../libs/particlesjs-config.json";
import BodyText from "../../commons/BodyText";

class Films extends Component {
  render() {
    return (
      <Wrapper>
        <Particle className="particle" params={dataSetting} />
        <div>
          <BodyText>
            {this.props.hair} Hair <br />
            <br />
            {this.props.skin} Skin <br />
            <br />
            {this.props.eye} Eyes <br />
          </BodyText>
        </div>
      </Wrapper>
    );
  }
}

export default Films;

const Wrapper = styled.div`
  margin-top: 20px;
`;
