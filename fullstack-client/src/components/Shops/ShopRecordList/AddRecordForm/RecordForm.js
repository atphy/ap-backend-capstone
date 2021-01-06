import React, {useRef, useContext} from "react"
import { Loading } from '../../../Loading/Loading'
import { RecordContext } from '../../../Records/RecordProvider'
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label } from 'reactstrap';

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
            .then(history.push(`/`))
    }

    if(!props.infoForForm) {
            return <Loading />
    }
    return (
        <div className="record-form-container">
        <h1>Enter Record Information</h1>
        <Form width="60%">
            <FormGroup>
                <Label htmlFor="name">Record name: </Label>
                <input type="text" name="name" ref={name} defaultValue={props.infoForForm.title} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="artist">Artist: </Label>
                <input type="text" ref={artist} name="artist" defaultValue={props.searchArtist} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="label">Label: </Label>
                <input type="text" ref={label} defaultValue={props.infoForForm.label} name="label" />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="catalogue_number">Catalogue Number: </Label>
                <input type="text" ref={catalogue_number} defaultValue={props.infoForForm.catno} name="catalogue_number" />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="year">Release year: </Label>
                <input type="text" ref={year} name="year" defaultValue={props.infoForForm.released} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="year">Release country: </Label>
                <input type="text" ref={country} name="country" defaultValue={props.infoForForm.country} />
            </FormGroup>
            <FormGroup>
            <select defaultValue={null} ref={media_condition}>
                <option value={null} hidden disabled>Select media condition</option>
                <option value="M">Mint</option>
                <option value="NM">Near Mint</option>
                <option value="VG">Very Good</option>
                <option value="G">Good</option>
                <option value="F">Fair</option>
                <option value="P">Poor</option>
            </select>
            </FormGroup>
            <FormGroup>
            <select defaultValue={null} ref={sleeve_condition}>
                <option value={null} disabled>Select sleeve condition</option>
                <option value="M">Mint</option>
                <option value="NM">Near Mint</option>
                <option value="VG">Very Good</option>
                <option value="G">Good</option>
                <option value="F">Fair</option>
                <option value="P">Poor</option>
            </select>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price">Price: </Label>
                <input type="text" ref={price} name="price" />
            </FormGroup>
            <FormGroup>
            <Label htmlFor="notes">Notes: </Label>
            <input ref={notes} type="textarea" rows="10" name="notes" />
            </FormGroup>
            <Button type="submit" onClick={(e) => {
            e.preventDefault();
            constructNewRecord()
            props.setInfoForForm(null)
            props.setSearchArtist(null)
            }}>Add Record</Button>
        </Form>
        </div>
    )
}