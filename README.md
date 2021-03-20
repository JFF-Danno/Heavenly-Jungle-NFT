# Heavenly-Jungle-NFT
Heavenly Jungle NFT Platform

Development tasks - UI and Blockchain 
####################################################################################################

>>>>>   Minting Process - very basic page created called Upload.js in the react src

File is uploaded to Pinata which returns it's IPFS hash code.
To consume the image we build a url to it on pinata's gateway using the hash.
The IPFS hash code is stored as the token URI in the contract. (looking to explore best practises here)

TODO

A UI implementation with required validation and error handling.
UI steps for options like setting price,auction style,gallery inclusion. Looking at the Zora.co create process as my template what's needed.

#################################################################################################################

>>>>>  Accounts,Wallets and Galleries
   
Need to be able to get a list of owned tokens to produce a wallet page.
Need to work out an appropriate data structure between saving data in moralis and fetching from the blockchain for galleries.
Planning to use moralis.io for data needed for displaying galleries and user account info.
Need to look at signing in with metamask like on zora.co

#################################################################################################################
>>>>>  DAO aspects and smart contract

This is what I'm currently investigating in order to have a chat with Audsssy so we can decide what's needed here.
Expecting some UI work needed on the dao side of things.
