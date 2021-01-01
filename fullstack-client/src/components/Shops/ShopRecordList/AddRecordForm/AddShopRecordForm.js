import React, {useState, useContext} from "react"
import { FinalForm } from './FinalForm'
import { DiscogsArtistSearch } from './DiscogsArtistSearch'
import { MasterSelectForm } from './MasterSelectForm'
import { DiscogsContext } from "../../../discogs/DiscogsProvider"

export const AddRecordForm = (props) => {
    const [selectedComponent, setSelectedComponent] = useState(props.modalComponent)
    const [searchArtistId, setSearchArtistId] = useState(null)

    const {artistMastersList, findArtistMasters} = useContext(DiscogsContext)

    const componentChangeHandler = (newComponent) => {
        setSelectedComponent(newComponent)
    }

    const findMastersById = (searchArtistId) => {
        findArtistMasters(searchArtistId)
    }

    if (selectedComponent === "modalMain") {

    return (
        <>
        <h1 onClick={() => {componentChangeHandler("discogsArtistSearch")}}>Add a Record from Discogs</h1>
        <h3>or</h3>
        <h1 onClick={() => {componentChangeHandler("finalForm")}}>Provide Your Own Record Info</h1>
        </>
        )
    } else if (selectedComponent === "finalForm") {
    return (
            <>
            <FinalForm />
            </>
            )
    } else if (selectedComponent === "discogsArtistSearch") {
        return (
            <>
            <DiscogsArtistSearch setSearchArtistId={setSearchArtistId} componentChangeHandler={componentChangeHandler} />
            </>
            )
    } else if (selectedComponent === "masterSelect") {
        {findMastersById(searchArtistId)}
        return (
            <>
            <MasterSelectForm artistMastersList={artistMastersList.releases} componentChangeHandler={componentChangeHandler} />
            </>
            )
        } 
}