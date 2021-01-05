import React, {useEffect, useContext, useRef} from "react";
import { Redirect } from "react-router-dom"
import { Link } from "react-router-dom"
import { Loading } from "../Loading/Loading";
import { ShopContext } from './ShopProvider'
import { ShopRecordList } from "./ShopRecordList/ShopRecordList";
import { ShopVerification } from './ShopVerification';
import { AddRecordForm } from './ShopRecordList/AddRecordForm/AddShopRecordForm'
import "./MyShop.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'

export const MyShop = (props) => {

    const { getAuthedShop, singleShop } = useContext(ShopContext)

    useEffect(()=>{
        getAuthedShop()
    }, [])

    const addRecordDialog = useRef(null)

    if (singleShop === undefined || !props.currentUserProfile) {

        return <Loading />

    } else {
        if (props.currentUserProfile !== 2) {
            return <Redirect to="/" />
            } else {

        return (
            <div>{singleShop.verified ? 
            <div>
            <Link to={{pathname:`/`}}><FontAwesomeIcon icon={faStepBackward} /></Link>
            <h1>{singleShop.username}</h1>
            <button onClick={() => {
                            addRecordDialog.current.showModal()}}>Add Record</button>
            <dialog className="dialog dialog--addRecord" ref={addRecordDialog}>
                <AddRecordForm modalComponent={"modalMain"}/>    
            </dialog>
            <ShopRecordList isMyShop={true} getAuthedShop={getAuthedShop} currentUserProfile={props.currentUserProfile} currentShop={singleShop}/>
            </div>
            :<ShopVerification currentShop={singleShop}/> }</div>
        )
        }
    }
    }