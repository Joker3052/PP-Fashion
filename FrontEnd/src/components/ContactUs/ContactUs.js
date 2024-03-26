import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { PostCreate } from '../../Services/FeedbackService';
import contact_us from '../../assets/images/contactUs.jpg';
import { UserContext } from '../../context/UserContext';

function ContactUs() {
    const {  user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await PostCreate(email, phoneNumber, name, message);

      if (res && res.data) {
        setName("");
        setEmail(user.email);
        setPhoneNumber("");
        setMessage("");
        toast.success("Message sent. We will contact you soon.");
      } else {
        toast.error("Error!");
      }
    } catch (error) {
      toast.error("Error!");
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (user && user.auth ) {
        setName(user.username);
        setEmail(user.email);
        setPhoneNumber(user.phone);

    }
  }, [])


  return (
    <>
      <div className="relative"> 
        <img src={contact_us} alt="" />
        <p className="absolute bottom-[70px] left-[63px] text-white text-[48px] leading-[48px]">CONTACT US</p>
      </div>

      <Container className="my-[100px]">
        <Row className="gap-4">
          <Col xs={8}>
            <Form onSubmit={handleSubmit}>
              <h2 className="font-bold text-[36px] leading-[48px]">
                We would love to hear from you.
              </h2>
              <p className="text-[16px] text-zinc-500 my-[35px]">
                If you have any query or any type of suggestion, you can
                contact us here. We would love to hear from you.
              </p>
              <Form.Group className="mb-3" controlId="name">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Form.Label className="text-[16px] font-medium">
                      Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <Form.Label className="text-[16px] font-medium">
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      required
                      value={email}
                      readOnly
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="phoneNumber">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Form.Label className="text-[16px] font-medium">
                      Phone Number
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="message">
                <Form.Label className="text-[16px] font-medium">
                  Message
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>
              <Button className="rounded-0" variant="primary" type="submit">
                <p className="text-[16px] m-0 p-1">SEND MESSAGE</p>
              </Button>
            </Form>
          </Col>
          <Col>
            <div className="mb-[50px]">
              <h3 className="text-[24px] font-bold leading-[48px]">
                Visit Us
              </h3>
              <p className="m-0 text-[16px]">UET Lahore, Punjab, Pakistan</p>
              <p className="m-0 text-[16px]">Phone: +923039898987</p>
            </div>
            <div>
              <h3 className="text-[24px] font-bold leading-[48px]">
                Get In Touch
              </h3>
              <p className="m-0 text-[16px]">
                You can get in touch with us on this provided email.
              </p>
              <p className="m-0 text-[16px]">hmjawad087@gmail.com</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ContactUs;
