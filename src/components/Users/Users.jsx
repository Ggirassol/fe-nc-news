import { useEffect, useState } from "react";
import { getUsers } from "../../../api";
import UserCard from "../UserCard/UserCard";
import ErrorPage from "../ErrorPage/ErrorPage";
import "./Users.css"

const Users = () => {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [beError, setBeError] = useState(null);

    useEffect(() => {
        getUsers().then((data) => {
            setIsLoading(true)
            setUsers(data.data.users)
            setIsLoading(false)
        }).catch((err) => {
            setBeError(err);
          });
    }, [])

      return beError ? 
      (<ErrorPage beError={beError} setBeError={setBeError}/>) :
      (isLoading ?
      (<h4 className="loading">Loading members...</h4>) :
      (<ul className="users">
            {users.map(user => {
                return <UserCard key={user.username} user={user}/>
            })}
        </ul>
        ))
}

export default Users;