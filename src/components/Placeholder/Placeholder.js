import React from "react";

import "./Placeholder.scss";

const Placeholder = (props) => {

    const { image, title, paragraph, height, width } = props;

    if (paragraph) {

        return (
            <div className="placeholder-paragraph">
                {
                    Array.from(Array(paragraph || 5).keys()).map((key) => (
                        <div 
                            key={key} 
                            className={`placeholder-paragraph-line ${
                                key % 3 === 2 && "placeholder-paragraph-line-short"
                            }`}
                        />
                    ))
                }
            </div>
        );
    }

    return (
        <div
            className="placeholder-container"
            style={{
                ...height && { height },
                ...width && { width },
                ...(height && width) && { margin: "auto" }
            }}
        >
            {
                image ?
                    <div className="placeholder-img" /> :
                title ?
                    <div className="placeholder-title" /> :
                    <div className="placeholder-text" />
            }
        </div>
    );
}

export default Placeholder;
