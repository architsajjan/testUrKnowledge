import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UpdateNavbar from './Additionals/withLogo';

function Navbar(props) {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> {props.logo}</Link>
            </h1>
        </nav>
    )
}

Navbar.propTypes ={
    logo : PropTypes.string
}

export default UpdateNavbar(Navbar);