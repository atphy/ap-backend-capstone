/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from "react";
import { ShopRecord } from './ShopRecord'
import { StackContext } from '../../Customers/Stacks/StackProvider'

export const ShopRecordList = (props) => {

    const {getMyStackItems, stackItems} = useContext(StackContext)

    useEffect(() => {
        if (props.currentUserProfile === 3) {
            getMyStackItems()
        }
    }, [])

    return (
        <>
            <div className={props.conditionalListClass} style={{ margin: "0 0", lineHeight: "1.75rem", }}> 
            {props.currentShop.records.map(record => {
                return <ShopRecord isMyShop={props.IsMyShop} stackItems={stackItems} {...props} key={record.id} currentUserProfile={props.currentUserProfile} shopRecord={record} />
            })}
            </div>
        </>
    )
};