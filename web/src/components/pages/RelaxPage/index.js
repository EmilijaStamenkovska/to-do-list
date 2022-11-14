// Core
import React from 'react'
// Assets
import image1 from '../../../assets/images/image1.jpg';
import image2 from '../../../assets/images/image2.jpg';
import image3 from '../../../assets/images/image3.png';
// import image4 from '../../../assets/images/image4.png';
import image5 from '../../../assets/images/image5.png';
import image6 from '../../../assets/images/image6.png';
import image7 from '../../../assets/images/image7.png';
import image8 from '../../../assets/images/image8.png';
// Style
import './style.css';

const RelaxPage = () => {
    return (
        <div className="relax-page">
            <img src={image1} className="relax-page__images" />
            <img src={image2} className="relax-page__images" />
            <img src={image3} className="relax-page__images" />
            {/* <img src={image4} className="relax-page__images" /> */}
            <img src={image5} className="relax-page__images" />
            <img src={image6} className="relax-page__images" />
            <img src={image7} className="relax-page__images" />
            <img src={image8} className="relax-page__images" />
        </div>
    )
}

export default RelaxPage;