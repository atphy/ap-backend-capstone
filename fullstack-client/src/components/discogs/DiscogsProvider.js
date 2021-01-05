import discogsKeys from './discogsKeys.json'
import React, { useState } from "react"

export const DiscogsContext = React.createContext()

export const DiscogsProvider = (props) => {

    const [artistSearchList, setArtistSearchList] = useState([])
    const [artistMastersList, setMastersSearchList] = useState(null)
    const [masterVersionsList, setVersionsSearchList] = useState(null)

    const getArtistSearch = (artistName) => {
        return fetch(`http://localhost:8000/search_discogs_artist?artist=${artistName}`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
                .then(setArtistSearchList)
    }

    const findArtistMasters = (artistId) => {
        return fetch(`http://localhost:8000/search_discogs_masters?artistId=${artistId}`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
                .then(setMastersSearchList)
    }

    const findMasterVersions = (artist, master) => {
        return fetch(`http://localhost:8000/search_discogs_versions?artist=${artist}&master=${master}`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
                .then(setVersionsSearchList)
    }

    return (
        <DiscogsContext.Provider value={{
            artistSearchList, getArtistSearch, findArtistMasters, artistMastersList, masterVersionsList, findMasterVersions
        }}>
            {props.children}
        </DiscogsContext.Provider>
    )
}