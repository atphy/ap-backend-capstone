import React, {useContext, useRef, useEffect, useState} from "react"
import { DiscogsContext } from "../../../discogs/DiscogsProvider"

export const DiscogsArtistSearch = (props) => {

    const {artistSearchList, getArtistSearch} = useContext(DiscogsContext)
    const [artistList, setArtistList] = useState(null)
    const artistName = useRef(null)

    const handleArtistSearch = (e) => {
        e.preventDefault();
        getArtistSearch(artistName.current.value)
    }

    useEffect(() => {
        setArtistList(artistSearchList)
    }, [artistSearchList])

    return (
        <div className="record-form-container">
        <h1>Search for artist by name</h1>
        <form onSubmit={handleArtistSearch}>
            <input ref={artistName} name="artistName" placeholder="Artist Name" type="text"></input>
            <input type="submit"></input>
        </form>
        {artistList ? 
                artistList.map(artist => {
                    return <div onClick={() => 
                        {
                        props.findArtistMasters(artist.id)    
                        props.componentChangeHandler("masterSelect")
                        props.setSearchArtist(artist.name) 
                        }} key={artist.id}>
                        <img alt={`Thumbnail of ${artist.name}`} src={artist.thumb} />
                        <h2>{artist.name}</h2>
                        </div>
                })
            : 
            null}
        </div>
    )
}