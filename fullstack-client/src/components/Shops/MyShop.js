import React, {useEffect, useContext, useState} from "react";
import { Loading } from "../Loading/Loading";
import { ShopContext } from './ShopProvider'
import { ShopRecordList } from "./ShopRecordList/ShopRecordList";
import { ShopVerification } from './ShopVerification';
//here
export const MyShop = (props) => {

    const { getAuthedShop, singleShop } = useContext(ShopContext)
    const [currentShop, setCurrentShop] = useState({});

    useEffect(()=>{
        getAuthedShop()
            .then(setCurrentShop(singleShop))
            .then(console.warn(singleShop))
    }, [singleShop])
    

    if (currentShop === undefined) {
        return <Loading />
    } else {

        return (
            <div>{currentShop.verified ? 
            <div>
            <h1>{currentShop.username}</h1>
            <ShopRecordList currentShop={currentShop}/>
            </div>
            :<ShopVerification currentShop={currentShop}/> }</div>
        )
        }
    }