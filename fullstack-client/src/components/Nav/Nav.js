import React from "react";
import { Link } from "react-router-dom"
import { ZipSearch } from './ZipSearch'
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import './nav.css'

export const Nav = (props) => {
    const history = useHistory();

    const setTopLinkForUser = () => {
        if(props.currentUserProfile === 3) {
            return <Link className="top-nav-button" to={{pathname:`/my_stack`}}>My Stack</Link>
        } else if (props.currentUserProfile === 2) {
            return <Link className="top-nav-button" to={{pathname:`/myshop`}}>My Shop</Link>
        } else if (props.currentUserProfile === 1) {
            return <Link className="top-nav-button" to={{pathname:`/admin`}}>Admin Panel</Link>
        }
    }

    if(props.location.pathname === "/") {
        return <div className="nav-main">
        <div className="top-nav-links">
        <div>
        <Link onClick={() => {
            localStorage.clear()}}
            className="top-nav-button" to={{pathname:`/`}}>Log out</Link>
        </div>
        <div>
        {setTopLinkForUser()}
        </div>
        </div>
        <ZipSearch {...props} />
        <div>
        <select className="all-shops-select" onChange={(e) => {
                    if(e.target.value){
                        history.push(`/shops/${e.target.value}`)}}
                    }
                    >
        <option value={null}>Or select from all record shops</option>
        {props.shops.map(shop => {
            if (shop.verified === true) {
                return <option key={shop.id} value={shop.id}>{shop.username}</option>
            }
        })}
        </select>
        </div>
        </div>
    } else {
        return <Link className="customer-top-info top-nav-button" to={{pathname:`/`}}><FontAwesomeIcon icon={faHome} /></Link>
    }
};