import './StaffList.css'
import {deactivateStaff} from "../../api/admin";

export default function StaffList({staffArray, setStaffArray}) {

    const deactivate =  async (login) => {

        const result = await deactivateStaff(login); //TODO:Handle errors

        setStaffArray(prevState =>
            prevState.map(staff =>
                staff.login === login ? { ...staff, active: !staff.active } : staff
            )
        )
    }

    return (
        <div className="Stafflist">
            <p>Сотрудники ресторанов</p>
            <ul className="staffList">
                {staffArray.map((staff) => (
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