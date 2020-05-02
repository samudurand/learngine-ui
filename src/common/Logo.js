import React from "react";
import {Link} from "react-router-dom";

export function Logo() {
    return <Link id="logo" to="/">
        <img alt="logo" className="img-fluid" src="/logo.svg"/>
    </Link>;
}