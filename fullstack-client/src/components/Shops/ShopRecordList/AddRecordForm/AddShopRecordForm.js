import React, {useState, useContext} from "react"
import { RecordForm } from './RecordForm'
import { DiscogsArtistSearch } from './DiscogsArtistSearch'
import { MasterSelectForm } from './MasterSelectForm'
import { DiscogsContext } from "../../../discogs/DiscogsProvider"
import { VersionSelectForm } from "./VersionSelectForm"
import { EditRecordForm } from "./EditRecordForm"
import "./AddShopRecordForm.css"

export const AddRecordForm = (props) => {
    const [selectedComponent, setSelectedComponent] = useState(props.modalComponent)

    const {artistMastersList, findArtistMasters, masterVersionsList, findMasterVersions} = useContext(DiscogsContext)
    const [infoForForm, setInfoForForm] = useState(props.clearArtist)
    const [searchArtist, setSearchArtist] = useState(null)

    const componentChangeHandler = (newComponent) => {
        setSelectedComponent(newComponent)
    }

    if (selectedComponent === "modalMain") {

    return (
        <div className="record-form-container">
        <h1 onClick={() => {componentChangeHandler("discogsArtistSearch")}}>Add a Record from Discogs</h1>
        <h3>or</h3>
        <h1 onClick={() => {
            componentChangeHandler("recordForm");
            setInfoForForm({"id": 0})
            }}>Provide Your Own Record Info</h1>
        </div>
        )
    } else if (selectedComponent === "recordForm") {
    return (
            <>
            <RecordForm setSearchArtist={setSearchArtist} setInfoForForm={setInfoForForm} searchArtist={searchArtist} infoForForm={infoForForm} />
            </>
            )
    } else if (selectedComponent === "editRecord") {
        return (
                <>
                <EditRecordForm shopRecord={props.shopRecord} />
                </>
                )
        } else if (selectedComponent === "discogsArtistSearch") {
        return (
            <>
            <DiscogsArtistSearch setSearchArtist={setSearchArtist} findArtistMasters={findArtistMasters} componentChangeHandler={componentChangeHandler} />
            </>
            )
    } else if (selectedComponent === "masterSelect") {
        return (
            <>
            <MasterSelectForm setInfoForForm={setInfoForForm} findMasterVersions={findMasterVersions} artistMastersList={artistMastersList} componentChangeHandler={componentChangeHandler} />
            </>
            )
    } else if (selectedComponent === "versionSelect") {
        return (
            <>
            <VersionSelectForm setInfoForForm={setInfoForForm} masterVersionsList={masterVersionsList} componentChangeHandler={componentChangeHandler} />
            </>
            )
        } 
}