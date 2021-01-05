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
                    return <h2 
                    onClick={() => 
                        {
                        props.findMasterVersions(props.searchArtist, master.title)
                        props.setSearchMaster(master.title)    
                        props.componentChangeHandler("versionSelect") 
                        }}
                    key={master.id}>{master.title}</h2>
                })
            : 
            null}
        </div>
    )
}