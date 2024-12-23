import './StaffList.css'
import {deactivateStaff, getStaff} from "../../api/admin";
import {useEffect, useState} from "react";

export default function StaffList() {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        async function loadStaff() {
            const data = await getStaff()
            setStaff(data)
        }
        loadStaff();
    }, [])

    const deactivate =  async (login) => {

        const result = await deactivateStaff(login); //TODO:Handle errors

        setStaff(prevState =>
            prevState.map(staff =>
                staff.login === login ? { ...staff, active: !staff.active } : staff
            )
        )
    }

    return (
        <div className="Stafflist">
            <p>Сотрудники ресторанов</p>
            <ul className="staffList">
                {staff.map((staff) => (
                    <li className='staffBase' key={staff.login}>
                        <li className='staffLogin'> {staff.login}<br/></li>
                        <li className='restaurantsAddress'> {staff.restaurant}</li>
                        <button className='adminButton' onClick={() => deactivate(staff.login)}> {staff.active ? 'Активен' : 'Неактивен'}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}