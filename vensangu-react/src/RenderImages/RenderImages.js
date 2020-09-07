import React, { useState } from 'react';
import './RenderImages.scss';

const RenderImages = (props) => {
    var { category } = props;
    var [images, setImages] = useState([]);
    var imageUrl = `https://won2alg3mh.execute-api.us-east-2.amazonaws.com/Prod/api/Images/${category}`;

    fetch(imageUrl)
        .then(res=>res.json())
        .then(result => {
            if(images.length == 0) {
                setImages([...result.landscapes, ...result.portraits]);
            }
        });

    return (
        <div className="container">
            {images.map((image) => <img src={image} />)}
        </div>
    );
}

export default RenderImages;