import React, {useState,} from "react";
import {useSelector} from "react-redux";
import _ from "lodash";
import classNames from "classnames";
import moment from "moment";
import {Link} from "react-router-dom";
import "./users-table.scss";

export const UsersTable = ({filterValue = ""}) => {
    const users = useSelector(state => state.users.allUsers);

    const [usersList, setUsersList] = useState(users);
    const [orderType, setOrderType] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");

    const filterUsers = (user) => {
        const firstName = user.firstName?.toLowerCase();
        const lastName = user.lastName?.toLowerCase();
        const phone = user.phone.split('-').join("");
        const valuesToCheck = [firstName, lastName, phone];
        return valuesToCheck.some(value => value?.toLowerCase().includes(filterValue));
    };

    const sorting = (name) => {
        setOrderType(orderType === "asc" ? "desc" : "asc");
        setUsersList(_.orderBy(users, [orderBy], [orderType]));
        setOrderBy(name);
    };

    const SortingIcon = ({name}) => {
        return <span className={classNames("sorting-icon", {active: orderBy === name})}>{`^`}</span>
    };

    const TableHead = ({name, label}) => {
        return <th onClick={() => sorting(name)}>{label} <SortingIcon name={name}/></th>
    };

    const tableHead = (
        <tr>
            <TableHead name={"id"} label={"ID"}/>
            <TableHead name={"firstName"} label={"First Name"}/>
            <TableHead name={"lastName"} label={"Last Name"}/>
            <TableHead name={"date"} label={"Date"}/>
            <TableHead name={"phone"} label={"Phone"}/>
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