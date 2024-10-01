import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; 
import style from "./Login.module.css";
import logo from "../assets/logo.png";
import Non from "../assets/Non.svg";
import Yes from "../assets/Yes.svg";

//reservation

const Login = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [loginWait, setLoginWait] = useState(false);
  const [userInfo, setUserInfo] = useState('');

  const serverAddress = "https://port-0-haranglogin-9zxht12blqj9n2fu.sel4.cloudtype.app/login";

  const navigate = useNavigate();

  const IdChangeHandler = (event) => {
    setUserId(event.target.value);
  };

  const PwChangeHandler = (event) => {
    setUserPw(event.target.value); 
  };

  const WainLoginHandler = () => {
    setLoginWait(!loginWait);
  };

  const LoginSubmitHandler = () => {
    if (loginWait) {
      localStorage.setItem('Id', userId);
      localStorage.setItem('Pw', userPw);
    }
    useEffect(() => {
        const LoginSubmit = async () => {
            try {
                const response = await axios.post(serverAddress, {
                    "studentNumber": userId,
                    "password": userPw
                });
                setUserInfo(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('error fetching users: ', error);
            }
        }

        LoginSubmit();
    }, [])
  };

  const SignUpSubmitBtn = () => {
    navigate("/SignUp");
  };

  return (
    <div>
      <img src={logo} className={style.logoImg} alt="Logo" />
      <div className={style.login_container}>
        <div className={style.login_input_container}>
          <div className={style.Id_container}>
            <label>ID</label>
            <input
              type="text"
              value={userId}
              onChange={IdChangeHandler}
              className={style.Input_id}
            />
          </div>
          <div className={style.Pw_container}>
            <label>PW</label>
            <input
              type="password"
              value={userPw}
              onChange={PwChangeHandler}
              className={style.Input_pw}
            />
          </div>
          <div className={style.waitLogin} onClick={WainLoginHandler}>
            {!loginWait ? <img src={Non} alt="Not checked" /> : <img src={Yes} alt="Checked" />}
            <div>로그인 상태 유지</div>
          </div>
          <div className={style.loginBtn} onClick={LoginSubmitHandler}>Login</div>
        </div>
        <div className={style.info_container}>
          <div>Find Id</div>
          <div>Find Pw</div>
          <div className={style.SignUp} onClick={SignUpSubmitBtn}>Sign up</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
