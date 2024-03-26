import { useState, useEffect } from "react";
// import { PostLoginUser } from "../Services/UserService";
import { PostRegister } from "../Services/UserService";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [e_mail, set_e_mail] = useState("");
    const [pass_word, set_pass_word] = useState("");
    const [p_hone, set_p_phone] = useState("");
    const [a_ddress, set_a_ddress] = useState("");
    const [isShowPassWord, setIsShowPassWord] = useState(false);
    const [loadingApi, setLoadingApi] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, []);
    const handleRegister = async () => {
        try {
            setLoadingApi(true);
            const res = await PostRegister(e_mail, pass_word,name,p_hone,a_ddress);

            if (res && res.data) {
                set_e_mail('');
                set_pass_word('');
                setName('');
                set_p_phone('');
                set_a_ddress('');
                toast.success("Login successful!");
                navigate("/login");
            } else {
                toast.error("Login failed!");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during login.");
        }
        setLoadingApi(false);
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && e_mail && pass_word&&name&&p_hone&&a_ddress) {
            handleRegister();
        }
    };
    const handleLogin = () => {
        // Add your registration logic here
        navigate("/login");
    };
    const handleGoBack = () => {
        navigate("/");
    }
    return (
        <>
            <div className="login-container col-12 col-sm-4 ">
                <div className="title">Register</div>
                <div className="text">New user</div>
                <input id="text-email" type="email" placeholder="enter email"
                    value={e_mail}
                    onKeyPress={handleKeyPress}
                    onChange={(event) => set_e_mail(event.target.value)}
                />
                <div className="input-pass">
                    <input id="text-email" type={isShowPassWord === true ? "text" : "password"}
                        placeholder="enter password"
                        value={pass_word}
                        onKeyPress={handleKeyPress}
                        onChange={(event) => set_pass_word(event.target.value)}
                    />
                    <i className={isShowPassWord === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                        onClick={() => setIsShowPassWord(!isShowPassWord)}
                    ></i>
                </div >
                <input id="text-email" type="text" placeholder="enter name"
                    value={name}
                    onKeyPress={handleKeyPress}
                    onChange={(event) => setName(event.target.value)}
                />
                <input id="text-email" type="number" placeholder="enter phone"
                    value={p_hone}
                    onKeyPress={handleKeyPress}
                    onChange={(event) => set_p_phone(event.target.value)}
                />
                <input id="text-email" type="text" placeholder="enter address"
                    value={a_ddress}
                    onKeyPress={handleKeyPress}
                    onChange={(event) => set_a_ddress(event.target.value)}
                />
                <button className={e_mail && pass_word &&name&&p_hone&&a_ddress? "active" : ""}
                    disabled={e_mail && pass_word ? false : true}
                    onClick={() => handleRegister()}
                >{loadingApi && <i className="fa-solid fa-sync fa-spin"></i>}Register</button>
                <button onClick={handleLogin}>Login</button>
                <div className="go-back">
                    <i className="fa-solid fa-backward"></i>
                    <span onClick={() => handleGoBack()}>GO BACK HOME</span>
                </div>
            </div>
        </>
    )
}
export default Register;