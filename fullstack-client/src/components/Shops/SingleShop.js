/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from "react";
import { ShopContext } from './ShopProvider'
import { ShopRecordList } from './ShopRecordList/ShopRecordList'
import { Loading } from '../Loading/Loading'
import { Redirect } from "react-router-dom"
import "./SingleShop.css"

export const SingleShop = (props) => {

    const { getSingleShop, singleShop } = useContext(ShopContext)

    useEffect(() => {
        const shopId = parseInt(props.match.params.shopId)
        getSingleShop(shopId)
    }, [])


if (!singleShop.records) {
    return <Loading />
} 

if (!singleShop.verified) {
    return <Redirect to="/" />
}
    return <>
    <h1>{singleShop.username}</h1>
    <ShopRecordList conditionalListClass="record-list" key={singleShop.id} currentUserProfile={props.currentUserProfile} currentShop={singleShop}/>
    </>;
};