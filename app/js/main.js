import React from 'react';
import ReactDOM from 'react-dom';

const state = {
  one: 'Pete',
  names: ['Pete', 'Paul', 'Mary'],
  colors: ['green', 'blue', 'purple'],
  chucks: [{'name':'Pete','color':'blue','fun':'yes'}, {'name':'Paul','color':'green','fun':'yes'}, {'name':'Mary','color':'purple','fun':'yes'}],
  chucks2: [{'name':'Pete3','color':'blue3','fun':'yes'}, {'name':'Paul3','color':'green3','fun':'yes'}, {'name':'Mary','color':'purple3','fun':'yes'}],
  fun: 'yes',
  name: 'mary'
};

const ChuckItems = React.createClass({
  render() {
    return (
      <li
        className="list-group-item"
        >
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
        className="list-group"
        >
        {output}
      </ul>
    )
  }
});

const InsertName = React.createClass({
  render() {
      return (
        <li
          className="list-group-item"
          >
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
      <ul
        className="list-group"
        >
        { output }
      </ul>
    )
  }
});

const FindNameInDB = React.createClass({
    getInitialState() {
      return {
        goodies: []
      };
    },

    componentWillMount() {
      this.serverRequest = fetch('/dbFindName', {
          headers: {
            'Content-Type': 'application/json'
          },
          method: "post",
          body: JSON.stringify({name: this.props.name})
        })
        .then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data)
          this.setState({
            goodies: data.fun +', '+ data.name +' likes '+ data.color
          });
        }).catch((err) => {
          throw new Error(err);
        });
    },
    componentWillUpdate() {
      this.serverRequest;
    },

    // componentWillUnmount() {
    //   this.serverRequest.abort();
    // },

    render: function() {
      return (
        <div
          className="well text-center"
          >
          <h3>Our Data</h3>
          <h4
            className="capitalize"
            >
            {this.state.goodies}
          </h4>
        </div>
      );
    }
});

const EnterNameToSearch = React.createClass({
  search_db() {
    console.log(ReactDOM.findDOMNode(this.refs.search).value);
    <FindNameInDB name={ReactDOM.findDOMNode(this.refs.search).value} />
  },
  render() {
    return(
      <div
        className="input-group"
        >
        <input
          type="text"
          className='form-control'
          ref="search"
          />
        <span
          className="input-group-btn"
          >
          <button
            className="btn btn-info"
            onClick={this.search_db}
            >
            Search
          </button>
        </span>

      </div>
    )
  }
});

const GetAllFromDB = React.createClass({
    getInitialState() {
      return {
        goodies: []
      };
    },

    componentWillMount() {
      this.serverRequest = fetch('/dbGetAllNames')
        .then((response) => {
          return response.json();
        }).then((data) => {
          //console.log(data)
          this.setState({
            goodies: data
          });
        }).catch((err) => {
          throw new Error(err);
        });
    },

    componentWillUnmount() {
      this.serverRequest.abort();
    },

    render: function() {
      const output = this.state.goodies.map(function(vals) {
        return <ChuckItems data={vals} key={vals.name}/>
      })
      return (
        <div
         className="panel panel-default"
         >
          <div
            className="panel-heading"
            >
            From the DB
          </div>
          <ul
            className="list-group"
            >
            {output}
          </ul>
        </div>
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
        onClick={this.clicking}
        >
        Hello
      </button>
    );
  }
});

const TitleImg = React.createClass({
  render() {
    return (
      <img
        className="title-img"
        src={"../images/petelogo.png"}
        alt="PetePlays"
        />
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
      <div
        className="container content-style"
        >
        <TheTitle />
        <SayingHello />
        <GetAllFromDB />
        <EnterNameToSearch />
        <FindNameInDB name={this.props.state.name}/>
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

