/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext, useState} from "react";
import { Route } from "react-router-dom"
import { ApproveShop } from './admin/ApproveShop'
import { MyShop } from './Shops/MyShop'
import { Customers } from './Customers/Customers'
import { UserContext } from './users/UserProvider'
import { ShopProvider, ShopContext } from './Shops/ShopProvider'
import { RecordProvider, RecordContext } from './Records/RecordProvider'
import { CustomerProvider, CustomerContext } from './Customers/CustomerProvider'
import { MyStack } from './Customers/Stacks/MyStack'
import { StackProvider } from './Customers/Stacks/StackProvider'
import { RecordDetail } from './Records/RecordDetail'
import { SingleShop } from './Shops/SingleShop'
import { DiscogsProvider } from './discogs/DiscogsProvider'
import { Nav } from './Nav/Nav'

export const ApplicationViews = (props) => {

    const { getCurrentUser, currentUser } = useContext(UserContext)
    const { allRecords } = useContext(RecordContext)

    const [records] = useState(allRecords)

    useEffect(()=>{
        getCurrentUser()
    }, [])

    const { getAuthedCustomer, singleCustomer } = useContext(CustomerContext)

    useEffect(()=>{
        if (currentUser.profile_type === 3) {
            getAuthedCustomer()
        }
    }, [currentUser])

    const [searchZip, setSearchZip] = useState(37216)
    const [searchRadius, setSearchRadius] = useState(50)

    useEffect(() => {
        if (currentUser.profile_type === 3) {
            setSearchZip(singleCustomer.default_zip) 
        } else {
            setSearchZip(37216)
        }
    }, [singleCustomer])

    const { getShops, shops } = useContext(ShopContext)

    useEffect(() => {
        getShops(searchZip)
    }, [searchZip]) // Look here for issues w refreshing display
    
    return (
        <>
        <Route path="/" render={(props) => {
            return (
            <>
            <div>
            <DiscogsProvider>
            <StackProvider>
            <RecordProvider>
            <ShopProvider>
            <CustomerProvider>
                <div className="secondary-container">
                <div className="nav-container">
                <Route path="/" render={(props) =>
                    <Nav shops={shops} setSearchZip={setSearchZip} setSearchRadius={setSearchRadius} searchRadius={searchRadius} searchZip={searchZip} singleCustomer={singleCustomer} currentUserProfile={currentUser.profile_type} {...props} />}/>
                </div>
                <div className="customers-container">
                <Route exact path="/" render={(props) =>
                    <Customers shops={shops} searchRadius={searchRadius} searchZip={searchZip} singleCustomer={singleCustomer} currentUserProfile={currentUser.profile_type} {...props} />}/>
                </div>
                <Route exact path="/my_stack" render={(props) =>
                    <MyStack currentUserProfile={currentUser.profile_type} {...props} />}/>
                <Route exact path="/admin" render={(props) =>
                    <ApproveShop currentUserProfile={currentUser.profile_type} {...props} />}/>
                <Route exact path="/myshop" render={(props) =>
                    <MyShop currentUserProfile={currentUser.profile_type} {...props} />}/>
                <Route path="/records/:recordId(\d+)" render={(props) => 
                    <RecordDetail currentUserProfile={currentUser.profile_type} {...props} />} />
                <Route path="/shops/:shopId(\d+)" render={(props) => 
                    <SingleShop currentUserProfile={currentUser.profile_type} {...props} />} />
                </div>
            </CustomerProvider>
            </ShopProvider>
            </RecordProvider>
            </StackProvider>
            </DiscogsProvider>
            </div>
            </>
            )


        }} />
        </>  
    )

    
};