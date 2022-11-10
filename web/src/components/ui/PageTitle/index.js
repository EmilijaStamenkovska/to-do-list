// Core
import React from 'react';
import PropTypes from 'prop-types';
// Style
import './style.css';

const PageTitle = (props) => {
    return (
        <span className="page-title">
            {props.title}
        </span>
    );
};

export default PageTitle;

PageTitle.defaultProps = {
    title: ''
};

PageTitle.propTypes = {
    title: PropTypes.string
};