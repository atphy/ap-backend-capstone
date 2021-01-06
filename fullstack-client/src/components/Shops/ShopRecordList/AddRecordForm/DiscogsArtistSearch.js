import React, {useContext, useRef, useEffect, useState} from "react"
import { DiscogsContext } from "../../../discogs/DiscogsProvider"
import { Row, Col, Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

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

    const noArtistImage = "https://lh3.googleusercontent.com/proxy/SDHquj1CF7xuh98xkyuDdUY2jSw0xT6TSilZsMztYIDpUxiMa1ji0avcoZ0YDVSECgGxlC0OH8EF70Toz6U73NMErkz8Ih2JT3wq2Nx8jhvfchXMRo6KPfpCqEQjpz3UOP5L7Lcv77E"

    return (
        <div className="artist-search-container">
        <h1>Search for artist by name</h1>
        <form onSubmit={handleArtistSearch}>
            <input ref={artistName} name="artistName" placeholder="Artist Name" type="text"></input>
            <input type="submit"></input>
        </form>
        <Row className='mt-3' xs="4">
        {artistList ? 
                artistList.map(artist => {
                    return <div >
                        <Col className='mb-4'>
                        <Card className="artist-search-results" key={artist.id} inverse>
                            <CardImg width="300px" height="300px" src={artist.cover_image ? artist.cover_image : noArtistImage} alt={`Thumbnail of ${artist.name}`}/>
                            <CardImgOverlay onClick={() => 
                        {
                        props.findArtistMasters(artist.id)    
                        props.componentChangeHandler("masterSelect")
                        props.setSearchArtist(artist.name) 
                        console.warn(artist.cover_image)
                        }}>
                            <CardTitle className="artist-result-title" tag="h5">{artist.name}</CardTitle>
                            <CardText className="artist-result-title"><a target="_blank" rel="noreferrer" href={`https://discogs.com${artist.uri}`}>Full Discogs profile</a></CardText>
                            </CardImgOverlay>
                        </Card>
                        </Col>
                        </div>
                })
            : 
            null}
            </Row>
        </div>
    )
}