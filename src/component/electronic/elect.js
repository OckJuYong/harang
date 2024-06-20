import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Elect = () => {
  const location = useLocation();
  const { state } = location;
  const URL = "주소";

  useEffect(() => {
    if (state) {
      console.log('Received data:', state);

      // 예시로 받은 데이터를 사용하여 추가적인 처리를 할 수 있습니다.
      // 예를 들어, state에 있는 데이터를 백엔드로 전송하여 추가 데이터를 요청할 수 있습니다.
      axios.post(`${URL}/someEndpoint`, state)
        .then(response => {
          console.log('Response from server:', response.data);
        })
        .catch(error => {
          console.error('Error from server:', error);
        });
    }
  }, [state]);

  const closeBtn = () => {
    const postURL = "임시_POST_URL"; // 임시로 POST 요청을 보낼 URL을 지정합니다.

    axios.post(postURL, state)
      .then(response => {
        console.log('Response from temporary server:', response.data);
        // 여기에서 필요한 추가적인 처리를 할 수 있습니다.
      })
      .catch(error => {
        console.error('Error from temporary server:', error);
      });
  };

  return (
    <div>
      {/* 여기에서 데이터를 사용하여 페이지를 구성할 수 있습니다. */}
      <h1>강의실 예약 상세 정보</h1>
      {state && (
        <div>
          <p>이름: {state.name}</p>
          <p>사유: {state.reason}</p>
          <p>날짜: {state.date}</p>
          <p>동: {state.building}</p>
          <p>층: {state.floor}</p>
          <p>강의실: {state.room}</p>
          <p>시간: {state.time}</p>
        </div>
      )}
      <button onClick={closeBtn}>POST요청을 보낼 버튼</button>
    </div>
  );
}

export default Elect;
