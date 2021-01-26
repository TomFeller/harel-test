import React, {useState} from "react";
import {useSelector} from "react-redux";
import _ from "lodash";
import moment from "moment";
import {Link} from "react-router-dom";
import "./users-table.scss";

export const UsersTable = ({filterValue = ""}) => {
    const users = useSelector(state => state.users.allUsers);

    const [usersList, setUsersList] = useState(users);
    const [orderType, setOrderType] = useState("asc");

    const filterUsers = (user) => {
        const firstName = user.firstName?.toLowerCase();
        const lastName = user.lastName?.toLowerCase();
        const phone = user.phone.split('-').join("");
        const valuesToCheck = [firstName, lastName, phone];
        return valuesToCheck.some(value => value?.toLowerCase().includes(filterValue));
    };

    const orderBy = (orderBy) => {
        setOrderType(orderType === "asc" ? "desc" : "asc");
        setUsersList(_.orderBy(users, [orderBy], [orderType]));
    };

    const tableHead = (
        <tr>
            <th onClick={() => orderBy("id")}>ID</th>
            <th onClick={() => orderBy("firstName")}>Name</th>
            <th onClick={() => orderBy("lastName")}>Last Name</th>
            <th onClick={() => orderBy("date")}>Date</th>
            <th onClick={() => orderBy("phone")}>Phone</th>
        </tr>
    );

    const tableBody =
        usersList.filter(filterUsers).map(user => {
            const date = moment(user.date).format('L');
            const {id, firstName, lastName, phone} = user;
            const cells = [id, firstName, lastName, date, phone];
            return (
                <tr key={id}>
                    {cells.map((cell, index) => {
                        return <td key={index}>
                            <Link to={`/edit/${id}`}>
                                {cell}
                            </Link>
                        </td>
                    })}
                </tr>
            )
        });

    return (
        <div className="users-table-wrapper">
            <table className="users-table" cellSpacing={0}>
                <thead>{tableHead}</thead>
                <tbody>{tableBody}</tbody>
            </table>
        </div>
    );
};