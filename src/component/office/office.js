import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import './office.css';

const Office = () => {
    const [date, setDate] = useState(new Date());
    const [day, setDay] = useState("");

    const onChange = (newDate) => {
        setDate(newDate);
        setDay(newDate.toDateString());
    };

    console.log(day);

    // 예시 데이터
    const [data, setData] = useState([
        { id: 1, room: '101', time: '09:00 AM - 10:00 AM', reservedBy: 'John Doe', checked: false },
        { id: 2, room: '101', time: '10:00 AM - 11:00 AM', reservedBy: 'John Doe', checked: false },
        { id: 3, room: '101', time: '11:00 AM - 12:00 PM', reservedBy: 'Jane Smith', checked: false },
        { id: 4, room: '101', time: '12:00 PM - 01:00 PM', reservedBy: 'Bob Johnson', checked: false },
        { id: 5, room: '101', time: '01:00 PM - 02:00 PM', reservedBy: 'Bob Johnson', checked: false },
        { id: 6, room: '101', time: '02:00 PM - 03:00 PM', reservedBy: 'Bob Johnson', checked: false },
        { id: 7, room: '101', time: '03:00 PM - 04:00 PM', reservedBy: 'Bob Johnson', checked: false },
        { id: 8, room: '101', time: '04:00 PM - 05:00 PM', reservedBy: 'Bob Johnson', checked: false },
        { id: 9, room: '101', time: '05:00 PM - 06:00 PM', reservedBy: 'Bob Johnson', checked: false },
    ]);

    const handleCheckboxChange = (id) => {
        setData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    return (
        <div>
            <h1>강의실 예약 시스템</h1>
            <header>
                {/* 백엔드에서 동 받아와서 Map으로 정렬할듯 */}
                <button className='a1'>N4동</button>
                <button className='a2'>N5동</button>
                <button className='a3'>N6동</button>
                <button className='a4'>N7동</button>
            </header>
            <nav>
                <button className='b1'>1층</button>
                <button className='b2'>2층</button>
                <button className='b3'>3층</button>
                <button className='b4'>4층</button>
            </nav>
            <main>
                <div className='calendar_container'>
                    <Calendar onChange={onChange} value={date} />
                </div>
                <div className='time_container'>
                    <table>
                        <thead>
                            <tr>
                                <th>선택</th>
                                <th>Room</th>
                                <th>Time</th>
                                <th>Reserved By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={row.checked}
                                            onChange={() => handleCheckboxChange(row.id)}
                                        />
                                    </td>
                                    <td>{row.room}</td>
                                    <td>{row.time}</td>
                                    <td>{row.reservedBy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default Office;
