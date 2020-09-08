import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import Nav from "./nav";
import MobileMenu from "./menu";

const Header = ({ state }) => {
  return (
    <>
      <Container>
        <StyledLink link="/">
          <Title>{state.frontity.title}</Title>
        </StyledLink>
        <Description>{state.frontity.description}</Description>
        <MobileMenu />
      </Container>
      <Nav />
    </>
  );
};

export default connect(Header);

const Container = styled.div`
  width: 100%;
  background-color: #8ccbfc;
  max-width: 100%;
  box-sizing: border-box;

  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.h2`
margin: 0;
margin-bottom: 16px;
color: black;
float: left;
display: none;

  @media only screen and (max-width: 749px) {
    margin: 25px;
    margin-bottom: 16px;
    color: black;
    float: left;
        display: inline;
        justify-content: center;
      }
    }
`;

const Description = styled.h4`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  display: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
