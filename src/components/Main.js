import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add Offering</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.offeringName.value
          const Nb_fixings =this.Nb_fixings.value
          const high_coupon = this.high_coupon.value
          const high_coupon_barrier = this.high_coupon_barrier.value
          const smaller_coupon = this.smaller_coupon.value
          const Upoutbarrier = this.Upoutbarrier.value
          const di_barrier = this.di_barrier.value
          this.props.addOffering(name,Nb_fixings,high_coupon,high_coupon_barrier,smaller_coupon, Upoutbarrier,di_barrier)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="offeringName"
              type="text"
              ref={(input) => { this.offeringName = input }}
              className="form-control"
              placeholder="Offering Name"
              required />
          </div>

          <div className="form-group mr-sm-2">
            <input
              id="Nb_fixings"
              type="text"donUnit
              ref={(input) => { this.Nb_fixings = input }}
              className="form-control"
              placeholder="Number of Fixings"
              required />
          </div> 
          <div className="form-group mr-sm-2">
            <input
              id="high_coupon"
              type="text"id
              ref={(input) => { this.high_coupon = input }}
              className="form-control"
              placeholder="High Coupon"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="high_coupon_barrier"
              type="text"id
              ref={(input) => { this.high_coupon_barrier = input }}
              className="form-control"
              placeholder="High Coupon Barrier"
              required />
          </div>      
          <div className="form-group mr-sm-2">
            <input
              id="smaller_coupon"
              type="text"id
              ref={(input) => { this.smaller_coupon = input }}
              className="form-control"
              placeholder="Smaller Coupon"
              required />
          </div>      
          <div className="form-group mr-sm-2">
            <input
              id="Upoutbarrier"
              type="text"id
              ref={(input) => { this.Upoutbarrier = input }}
              className="form-control"
              placeholder="Up out barrier"
              required />
          </div>      
          <div className="form-group mr-sm-2">
            <input
              id="di_barrier"
              type="text"id
              ref={(input) => { this.di_barrier = input }}
              className="form-control"
              placeholder="Di Barrier"
              required />
          </div>                
          <button type="submit" className="btn btn-primary">Add Offering</button>
        </form>
        <p>&nbsp;</p>
        <h2>Stake Now ^.^</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>{(input) => { this.offeringName = input }}
              <th scope="col">Raised Amount</th>
              <th scope="col">Goal</th>
              <th scope="col">Donation Unit</th>
              <th scope="col">State</th>
              <th scope="col">Raiser</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="campaignList">
            { this.props.Offerings.map((offering, key) => {
              console.log(offering)
              console.log("DA ELLY GWA EL STATEE: ",offering.state)
              return(
                <tr key={key}>
                  <th scope="row">{offering.id.toString()}</th>
                  <td>{offering.name}</td>
                  <td>{offering.description}</td>
                  <td>{window.web3.utils.fromWei(offering.RaisedAmt.toString(), 'Ether')} Eth</td>
                  <td>{window.web3.utils.fromWei(offering.goal.toString(), 'Ether')} Eth</td>
                  <td>{window.web3.utils.fromWei(offering.donUnit.toString(), 'Ether')} Eth</td>
                  <td>{offering.state ===0?"closed": "open"}</td>
                  <td>{offering.owner}</td>
                  <td>
                  { !offering.state===0
                    ?<button
                          name={offering.id}
                          value={offering.donUnit} //={(input) => { this.donUnit = input }}
                          onClick={(event) => {
                            //this.props.purchaseProduct(event.target.name, event.target.value)
                            this.props.buyOffering(event.target.name, event.target.value)

                          }}
                        >
                          buyOffering
                        </button>                    
                    : null}
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
