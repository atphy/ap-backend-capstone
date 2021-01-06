import React from "react"
import { Loading } from "../../../Loading/Loading"

export const VersionSelectForm = (props) => {


    if (!props.masterVersionsList) {
        return <Loading />
    } else {
    return (
        <div className="record-form-container">
        <h1>Select release version</h1>
        {props.masterVersionsList ? 
                props.masterVersionsList.map(version => {
                    return <div                     
                    onClick={() => 
                        {
                        props.setInfoForForm(version)    
                        props.componentChangeHandler("recordForm") 
                        }}
                    key={version.id}>
                    <h2>{version.label} ({version.catno})</h2>
                    <p>{version.country} Pressing, {version.format}</p>
                    <p>Released by {version.label} ({version.catno}) in {version.released}</p>
                    </div>
                })
            : 
            null}
        </div>
    )}
}