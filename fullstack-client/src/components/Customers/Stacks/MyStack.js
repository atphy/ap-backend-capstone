import React, { useContext, useEffect } from "react";
import { StackContext } from './StackProvider'
import { ShopRecord } from '../../Shops/ShopRecordList/ShopRecord'
import { Link } from "react-router-dom"

export const MyStack = (props) => {

    const {getMyStackItems, stackItems} = useContext(StackContext)

    useEffect(()=>{
        getMyStackItems()
    }, [])

    return (
        <>
            <div className="my-stack-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}> 
            <Link to={{pathname:`/`}}>Back to home</Link>
            <h1>Your Stack</h1>
            {stackItems.map(stackItem => {
                    return <div>
                    <ShopRecord key={stackItem.record} profile_type={"customer"} shopRecord={stackItem.record} inStack={true} />
                    </div>
            })}
            </div>
        </>
    )
};