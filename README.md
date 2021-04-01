# Fullstack
### [Demo](https://youtu.be/3vysCT-_Hmo)

## Proposal

### Brief Proposal
Fullstack is a site for building and browsing digital storefronts for independent record stores. 

### Expanded Proposal
Record Shops will create profiles, to be reviewed and verified by site Admin. Once approved, Shops will be able to search for and add Records to their Inventory up against the Discogs API. Matching search results will be returned as information on a form that the Shop can edit (title, artist, image, Discogs rating, tracklist, etc) along with information to be entered by the Shop itself (such as condition) which will be used to find a recommended sale price (provided only as a suggestion, a store can edit the listed sale price). If no match or an incorrect match is found, the form will simply be blank and the Shop can fill out all information themselves. Once a Shop approves of the information on said form, the record entry will be pushed to the Shop’s Inventory. Once in the Inventory, a Shop can edit or remove the Record entry. 

Customers accessing the site will be able to choose a Shop from the list of registered Shops and browse their  Inventory. From there, the Customer can create a wishlist-like Stack for the purposes of contacting the Shop directly to confirm availability. 

## Application Overview 

### What problem does your application solve?
Fullstack is based on the success of sites like Bookshop.org, which connect independent retailers of physical media with customers. In this model, stores are treated almost as “independent distribution centers” rather than all purchases moving through a central entity such as Amazon.

The idea is dependent on one core assumption: a customer’s desire to purchase from a local source versus a major retailer given equal or superior convenience and price. Fullstack aims to maximize convenience for both retailers and customers to interact and partake in mutually beneficial transactions.

### Who are the target users of this application?
There are two major targets for Fullstack: independent record stores and their customers. Fullstack aims not to replace or reduce instances of in-store visits, but to provide additional opportunities for stores to interact with and expand their pool of engaged customers. 

### Why do you want to build this application?
The idea came from several conversations with the owner of a (now-closed) record store in my hometown when I’d just started teaching myself a little bit of programming and thought everything would be a lot easier than it is. Small independent stores can have all the absolute treasures in the world, but if no one is browsing then it hardly matters. Unsurprisingly many record stores, dealing primarily in an outdated medium, tend to have very traditional methods of dealing with inventory and getting customers in the door. This project would use the massive amounts of data on Discogs to aid stores in getting information on goods they’re hoping to sell, along with creating more opportunities to interact with customers via the virtual storefront.

### Features included in MVP Definition: 
- [x] Stores are able to create a profile, to be sent to an approval queue
- [x] Stores are able to search for records on Discogs and, if a match is found, populate that info into an “add record to inventory” form (if no match, this form is blank)
- [x] Stores are able to edit records and remove them from their inventory
- [x] Customers are able to add and remove records in a stack once authed
- [x] Customers are able to click on a “detail view” to display more information about records

### Features that are Stretch Goals:
- Customers are able to browse store inventories without auth
- Stack can be filtered by store or show all wishlisted items across stores
- Customers can search for records across all stores to find any nearby matches
- Customers and stores are able to edit profile details
- Stores are able to customize the look of their storefronts (upload images, change colors of text and backgrounds)
- Stores can “pin” records to home page view carousel
- Stores are able to have multiple email addresses associated with different employees
- Stores are able to set different levels of employee privileges
- Customers should be able to press a button to email their store stack to the store for the store to confirm availability if filtered to a single store
  - OR create an internal feature where stores can review stack item availability and, if not in stock, remove from stock and inform customer from the same page
- Stores are able to add inventory via .csv import or barcode scan.
- Stores can choose to add records to a Discogs store and sell directly online

#### ERD: https://dbdiagram.io/d/5fd10f309a6c525a03ba768a

#### Moqup/Wireframes: https://miro.com/app/board/o9J_lbov9pc=/
