import React, { Component } from 'react';

export default  class MatchModal extends Component {

	showModal(order){
		if(order)
		return <div key={Math.random()} className="custom-modal">
		      <div className="custom-modal-content">
		       <span className="row">
					<span className="col-xs-6 title">
						<span className="modalTitle col-xs-12">Match Price</span>
						<span className="modalTitle col-xs-12">Buy Order</span>
						<span className="modalTitle col-xs-12">Sell Order</span>
						<span className="modalTitle col-xs-12">Quantity</span>
						<span className="modalTitle col-xs-12">Match Time</span>
					</span>
					<span className="col-xs-6">
						<span className="modalTitle col-xs-12">{order.matchPrice}</span>
						<span className="modalTitle col-xs-12">{order.buyId}</span>
						<span className="modalTitle col-xs-12">{order.sellId}</span>
						<span className="modalTitle col-xs-12">{order.matchedQuantity}</span>	
						<span className="modalTitle col-xs-12">{new Date(order.matchTime).toLocaleTimeString('en-GB')}</span>
					</span>
				</span>
				
		        <input type="button" className="custom-close" onClick={() => this.props.resetModal()} value="Ok" />
		      
		      </div>
		      
	        </div>
	}

	render(){
		let order = this.props.order;
		return(
			<div>
				{this.showModal(order)}
			</div>
		);
	}
}