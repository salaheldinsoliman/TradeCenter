import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import YieldOfferings from '../abis/YieldOfferings.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

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
    const networkData = YieldOfferings.networks[networkId]
    if(networkData) {
      const yieldOfferings= web3.eth.Contract(YieldOfferings.abi, networkData.address)
      this.setState({ yieldOfferings })
      const offeringCount = await yieldOfferings.methods.offeringCount().call()
       this.setState({offeringCount})
      // Load Offerings

      for (var i = 1; i <= offeringCount; i++) {
        const offering = await yieldOfferings.methods.Offerings(i).call()
        this.setState({
          Offerings: [...this.state.Offerings, offering]
        })
      }

      this.setState({ loading: false})
    } else {
      window.alert('YieldOfferings contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)    
    this.state = {
      account: '',
      offeringCount: 0,
      Offerings: [],
      loading: true
    }
    //tbk
    this.addOffering = this.addOffering.bind(this)
    this.buyOffering = this.buyOffering.bind(this)

  }

  addOffering(_name,_Nb_fixings,_high_coupon,_high_coupon_barrier,_smaller_coupon, _Upoutbarrier,_di_barrier){
    this.setState({loading: true})
    this.state.yieldOfferings.methods.addOffering(_name,_Nb_fixings,_high_coupon,_high_coupon_barrier,_smaller_coupon, _Upoutbarrier,_di_barrier).send({from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    }).catch(e=>{
      console.log(e)
    })
}


buyOffering(_id, amount){
  this.setState({loading: true})
  this.state.yieldOfferings.methods.buyOffering(_id, amount).send({from: this.state.account, value:amount})
  .once('receipt', (receipt) => {
    this.setState({ loading: false })
  })
}


  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  Offerings={this.state.Offerings}
                  addOffering= {this.addOffering}
                  buyOffering={this.buyOffering} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
