import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Container from "react-bootstrap/Container";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

const Footer = () => {
  const location = useLocation();
  const { pathname } = location;
  const { user } = useContext(UserContext);
  return (
    <footer className="bg-gray-400">
      {user &&
        user.auth &&
        !(pathname === "/login" || pathname === "/register") && (
          <Container className="py-4 flex flex-row">
            <div className="mr-[100px]">
              <p className="text-[36px] mb-0 mr-[100px] font-semibold">
                2P-Fashion
              </p>
            </div>
            <div>
              <h4>FOLLOW US</h4>
              <div className="flex-row flex gap-3 justify-center items-center">
                <FaFacebookSquare className="text-[33px]" />
                <AiFillInstagram className="text-[36px]" />
              </div>
            </div>
            <div className="mx-[100px]">
              <h4>ABOUT US</h4>
              <div>
                <p>Giới thiệu</p>
                <p>Hướng dẫn mua hàng</p>
                <p>Chính sách đổi trả hàng</p>
                <p>Chính sách thanh toán</p>
                <p>Điều khoản sử dụng</p>
                <p>Website</p>
                <p>Bảo mật thông tin KH</p>
              </div>
            </div>
            <div>
              <h4>CONTACT US</h4>
              <div className="flex flex-col">
                <p className="flex flex-row items-center">
                  <FaMapMarkerAlt className="mr-3"/> Store I: 445 Sư Vạn Hạnh, P.12, Q.10.
                </p>
                <p className="flex flex-row items-center">
                  <FaMapMarkerAlt className="mr-3"/> Store II: 48 Trần Quang Diệu, P.14, Q.3.
                </p>
              
                <p className="flex flex-row items-center"><BsFillTelephoneFill className="mr-3"/> 0978788888</p>
              </div>
            </div>
          </Container>
        )}
    </footer>
  );
};

export default Footer;
