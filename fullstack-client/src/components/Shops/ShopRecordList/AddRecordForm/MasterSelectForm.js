import React from "react"
import { Loading } from "../../../Loading/Loading"

export const MasterSelectForm = (props) => {

    if (!props.artistMastersList) {
        return <Loading />
    }
    return (
        <div className="record-form-container">
        <h1>Select record</h1>
        {props.artistMastersList ? 
                props.artistMastersList.map(master => {
                    return <div onClick={() => 
                        {
                        if(master.type === "master") {
                        props.findMasterVersions(master.id)   
                        props.componentChangeHandler("versionSelect")
                        } else if (master.type === "release") {
                        props.setInfoForForm(master)    
                        props.componentChangeHandler("recordForm")
                        }
                        }}
                    key={master.id}>
                    <h2>{master.title}</h2>
                    </div>
                })
            : 
            null}
        </div>
    )
}