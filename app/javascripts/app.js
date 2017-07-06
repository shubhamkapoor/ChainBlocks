//  Load bootstrap
require("expose-loader?$!expose-loader?jQuery!jquery");
require("expose-loader?Tether!tether");
require("bootstrap");
//  Load the css file
require("../stylesheets/app.css");
require("../stylesheets/box.css");
//  Connect to node using web3
var Connection = require("./connect");
Connection.start();

import React, { PropTypes } from "react";
var ReactDOM = require("react-dom");
const Modal = require("./Modal");

var mountNode = document.getElementById("grid");

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =  hour + ':' + min + ':' + sec ;
  return time;
}

class Blocks extends React.Component {
  render() {
    return (
      <div className="col-12">
        <div className={"card mt-5 p-3 text-center text-gray-dark bg-"+this.props.color}>
          <div className="card-block">
            <h4 className="card-title">Block #{this.props.number}</h4>
            <h6 className="card-subtitle text-muted">Generated at {this.props.timeStamp}</h6>
            <p className="card-text mt-3">Number of Transactions: {this.props.txNumber}</p>
          </div>
          <a
            className="btn mx-auto btn-info rounded"
            href="#"
            data-toggle="modal"
            data-target={"#myModal-" + this.props.number}>
            View Block Details
          </a>
        </div>

        <Modal
          identity={"myModal-" + this.props.number}
          blockData={this.props.block}
        />
      </div>
    );
  }
}

var lastBlock = 0;
var timeSinceLastBlock = 0;
var myVar;
myFunction();

function myFunction() {
  myVar = setInterval(alertFunc, 1000);
}

function alertFunc() {
  timeSinceLastBlock++;
  if (lastBlock != web3.eth.blockNumber) {
    lastBlock = web3.eth.blockNumber;
    addBlock(lastBlock);
    timeSinceLastBlock = 0;
  }
  ReactDOM.render(
    <LastBlockTime time={timeSinceLastBlock} />,
    document.getElementById("lastBlockTime")
  );
}

function addBlock(i) {
  var info = web3.eth.getBlock(i);
  var blockNumber = info.number;
  var txNo = info.transactions.length;
  var idVal = "box-" + blockNumber;
  var time = timeConverter(info.timestamp);
  var col ="secondary"
  if (txNo>0) {
    col = "warning"
  }

  $("#grid").append('<div id="box-' + blockNumber + '"></div>');

  ReactDOM.render(
    <Blocks number={blockNumber} block={info} timeStamp = {time} txNumber={txNo} color={col}/>,
    document.getElementById(idVal)
  );


}

// for (var i = web3.eth.blockNumber-9; i < web3.eth.blockNumber; i++) {
//   addBlock(i)
// }

function LastBlockTime(props){
  return (
  <p className="lead text-center">
      Time since last block : {props.time} seconds
    </p>
)}
