/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from "react";
import { ShopContext } from '../Shops/ShopProvider'
import { Redirect } from "react-router-dom"
import { Link } from "react-router-dom"
import { Loading } from '../Loading/Loading'
import "./ApproveShop.css"
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'

export const ApproveShop = (props) => {

    const { getShops, shops, verifyShop } = useContext(ShopContext)

    useEffect(()=>{
        getShops(37216)
    }, [])

    const handleVerifyShop = (e) => {
        e.preventDefault();
        verifyShop(e.target.id)
}

if (!props.currentUserProfile) {
    return <Loading />
} else {
    if (props.currentUserProfile !== 1) {
    return <Redirect to="/" />
    } else {
        return (
            <>
            <main style={{ margin: "0 0", lineHeight: "1.75rem", }}> 
            <Link to={{pathname:`/`}}><FontAwesomeIcon icon={faStepBackward} /></Link>
            <Row className='mt-3' xs="3">
            {shops.map(shop => {
                            return (
                            <div key={shop.id}>
                                <Col className='mb-4'>
                                <Card body outline color="secondary" className="shop-card">
                                <CardTitle tag="h2">{shop.username}</CardTitle>
                                <CardText>{shop.contact_phone}</CardText>
                                <CardText>{shop.contact_email}</CardText>
                                {shop.verified ? 
                                <Button id={shop.id} onClick={handleVerifyShop} color="danger">Remove Verification</Button>
                                : <Button id={shop.id} onClick={handleVerifyShop} color="primary">Verify</Button>}
                                </Card>
                                </Col>
                            </div>
                            )
                        })}
                        </Row>
            
            </main>
        </>
    )
                    }
                    }
};