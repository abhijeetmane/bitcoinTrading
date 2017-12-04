import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBuyOrders } from '../actions/index';
import MatchModal from './matchModal';

class BuyOrder extends Component {
    constructor(props) {
        super(props);
        const limit = 100;
        this.state = {total: [], buy: [], sell: [], match: [], showMatch:false, modal:[]}

        this.doStuff = () => {
            if (this.state.total.length < limit) {
                this.props.getBuyOrders(limit);
                if (this.props.buyOrder.length > 0) {
                    this.state.total = this.state.total.concat(this.props.buyOrder.slice(this.state.total.length));
                    const allOrders =
                        this.state.total.reduce((orderList, data) => {
                            orderList[data.type] = orderList[data.type] || [];
                            orderList[data.type].push(data);
                            return orderList;

                        }, []);
                    this.state.buy = allOrders.buy ? allOrders.buy : [];
                    this.state.sell = allOrders.sell ? allOrders.sell : [];
                    this.checkForMatch.call(this);
                }
            }
        }

        this.checkForMatch = function() {
            function sortById(a, b) {
                return a.id - b.id;
            }

            function updateQueue(obj1,obj2,matchPrice){
            	obj2.quantity = obj2.quantity - obj1.quantity;
                obj1.matchedQuantity=obj1.quantity;
                obj1.quantity = 0;
                obj1.mapped = true;
                obj1.matchPrice=matchPrice;
                obj1.sellOrder = obj2.price;
                obj1.buyOrder = obj1.price;
                obj1.buyId = obj1.id;
                obj1.sellId = obj2.id;
                obj1.matchTime =  Date();      
            }
            
            let buyOrders = [...this.state.buy.sort(sortById)];
            let sellOrders = [...this.state.sell.sort(sortById)];
            for (let [buyIndex, buy] of this.state.buy.sort(sortById).entries()) {
                for (let [sellIndex, sell] of this.state.sell.sort(sortById).entries()) {
                    let matchPrice = (buy.price + sell.price) / 2;
                    if (buy.price >= matchPrice && sell.price <= matchPrice) {
                        if (buy.quantity > 0 && sell.quantity > 0 && sell.quantity >= buy.quantity) {
                            updateQueue(buy,sell,matchPrice);
                            this.state.match.push(buy);
                        } else if (buy.quantity > 0 && sell.quantity > 0) {
                            updateQueue(sell,buy,matchPrice);
                            this.state.match.push(sell);
                        }
                    }
                }
            }
            this.state.buy = (buyOrders.filter((data) => data.quantity > 0)).sort((a,b) => a.price - b.price );
            this.state.sell = (sellOrders.filter((data) => data.quantity > 0)).sort((a,b) => b.price - a.price );
        }

        setInterval(this.doStuff, 1000);

    }

    showMatchedDetails(order){
    	if(order.mapped){
	    	this.setState({ showMatch: !this.state.showMatch });
	        let resetModal = () => this.setState({showMatch:!this.state.showMatch,modal:[]});
			const matchModal = <MatchModal key={Math.random()} order={order} resetModal={resetModal}/>;
			this.state.modal.push(matchModal);
		}
	}

	renderOrderQueue(queue,queueType){
		if(queue.length > 0)
		return queue.map(order => {
			return (
				<li className={"list-group-item col-xs-12 animateList "+ (queueType ? 'showModal':'' )} key={order.id} onClick={this.showMatchedDetails.bind(this,order)}>
					<span className={queueType ? 'col-xs-4':'hidden'}>{queueType ? (new Date(order.matchTime).toLocaleTimeString('en-GB')) : null}</span>
					<span className={queueType ? 'hidden':'col-xs-4'}>{queueType ? null : order.id}</span>
					<span className={queueType ? 'col-xs-4':'col-xs-4'}>{queueType ? order.matchedQuantity : order.quantity}</span>
					<span className={queueType ? 'col-xs-4':'col-xs-4'}>{queueType ? order.matchPrice : order.price}</span>
					
				</li>
			);
		});
		else return (<div className="loader"></div>);
	}

	

	renderTitleHeaders(queue,queueType){
		if(queue.length > 0)
			return (
			<li className="list-group-item col-xs-12">
			<span className={queueType ? 'col-xs-4':'hidden'}>{queueType ? 'Time' : null}</span>
				<span className={queueType ? 'hidden':'col-xs-4'}>{queueType ? null : 'Id'}</span>
				<span className={queueType ? 'col-xs-4':'col-xs-4'}>Quantity</span>
				<span className={queueType ? 'col-xs-4':'col-xs-4'}>Price</span>
				
			</li>
			);
	}

	
	render(){
		
		return (
			<div className="row">
				<div className="col-xs-12 col-sm-4 data-body">
					<div><span className="queueTitle">Buy Orders:</span></div>
					<div className="content-body">
						<ul>
							{this.renderTitleHeaders(this.state.buy)}
							{this.renderOrderQueue(this.state.buy.slice(0,20))}
						</ul>
					</div>
				</div>
				<div className="col-xs-12 col-sm-4 data-body">
					<div><span className="queueTitle">Sell Orders:</span></div>
					<div className="content-body">
						<ul>
							{this.renderTitleHeaders(this.state.sell)}
							{this.renderOrderQueue(this.state.sell.slice(0,20))}
						</ul>
					</div>
				</div>
				<div className="col-xs-12 col-sm-4 data-body">
					<div><span className="queueTitle">Match Trades:</span></div>
					<div className="content-body-match">
						<ul>
							{this.renderTitleHeaders(this.state.match,true)}
							{this.renderOrderQueue(this.state.match.slice(0,30),true)}
						</ul>
					</div>
				</div>
				{this.state.modal}
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		buyOrder : state.buyOrders
	}
}

export default connect(mapStateToProps,{ getBuyOrders })(BuyOrder);

