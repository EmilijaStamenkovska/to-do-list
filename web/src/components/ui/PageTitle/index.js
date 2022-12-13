// Core
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Style
import './style.css';

const PageTitle = (props) => {
    return (
        <div className="page__title__back">
            <span className="page-title">
                {props.title}
            </span>
            <Link
                to="/my-profile"
                className="back-to-profile"
            >
                {props.back}
            </Link>
        </div>
    );
};

export default PageTitle;

PageTitle.defaultProps = {
    title: '',
    customClassName: ''
};

PageTitle.propTypes = {
    title: PropTypes.string,
    customClassName: PropTypes.string
};