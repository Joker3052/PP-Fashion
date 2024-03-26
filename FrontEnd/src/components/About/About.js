import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./About.scss";
import { Link } from "react-router-dom";
import img_about from "../../assets/images/about.jpg";
import img_men from "../../assets/images/men.png";
import img_women from "../../assets/images/women.png";
import phuong from "../../assets/images/phuong.jpg";
import phi from "../../assets/images/phi.jpg";

function About() {
  return (
    <>
      <div className="relative">
        <img src={img_about} alt="" />
        <p className="absolute bottom-[70px] left-[63px] text-white text-[48px] leading-[48px]">
          ABOUT <span className="italic">2P-FASHION</span>{" "}
        </p>
      </div>
      <Container className="my-[60px]">
        <Row>
          <Col as={Link} to="/store" className="relative">
            <div className="image-container">
              <img className="w-[600px] h-[600px]" src={img_women} />
            </div>
            <button className="absolute left-1/2 transform -translate-x-1/2 bottom-[30px] bg-white rounded-[26px]">
              <p className="text-[30px] text-blue-800 px-4 py-1 m-0">BUY NOW</p>
            </button>
          </Col>
          <Col as={Link} to="/store" className="relative">
            <div className="image-container">
              <img className="w-[600px] h-[600px]" src={img_men} />
            </div>
            <button className="absolute left-1/2 transform -translate-x-1/2 bottom-[30px] bg-white rounded-[26px]">
              <p className="text-[30px] text-blue-800 px-4 py-1 m-0">BUY NOW</p>
            </button>
          </Col>
        </Row>
      </Container>
      <h2 className="text-center">The Founders</h2>
    </>
  );
}

export default About;
