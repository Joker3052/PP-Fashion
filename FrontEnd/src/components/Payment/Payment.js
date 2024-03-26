import React, { useContext, useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { PostCreate } from "../../Services/CustomerService";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { PutUpdate } from "../../Services/DashboardService";
import { FetchAll } from "../../Services/DashboardService";
import Form from "react-bootstrap/Form";

function Payment() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [listCustomers, setListCustomers] = useState([]);
  const [e_mail, set_e_mail] = useState("");
  const [p_phone, set_p_hone] = useState("");
  const [name, setName] = useState("");
  const [m_ess, set_m_ess] = useState("");
  const [a_ddress, set_a_ddress] = useState("");
  const [men_price, set_men_price] = useState("");
  const [women_price, set_women_price] = useState("");
  const [men_product, set_men_product] = useState("");
  const [women_product, set_women_product] = useState("");
  const [label, set_label] = useState("");
  const { cart } = useCart();
  const totalPrice = cart.reduce(
    (total, item) => total + item.price_value * item.quantity,
    0
  );
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const menPrice = cart
    .filter((item) => item.type_name === "men")
    .reduce((total, item) => total + item.price_value * item.quantity, 0);
  const womenPrice = cart
    .filter((item) => item.type_name === "women")
    .reduce((total, item) => total + item.price_value * item.quantity, 0);
  const menQuantity = cart
    .filter((item) => item.type_name === "men")
    .reduce((total, item) => total + item.quantity, 0);
  const womenQuantity = cart
    .filter((item) => item.type_name === "women")
    .reduce((total, item) => total + item.quantity, 0);

  const generateMessage = (cart) => {
    let message = "Order Summary:\n";
    cart.forEach((item) => {
      message += `${item.image_name} - Quantity: ${item.quantity} - Price: $${
        item.price_value * item.quantity
      }\n`;
    });
    message += `\nmen Quantity: ${menQuantity}\n`;
    message += `\nwomen Quantity: ${womenQuantity}\n`;
    message += `\nmen Price: ${menPrice}\n`;
    message += `\nwomen Price: ${womenPrice}\n`;
    message += `\nTotal Quantity: ${totalQuantity}\n`;
    message += `Total Price: $${totalPrice.toFixed(2)}`;
    return message;
  };

  useEffect(() => {
    if (user && user.auth) {
      setName(user.username);
      set_e_mail(user.email);
      set_p_hone(user.phone);
      set_a_ddress(user.address);
    }
    getCustomers();
    // Hàm này sẽ được thực thi mỗi khi giá trị của cart thay đổi
    const message = generateMessage(cart);
    set_m_ess(message);
  }, [cart]);
  const getCustomers = async () => {
    try {
      let res = await FetchAll();
      if (res && res.data) {
        setListCustomers(res.data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của biểu mẫu
    if (!paymentMethod) {
      // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác tùy ý
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }
    try {
      const res1 = await PostCreate(e_mail, p_phone, name, m_ess, a_ddress);
      if (res1 && res1.data) {
        setName("");
        set_e_mail("");
        set_p_hone("");
        set_m_ess("");
        set_a_ddress("");
        toast.success("Create success");
        // navigate("/");
      } else {
        toast.error("Error in creating order!");
      }
    } catch (error) {
      toast.error("Error in creating order!");
      console.error("Error:", error);
    }

    try {
      const itemToUpdate = listCustomers.find((item) => item.id === 6);
      const m_p = itemToUpdate.men_price + menPrice;
      const w_p = itemToUpdate.women_price + womenPrice;
      const m_p_r = itemToUpdate.men_product + menQuantity;
      const w_p_r = itemToUpdate.women_product + womenQuantity;
      const l_abel = itemToUpdate.label;

      const res2 = await PutUpdate(6, m_p, w_p, m_p_r, w_p_r, l_abel);
      if (res2 && res2.data) {
        set_men_price("");
        set_women_price("");
        set_men_product("");
        set_women_product("");
        set_label("");
        toast.success("Update success");
      } else {
        toast.error("Error in updating products!");
      }
    } catch (error) {
      toast.error("Error in updating products!");
      console.error("Error:", error);
    }
  };
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <>
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-semibold mb-5">Payment</h1>
        <form onSubmit={handleSubmit}>
          {/* Các trường nhập dữ liệu */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <h6 className="m-0">Email</h6>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={e_mail}
              onChange={(event) => set_e_mail(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              <h6 className="m-0">Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              <h6 className="m-0">Phone</h6>
            </label>
            <input
              type="number"
              className="form-control"
              id="phone"
              name="phone"
              value={p_phone}
              onChange={(event) => set_p_hone(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              <h6 className="m-0">Address</h6>
            </label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              value={a_ddress}
              onChange={(event) => set_a_ddress(event.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <h6>Phương thức thanh toán</h6>
            <Form className="border-[1px]">
              <div className="p-2 flex flex-col gap-2 justify-center">
                <Form.Check
                  type="radio"
                  id="payment-vietqr"
                  label="Thanh toán qua VietQR"
                  value="vietqr"
                  checked={paymentMethod === "vietqr"}
                  onChange={handlePaymentMethodChange}
                  className="rounded-full"
                />
                <Form.Check
                  type="radio"
                  id="payment-cod"
                  label="Thanh toán khi giao hàng (COD)"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={handlePaymentMethodChange}
                  className="rounded-full"
                />
              </div>
            </Form>
          </div>
          <div className="mb-3">
            <label className="form-label">
              <h6 className="m-0">Order Summary</h6>
            </label>
            <textarea
              className="form-control"
              rows="5"
              readOnly
              value={m_ess}
              onChange={(event) => set_m_ess(event.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Place Order
          </button>
        </form>
      </div>
    </>
  );
}

export default Payment;
