import {DefaultButton, PrimaryButton, DangerButton, BrandButton} from 'pivotal-ui/react/buttons';
import {Grid, FlexCol} from 'pivotal-ui/react/flex-grids';
import {Panel} from 'pivotal-ui/react/panels';
import {Divider} from 'pivotal-ui/react/dividers';
import React, { useState, useEffect } from "react"
import 'pivotal-ui/css/alignment';

import 'pivotal-ui/css/box-shadows';
import 'pivotal-ui/css/positioning';
import logo from './logo.svg';
import './App.css';

function App() {

//{"blockNumber":"74428","timeStamp":"1439385885","hash":"0x6a7eecef7b05e1dde580f00127310122387999ed33d71795e642a1194a2e3d0a","nonce":"2",
//"blockHash":"0x891440ab59727c947c872d6bf15b78e5563f33f9471b5bd4f5267142fd0576ea","transactionIndex":"0","from":"0x3fb1cd2cd96c6d5c0b5eb3322d807b34482481d4",
//"to":"0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae","value":"0","gas":"122146","gasPrice":"50000000000","isError":"0","txreceipt_status":"",
//"input":"0xf00d4b5d0000000000000000000000003fb1cd2cd96c6d5c0b5eb3322d807b34482481d4000000000000000000000000c2c2c26961e5560081003bb157549916b21744db","contractAddress":"",
//"cumulativeGasUsed":"122079","gasUsed":"122079","confirmations":"11928975"},
var localAddress = '';
useEffect(() => { getList()  }, [])

const [itemList,setList]=useState([])


function getList()
{
    if ( localAddress != '' )
    {
        fetch('https://api.etherscan.io/api?module=account&action=txlist&address=' + localAddress + '&startblock=0&endblock=99999999&sort=asc&apikey=4NXKXKAPC8A4U9QA6D348YRAUHI2DWTERE')
            .then(res => res.json()) 
            .then(res => {

                            let items = res.result;
                            let _itemList = [];
                            items.forEach((item,index)=>{ _itemList.push( <li key={index}>{item.from} - {item.to} - {item.gasUsed} - <a href="#" >Claim This Fee</a></li>) })
                            setList(_itemList)
                        })
          .catch(function(error) { })
    }
}


function connect()
{
    window.ethereum.enable().then( async function(accounts)
    {
        localAddress = accounts[0];
        getList();
    });
}

return (

    <div className="App" className="position-relative" >
<Panel {...{title: 'Account Overview', titleCols: [<FlexCol fixed><DangerButton href="mural" >Home</DangerButton><PrimaryButton onClick={connect} >Connect Wallet</PrimaryButton></FlexCol>], style: {  padding: '8px', background: '#f2f2f2'}}}>
<Divider/>

 <Grid className="grid-show ">
  <FlexCol className="box-shadow-amb-3" {...{contentAlignment: 'middle', style: {height: '150px',  background: '#f8f8f8', margin: '8px 8px'}}}>
          <div className="bg-light-gray pal" >
          <Panel {...{header: 'Current Balance', style: {  background: '#f2f2f2'}}}>
            GAScoin : 1000000  - $300.50
          </Panel>
       </div>
</FlexCol>
  <FlexCol className="box-shadow-key-3" {...{contentAlignment: 'middle', style: {height: '150px',  background: '#f8f8f8', margin: '8px 8px'}}}> 
        <div className="bg-light-gray pal" >
          <Panel {...{header: 'Claimable Balance', style: {  background: '#f2f2f2'}}}>
            GAScoin : 100 -  $3.00
          </Panel>
       </div>
</FlexCol>
  
  <FlexCol className="box-shadow-3" {...{contentAlignment: 'middle', style: {height: '150px',  background: '#f8f8f8', margin: '8px 8px'}}}>
        <div className="bg-light-gray pal" >
          <Panel {...{header: 'Something Else', style: {  background: '#f2f2f2'}}}>
            These are the domains.
          </Panel>
       </div>
</FlexCol>


</Grid>
<Divider/>

</Panel>
<Panel {...{header: 'Transactions', style: {  background: '#f2f2f2'}}}>
            
          
    <ul>
        {itemList}
       

    </ul>

</Panel>
    </div>
  );
}

export default App;
