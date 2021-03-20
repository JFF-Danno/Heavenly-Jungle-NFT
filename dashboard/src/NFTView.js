import {DefaultButton, PrimaryButton, DangerButton, BrandButton} from 'pivotal-ui/react/buttons';
import {Grid, FlexCol} from 'pivotal-ui/react/flex-grids';
import {Panel} from 'pivotal-ui/react/panels';
import {Divider} from 'pivotal-ui/react/dividers';
import React, { useState, useEffect } from "react"
import {Image} from 'pivotal-ui/react/images';
import {Input} from 'pivotal-ui/react/inputs';

import 'pivotal-ui/css/alignment';
import 'pivotal-ui/css/box-shadows';
import 'pivotal-ui/css/positioning';
import logo from './logo.svg';
import './App.css';

function App() {

var localAddress = '';
useEffect(() => { getPanel() }, [])

const [itemList,setList]=useState([])

const [panelImage,setPanelImage]=useState([])
const [panelImageNumber,setPanelImageNumber]=useState([])

function connect()
{
    window.ethereum.enable().then( async function(accounts)
    {
        localAddress = accounts[0];
        getPanel();

    });
}


function getPanel()
{
    const search = window.location.search;
    const params = new URLSearchParams(search);
    setPanelImage( '/panelsMedium/' + params.get('panel') + '.jpg' );
    setPanelImageNumber( params.get('panel') );
}

return (

    <div className="App" className="position-relative" >
<Panel {...{title: 'Overview', titleCols: [<FlexCol fixed><DangerButton href="mural" >Home</DangerButton><PrimaryButton onClick={connect} >Connect Wallet</PrimaryButton></FlexCol>], style: {  padding: '8px', background: '#f2f2f2'}}}>
<Divider/>

 <Grid className="grid-show ">
  <FlexCol className="box-shadow-amb-3" {...{  style: {height: '220px',  background: '#f8f8f8', margin: '8px 8px'}}}>
          <div className="bg-light-gray pal" >
          <Panel {...{header: 'HeavenlyJungle', style: {  background: '#f2f2f2',margin: '8px 8px'}}}>
            Panel #{panelImageNumber} of 26
          </Panel>
       </div>
</FlexCol>
  <FlexCol className="box-shadow-key-3" {...{ style: {height: '220px',  background: '#f8f8f8', margin: '8px 8px'}}}> 
        <div className="bg-light-gray pal" >
          <Panel {...{header: 'Editions', style: {  background: '#f2f2f2',margin: '8px 8px'}}}>
            <p>Edition of 1</p>
            <p>Original Listing Price : $#0000</p>
            <p>Last Sold : $1,000,000</p>
          </Panel>
       </div>
</FlexCol>
  
  <FlexCol className="box-shadow-3" {...{ style: {height: '220px',  background: '#f8f8f8', margin: '8px 8px'}}}>
        <div className="bg-light-gray pal" >
          <Panel {...{header: 'Bidding', style: {  background: '#f2f2f2',margin: '8px 8px'}}}>
           <p>Lowest ask: --</p>
           <p>Highest bid: --</p>
           <p>Last Sold: --</p>
          </Panel>
       </div>
</FlexCol>

<FlexCol className="box-shadow-3" {...{ style: {height: '220px',  background: '#f8f8f8', margin: '8px 8px'}}}>
        <div className="bg-light-gray pal" >
          <Panel {...{header: 'Bidding', style: {  background: '#f2f2f2',margin: '8px 8px'}}}>
           <BrandButton >Place Bid</BrandButton>
            <br/><br/>
<Input placeholder="$#.00" type="text"/>
          </Panel>
       </div>
</FlexCol>
</Grid>
<Divider/>

</Panel>
<Panel  {...{header: 'Artwork', style: {  background: '#f3f3f3' }}}>
   <div className="txt-c" >
    <Image className="box-shadow-3 txt-c" src={panelImage} alt="Iweng"/>
   </div>
</Panel>
    </div>
  );
}

export default App;
