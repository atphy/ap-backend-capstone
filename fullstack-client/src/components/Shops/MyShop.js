/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext, useRef} from "react";
import { Redirect } from "react-router-dom"
import { Loading } from "../Loading/Loading";
import { ShopContext } from './ShopProvider'
import { ShopRecordList } from "./ShopRecordList/ShopRecordList";
import { ShopVerification } from './ShopVerification';
import { AddRecordForm } from './ShopRecordList/AddRecordForm/AddShopRecordForm'
import "./MyShop.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap';

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
            <h1 className="add-record-title">{singleShop.username}</h1>
            <button className="customer-top-info top-nav-button add-record-button" onClick={() => {
                            addRecordDialog.current.showModal()}}><FontAwesomeIcon icon={faPlusCircle} /></button>
            <dialog className="dialog dialog--addRecord" ref={addRecordDialog}>
            <Button color="danger" onClick={e => {addRecordDialog.current.close()}}><FontAwesomeIcon icon={faTimesCircle} /></Button>
                <AddRecordForm clearArtist={null} modalComponent={"modalMain"}/>    
            </dialog>
            <ShopRecordList conditionalListClass="record-list" isMyShop={true} getAuthedShop={getAuthedShop} currentUserProfile={props.currentUserProfile} currentShop={singleShop}/>
            </div>
            :<ShopVerification currentShop={singleShop}/> }</div>
        )
        }
    }
    }