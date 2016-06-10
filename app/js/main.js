import React from 'react';
import ReactDOM from 'react-dom';

const state = {
  one: 'Pete',
  names: ['Pete', 'Paul', 'Mary'],
  colors: ['green', 'blue', 'purple'],
  chucks: [{'name':'Pete','color':'blue','fun':'yes'}, {'name':'Paul','color':'green','fun':'yes'}, {'name':'Mary','color':'purple','fun':'yes'}],
  chucks2: [{'name':'Pete3','color':'blue3','fun':'yes'}, {'name':'Paul3','color':'green3','fun':'yes'}, {'name':'Mary','color':'purple3','fun':'yes'}],
  fun: 'yes',
  goodies: ''
};

const ChuckItems = React.createClass({
  render() {
    return (
      <li
        className="list-group-item" >
        {this.props.data.name} likes {this.props.data.color}, {this.props.data.fun}
      </li>
    );
  }
});

const ShowChucks = React.createClass({
  render() {
    const output = this.props.data.map(function(vals) {
      return <ChuckItems data={vals} key={vals.name}/>
    })
    return (
      <ul
        className="list-group" >
        {output}
      </ul>
    )
  }
});

const InsertName = React.createClass({
  render() {
      return (
        <li
          className="list-group-item">
          This is {this.props.data}'s first guitar!
        </li>
      );
  }
});

const SomeStateData = React.createClass({
  render() {
    const output = this.props.name.map(function(name) {
      return <InsertName data={name} key={name}/>
    })
    return(
      <ul className="list-group">
        { output }
      </ul>
    )
  }
});

const ClickTest = React.createClass({
    getInitialState: function() {
      return {
        goodies: ''
      };
    },

    componentWillMount: function() {
      this.serverRequest = fetch('/dbGetAllNames')
        .then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data)
          this.setState({
            goodies: data[1].name
          });
        }).catch((err) => {
          throw new Error(err);
        });
    },

    componentWillUnmount: function() {
      this.serverRequest.abort();
    },

    render: function() {
      return (
        <h2
          className="text-center"
          >
          Your name...
          {this.state.goodies}
        </h2>
      );
    }
});

const SayingHello = React.createClass({
  clicking() {
    alert('Hello!!!!!');
  },
  render() {
    return (
      <button
        className="btn btn-primary text-center"
        onClick={this.clicking}>
        Hello
      </button>
    );
  }
});

const TitleImg = React.createClass({
  render() {
    return (
      <img className="title-img" src={"../images/petelogo.png"} alt="PetePlays"/>
    );
  }
});

const TitleName = React.createClass({
  render() {
    return (
      <h1
        className="text-center"
        >
        PetePlays
      </h1>
    );
  }
});

const TheTitle = React.createClass({
  render() {
    return (
      <div>
        <TitleImg />
        <TitleName />
      </div>
    );
  }
});

const Main = React.createClass({
  render() {
    return (
      <div className="container content-style">
        <TheTitle />
        <SayingHello />
        <ClickTest />
        <SomeStateData name={this.props.state.names} />
        <ShowChucks data={this.props.state.chucks} />
        <ShowChucks data={this.props.state.chucks2} />
      </div>
    );
  }
});

ReactDOM.render(
  <Main state={state}></Main>,
  document.getElementById('app')
);


// const db = require('../../resources/db/mongodb/mongoDBUI.js');
// db($scope, $http);

