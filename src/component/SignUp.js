import React, { useState } from 'react';
import axios from 'axios';
import style from './SignUp.module.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log({ name, phone, studentId, password });

        // API 주소를 여기에 정의하세요.
        const serverAddress = 'https://your-api-endpoint.com/signup'; // 여기에 실제 서버 주소를 입력하세요.

        try {
            const response = await axios.post(serverAddress, {
                "name" :name,
                "phone" :phone,
                "studnetId" :studentId,
                "password" :password,
            });
            console.log('회원가입 성공:', response.data);
        } catch (error) {
            console.error('회원가입 오류:', error);
        }
    };

    return (
        <div className={style.container}>
            <h2 className={style.title}>회원가입</h2>
            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.inputGroup}>
                    <label htmlFor="name">이름</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={style.input}
                        required
                    />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="phone">전화번호</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={style.input}
                        required
                    />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="studentId">학번</label>
                    <input
                        type="text"
                        id="studentId"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className={style.input}
                        required
                    />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={style.input}
                        required
                    />
                </div>
                <button type="submit" className={style.submitBtn}>가입하기</button>
            </form>
        </div>
    );
};

export default SignUp;
