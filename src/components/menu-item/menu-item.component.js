import React from 'react'
import './menu-item.styles.scss'


const menuitem = ({title, image, size}) => {
    return (
        <div className={`${size} menu-item`}>
            <div className="background-image" style={{backgroundImage: `url(${image})`}} ></div>

            <div className="content">
                <h1 className="title">{title.toUpperCase()}</h1>
                <span className="subtitle">Shop now</span>
            </div>
        </div>
)
}


export default menuitem;