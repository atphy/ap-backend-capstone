import React, {useRef, useContext} from "react"
import { Loading } from '../../../Loading/Loading'
import { RecordContext } from '../../../Records/RecordProvider'
import { useHistory } from "react-router-dom";

export const RecordForm = (props) => {
    const history = useHistory();

    const { addRecord } = useContext(RecordContext)

    const name = useRef()
    const artist = useRef()
    const label = useRef()
    const catalogue_number = useRef()
    const country = useRef()
    const year = useRef()
    const media_condition = useRef()
    const sleeve_condition = useRef()
    const price = useRef()
    const notes = useRef()

    const constructNewRecord = () => {
        const newRecordObject = {
            discogs_id: props.infoForForm.id,
            name: name.current.value,
            artist: artist.current.value,
            label: label.current.value,
            catalogue_number: catalogue_number.current.value,
            country: country.current.value,
            year: year.current.value,
            media_condition: media_condition.current.value,
            sleeve_condition: sleeve_condition.current.value,
            price: price.current.value,
            notes: notes.current.value,
            image_url: props.infoForForm.thumb 
            }
        addRecord(newRecordObject)
        history.push(`/`)
    }

    if(!props.infoForForm) {
            return <Loading />
    }
    return (
        <div className="record-form-container">
        <h1>Enter Record Information</h1>
        <form >
            <label htmlFor="name">Record name: </label>
            <input type="text" name="name" ref={name} defaultValue={props.infoForForm.title} />
            <label htmlFor="artist">Artist: </label>
            <input type="text" ref={artist} name="artist" defaultValue={props.searchArtist} />
            <label htmlFor="label">Label: </label>
            <input type="text" ref={label} defaultValue={props.infoForForm.label} name="label" />
            <label htmlFor="catalogue_number">Catalogue Number: </label>
            <input type="text" ref={catalogue_number} defaultValue={props.infoForForm.catno} name="catalogue_number" />
            <label htmlFor="year">Release year: </label>
            <input type="text" ref={year} name="year" defaultValue={props.infoForForm.released} />
            <label htmlFor="year">Release country: </label>
            <input type="text" ref={country} name="country" defaultValue={props.infoForForm.country} />
            <select defaultValue={null} ref={media_condition}>
                <option value={null} hidden disabled>Select media condition</option>
                <option value="M">Mint</option>
                <option value="NM">Near Mint</option>
                <option value="VG">Very Good</option>
                <option value="G">Good</option>
                <option value="F">Fair</option>
                <option value="P">Poor</option>
            </select>
            <select defaultValue={null} ref={sleeve_condition}>
                <option value={null} disabled>Select sleeve condition</option>
                <option value="M">Mint</option>
                <option value="NM">Near Mint</option>
                <option value="VG">Very Good</option>
                <option value="G">Good</option>
                <option value="F">Fair</option>
                <option value="P">Poor</option>
            </select>
            <label htmlFor="price">Price: </label>
            <input type="text" ref={price} name="price" />
            <label htmlFor="notes">Notes: </label>
            <input ref={notes} type="textarea" rows="10" name="notes" />
            <input type="submit" onClick={(e) => {
            e.preventDefault();
            constructNewRecord()
            props.setInfoForForm(null)
            props.setSearchArtist(null)
            }}/>
        </form>
        </div>
    )
}