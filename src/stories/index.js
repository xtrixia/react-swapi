import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import Header from "../commons/Header";
import BodyText from "../commons/BodyText";
import styled from "styled-components";

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

class Buttons extends Component {
  state = {
    currentpage: 1
  };

  render() {
    return (
      <Navbar>
        <Navbtn>Previous</Navbtn>
        <Navbtn disabled={true}>{this.state.currentpage}</Navbtn>
        <Navbtn>Next</Navbtn>
      </Navbar>
    );
  }
}

storiesOf("Buttons", module).add("Pages ReadOnly", () => (
  <div>
    <Buttons />
  </div>
));
storiesOf("Components", module)
  .add("All", () => (
    <div>
      <Header style={{ color: "white", fontFamily: "Geneva" }}>
        This is Header
      </Header>
      <BodyText style={{ color: "black", margin: 15 }}>
        This is BodyText
      </BodyText>
    </div>
  ))
  .add("Header", () => (
    <Header style={{ color: "white", fontFamily: "Geneva" }}>
      This is Header
    </Header>
  ))
  .add("BodyText", () => (
    <BodyText style={{ color: "black", margin: 15 }}>This is BodyText</BodyText>
  ));
