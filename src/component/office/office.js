import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./office.css";

const NUM = ["N4", "N5"];
const URL = "주소";

const Office = () => {
  const [date, setDate] = useState(new Date());
  const [datePayload, setDatePayload] = useState([]);
  const [BuildingNumber, setBuildingNumber] = useState();
  const [floor, setFloor] = useState();
  const [room, setRoom] = useState();
  const [res, setRes] = useState();
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const handleClickBuildingNumber = (num) => {
    setBuildingNumber(num);
  };

  const handleClickFloor = (floor) => {
    setFloor(floor);
  };

  const handleClickRoom = (room) => {
    setRoom(room);
  };

  useEffect(() => {
    setDatePayload([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
    console.log(datePayload);
  }, [date]);

  useEffect(() => {
    console.log(res);
  }, [res]);

  // const rightBtn = (row) => {
  //   navigate("/elect", {
  //     state: {
  //       name: row.name,
  //       reason: row.reason,
  //       date: `${row.year}-${row.month}-${row.day}`,
  //       building: row.building,
  //       floor: row.floor,
  //       room: row.room,
  //       time: `${row.start_time} ~ ${row.end_time}`,
  //     },
  //   });
  // };

  //테스트용
  const rightBtn = (row) => {
    navigate("/elect", {
      state: {
        name: "내 이름",
        reason: "대충 그런 이유가 있음",
        date: `아무년-아무월-아무일`,
        building: "대충 높은 빌딩",
        floor: "대충 아무 플로워",
        room: "대충 아무방",
        time: `이때부터 저떄까지`,
      },
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // submit 동작 수행시 새로고침 방지
      }}
    >
      <h1>강의실 예약 시스템</h1>
      <header>
        {/* 백엔드에서 동 받아와서 Map으로 정렬할듯 */}
        <button
          className="a1"
          onClick={() => handleClickBuildingNumber(NUM[0])}
        >
          {NUM[0]}
        </button>
        <button
          className="a2"
          onClick={() => handleClickBuildingNumber(NUM[1])}
        >
          {NUM[1]}
        </button>
      </header>
      <nav>
        {/* 백엔드 측으로 건물 번호를 post 하면 돌아오는 정보를 토대로 층 버튼 노출 */}
        {/* 층 버튼 누를시 강의실 리스트 떠야 함. */}
        <button
          className="b1"
          onClick={() => {
            handleClickFloor(1);
          }}
        >
          1층
        </button>
        <button
          className="b2"
          onClick={() => {
            handleClickFloor(2);
          }}
        >
          2층
        </button>
        <button
          className="b3"
          onClick={() => {
            handleClickFloor(3);
          }}
        >
          3층
        </button>
        <button
          className="b4"
          onClick={() => {
            handleClickFloor(4);
          }}
        >
          4층
        </button>
      </nav>
      <div>
        <button
          onClick={() => {
            handleClickRoom(101);
          }}
        >
          101
        </button>
        <button
          onClick={() => {
            handleClickRoom(301);
          }}
        >
          301
        </button>
        <button
          onClick={() => {
            handleClickRoom(408);
          }}
        >
          408
        </button>
      </div>
      <main>
        <div className="calendar_container">
          <Calendar onChange={onChange} value={date} />
        </div>
        <div className="time_container">
          {/* 시간 겹치는, 이미 예약된 시간대의 컨테이너는 따로 표시 해야 함. */}
          <table>
            <thead>
              <tr>
                <th>이름</th>
                <th>사유</th>
                <th>날짜</th>
                <th>동</th>
                <th>층</th>
                <th>강의실</th>
                <th>시간</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={rightBtn}>
                {/* 테스트용 */}
                <td>이름</td>
                <td>사유가있었어요</td>
                <td>모든 날짜로 할게요</td>
                <td>시동</td>
                <td>계층</td>
                <td>강의술</td>
                <td>모든 시간으로 할게요</td>
              </tr>
              {res
                ? res.map((row) => (
                    <tr key={row.id} onClick={() => rightBtn(row)}>
                      <td>{row.name}</td>
                      <td>{row.reason}</td>
                      <td>{row.year}-{row.month}-{row.day}</td>
                      <td>{row.building}</td>
                      <td>{row.floor}</td>
                      <td>{row.room}</td>
                      <td>{row.start_time} ~ {row.end_time}</td>
                      <td>
                        <Link to={{
                          pathname: "/elect",
                          state: {
                            name: row.name,
                            reason: row.reason,
                            date: `${row.year}-${row.month}-${row.day}`,
                            building: row.building,
                            floor: row.floor,
                            room: row.room,
                            time: `${row.start_time} ~ ${row.end_time}`
                          }
                        }}>
                          자세히 보기
                        </Link>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </main>
      <footer>
        <button
          type="submit"
          onClick={() => {
            // 조회하기 버튼 누를시 state에 저장되어있는 / 날짜, 건물 번호, 층, 강의실 번호가 get 요청으로 날아감.
            axios
              .get(
                `${URL}/reservation?building=${BuildingNumber}&floor=${floor}&year=${datePayload[0]}&month=${datePayload[1]}&day=${datePayload[2]}&room=${room}`
              )
              .then((response) => {
                console.log(response.data);
                setRes(response.data);
              })
              .catch((err) => {
                console.error("ERR", err);
              });
          }}
        >
          조회하기
        </button>
      </footer>
    </form>
  );
};

export default Office;
