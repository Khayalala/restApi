import "../assets/styles/Table.css";
import Toggle from "./Toggle";
export const Table = ({currentUsers, professions, handleDelete, handleEdit, refreshUsers}) => {

  return (
    <table border={"1"}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Profession</th>
                <th>Operations</th>
            </tr>
        </thead>
        <tbody>
            {
                currentUsers.map(user=>{
                    const prof = professions.find(profession=>profession.id===user.occupationId);
                    return(
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{prof? prof.name : null}</td>
                            <td className="userBtns">
                                <button className="edit" onClick={()=>handleEdit(user)}>Edit</button>
                                <button className="delete" onClick={()=>handleDelete(user.id)}>Delete</button>
                                <Toggle userId={user.id} status={user.status} refreshUsers={refreshUsers}/>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
  )
}
