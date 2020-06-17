import React from 'react';
import './TopFrame.scss'

var TopFrame = () => {
    return (
        <section className="top-frame">
            <div className="title">Vensangu Photography</div>
            {/* TODO: Get nav items from Metadata */}
            <nav>
                <a href="/" className="active">Portfolio</a>
                <a href="/" className="regular">Family</a>
                <a href="/">Outdoors</a>
                <a href="/">About</a>
            </nav>
        </section>
    );
}

export default TopFrame;