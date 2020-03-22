import React from "react";
import {Link} from "react-router-dom";

export class Logo extends React.Component {
    render() {
        return <Link to="/" id="logo"><h1 className="text-center" id="mainLogo">Learngine</h1></Link>;
    }
}