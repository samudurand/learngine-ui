import React from "react";
import {Link} from "react-router-dom";

export function Logo() {
    return <Link id="logo" to="/"><h1 className="text-center" id="mainLogo">Learngine</h1></Link>;
}