import axios from 'axios';
import Web3 from 'web3'
import React,{Component} from 'react';
import './App.css';
import Color from './ArtPiece.json'
class App extends Component {

	state = {

	// Initially, no file is selected
	selectedFile: null,
    imageHash: null,
    imgurl:'./panel.jpg'
	};
	
	// On file select (from the pop up)
	onFileChange = event => {
	
	// Update the state
	this.setState({ selectedFile: event.target.files[0] });
	
	};
	

    
	// On file upload (click the upload button)
	onFileUpload = async () => {

    const pinataApiKey = "769a94ec02018d9d3e92";
    const pinataSecretApiKey = "f1424ea5ce2fa199efa260ca2cae4c245227a750e919722ffdf5688b81638051";
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    data.append("file", this.state.selectedFile, this.state.selectedFile.name );
    const res = await axios.post(url, data, {
    maxContentLength: "Infinity", 
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: pinataApiKey, 
      pinata_secret_api_key: pinataSecretApiKey,
    },
});
    console.log(res.data);
    alert( res.data );
    this.setState({ imageHash : res.data.IpfsHash });
    this.setState({ imageMetaData : '{"name":"' + this.state.selectedFile.name + '","hash":"' + res.data.IpfsHash + '","description":"todo"}'});
//{ "name":"My Kid's Art", "hash": "QmfAvnM89JrqvdhLymbU5sXoAukEJygSLk9cJMBPTyrmxo",  "by": "Justin Huner" }
	};
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
	
	if (this.state.selectedFile) {
		
		return (
		<div>
			<h2>File Details:</h2>
            <p>File Name: {this.state.selectedFile.name}</p>
            <p>File Type: {this.state.selectedFile.type}</p>
            <p>Last Modified:{" "}{this.state.selectedFile.lastModifiedDate.toDateString()}</p>
		</div>
		);
	} else {
		        return (
		        <div>
			        <br />
			        <h4>Choose before Pressing the Upload button</h4>
		        </div>
		        );
	    }
	};
	
	render() {
	
	return (
		<div>
			<h1>
			GeeksforGeeks
			</h1>
			<h3>
			File Upload using React!
			</h3>
			<div>
				<input type="file" onChange={this.onFileChange} />
				<button onClick={this.onFileUpload}>
				Upload!
				</button> &nbsp;|&nbsp;
                <button onClick={this.mint}>
				Mint!
				</button>  &nbsp;|&nbsp; 
                <button onClick={this.read}>
				Read Wallet!
				</button>
			</div>
            
            
		{this.fileData()}
            <div>   
             <img src={this.state.imgurl} />

            </div>
		</div>
	);
	}

async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Color.networks[networkId]
    if(networkData) {
      const abi = Color.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })
   
    } else {
      window.alert('Please check your network settings in metamask.')
    }
  }


    read = async () => { 

                    var uri = await this.state.contract.methods.getURI( this.state.account ).call();
                    this.setState( { imgurl: 'https://gateway.pinata.cloud/ipfs/' + uri } );
                    alert( 'uri ' + uri );                

                 }

  mint = (color) => {alert ( this.state.account + ' ' + this.state.imageHash + ' : ' + this.state.imageMetaData ); //   ipfs://YOUR_METADATA_HASH
    this.state.contract.methods.mint(this.state.account, this.state.imageHash, this.state.imageMetaData).send( { from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({
        colors: [...this.state.colors, color]
      })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      colors: []
    }
  }
}

export default App;

