// Core
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Style
import './style.css';

const PageTitle = (props) => {
    return (
        <div className="page__title__back">
            <Link to={(-1)} className="back">«</Link>
            <span className="page-title">
                {props.title}
            </span>
        </div>
    );
};

export default PageTitle;

PageTitle.defaultProps = {
    title: ''
};

PageTitle.propTypes = {
    title: PropTypes.string
};