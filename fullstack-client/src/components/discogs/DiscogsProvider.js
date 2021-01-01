import discogsKeys from './discogsKeys.json'
import React, { useState } from "react"

export const DiscogsContext = React.createContext()

export const DiscogsProvider = (props) => {

    const [artistSearchList, setArtistSearchList] = useState([])
    const [artistMastersList, setMastersSearchList] = useState([])

    const getArtistSearch = (artistName) => {
        return fetch(`https://api.discogs.com/database/search?q=${artistName}&type=artist&token=${discogsKeys.Authorization.oauth_token}`, {
            method: "GET",
            headers: {
                "Authorization": discogsKeys.Authorization,
                "Content-Type": discogsKeys['Content-Type'],
                "User-Agent": discogsKeys['User-Agent']
            }
        })
            .then(res => res.json())
                .then(setArtistSearchList)
    }

    const findArtistMasters = (artistId) => {
        return fetch(`https://api.discogs.com/artists/7578/releases?oauth_consumer_key=TutvVcSOAjUtnpHSAcNC&oauth_token=nVWipcCtGzmGFRYqzqKUNtZIKTXKLqlkzMjYvKcF&oauth_signature_method=PLAINTEXT&oauth_timestamp=1609452591&oauth_nonce=yb93oGtArTd&oauth_version=1.0&oauth_signature=lsKNoWjTcGBFlWDiDgkTrKAtDXeYaBYH%26uMZnqMInGFSCxgTfkyjjqpwsVLlinkwsXMWOQMnY`, {
            method: "GET",
            headers: {
                "Authorization": discogsKeys.Authorization,
                "Content-Type": discogsKeys['Content-Type'],
                "User-Agent": discogsKeys['User-Agent']
            }
        })
            .then(res => res.json())
                .then(setMastersSearchList)
    }

    return (
        <DiscogsContext.Provider value={{
            artistSearchList, getArtistSearch, findArtistMasters, artistMastersList
        }}>
            {props.children}
        </DiscogsContext.Provider>
    )
}