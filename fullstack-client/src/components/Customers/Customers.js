import React, {useEffect, useContext, useState, useRef} from "react";
import { Loading } from "../Loading/Loading";
import { ShopContext } from "../Shops/ShopProvider";
import { CustomerContext } from './CustomerProvider'
import { CustomerShopList } from './CustomerShopList/CustomerShopList'
import { Link } from "react-router-dom"

export const Customers = (props) => {

    const { getAuthedCustomer, singleCustomer } = useContext(CustomerContext)
    const [searchZip, setSearchZip] = useState(null)
    const [searchRadius, setSearchRadius] = useState(50)
    const [useDefaultZip, setUseDefaultZip] = useState(true)

    useEffect(()=>{
        if (props.currentUserProfile === 3) {
            getAuthedCustomer()
        }
    }, [])

    useEffect(() => {
        if (props.currentUserProfile === 3) {
            setSearchZip(singleCustomer.default_zip) 
        } else {
            setSearchZip(37216)
        }
    }, [singleCustomer])

    const newZIP = useRef()
    const newRadius = useRef()
    
    const changeZipSearchHandler = (e) => {
        e.preventDefault();
        setUseDefaultZip(false)
    }

    const setZipSearchHandler = (e) => {
        e.preventDefault();
        setSearchZip(newZIP.current.value)
        setUseDefaultZip(true)
    }

    const searchRadiusHandler = (e) => {
        e.preventDefault();
        setSearchRadius(newRadius.current.value)
    }

    const setTopLinkForUser = () => {
        if(props.currentUserProfile === 3) {
            return <Link to={{pathname:`/my_stack`}}>My Stack</Link>
        } else if (props.currentUserProfile === 2) {
            return <Link to={{pathname:`/myshop`}}>My Shop</Link>
        } else if (props.currentUserProfile === 1) {
            return <Link to={{pathname:`/admin`}}>Admin Panel</Link>
        }
    }

    if (singleCustomer === undefined) {
        return <Loading />
    } else {
        return ( 
            <div>
            {setTopLinkForUser()}
            <h1>Showing Record Shops Within</h1>
            <input min="50" max="300" onChange={searchRadiusHandler} ref={newRadius} defaultValue={searchRadius} type="number" step="50" ></input>
            <h1>miles of</h1>
            {useDefaultZip ?
            <h1 onClick={changeZipSearchHandler} defaultValue={searchZip}>{searchZip}</h1>
            :
            <form onSubmit={setZipSearchHandler}>
            <input defaultValue={searchZip} ref={newZIP} name="newZIP" minLength="5" maxLength="5" placeholder={searchZip} type="text"></input>
            <input type="submit"></input>
            </form>
            }
            <CustomerShopList key="customer_shop_list" currentUserProfile={props.currentUserProfile} searchRadius={searchRadius} singleCustomer={singleCustomer} />
            </div>
        )
        }
    }