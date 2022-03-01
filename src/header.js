import React from "react";
import {NavLink} from "react-router-dom";

function Header(){
    return(
        <nav>
            <NavLink exact activeClassName="active" to="/">
                Login
            </NavLink>

            <NavLink exact activeClassName="active" to="/Member">
                Member
            </NavLink>

            <NavLink exact activeClassName="active" to="/Users">
                Users
            </NavLink>

            <NavLink exact activeClassName="active" to="/Paket">
                Paket
            </NavLink>
        </nav>
    )
}

export default Header;