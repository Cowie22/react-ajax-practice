import React from 'react'
import $ from 'jquery'

class App extends React.Component {
	constructor(props) {
	super(props);

	this.state = {
		name: '',
		message: '',
		response: ''
	};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

	}
	handleNameChange(event) {
		this.setState({name: event.target.value});
	}
	handleMessageChange(event) {
		this.setState({message: event.target.value});
	}
	handleSubmit(event) {
		event.preventDefault();
        var currentName = this.state.name;
        var currentMessage = this.state.message;

        var data = {
        	"name": currentName,
        	"message": currentMessage
        };
        const url = 'http://ec2-13-57-25-101.us-west-1.compute.amazonaws.com:3000/api/hrsf110/greeting'
        console.log(this, 'what is this at this point')
        $.ajax({
        	type: 'POST',
        	url: 'http://ec2-13-57-25-101.us-west-1.compute.amazonaws.com:3000/api/hrsf110/greeting',
        	data: JSON.stringify(data),
        	contentType: "application/json",
        	success: function(data) {
        		console.log(data)
        		this.setState({response: data});
        	}.bind(this),
        	error: function(request, error) {
        		console.log(JSON.stringify(request))
        		console.log(error, 'this isthe error')
        	},
        })
    	// return fetch(url, {
    	// 	method: 'POST',
    	// 	headers: {
    	// 		"Content-Type": 'application/json',
    	// 		"Data-Type": 'application/json'
    	// 	},
    	// 	body: JSON.stringify(data)
    	// })
    	// .then(res => {
    	// 	console.log(res)
    	// 	return res.text()
    	// })
    	// .then(data => this.setState({ 'response' : data }))
	}
  render() {
	return (
	<div>
	  <div>
	  	{this.state.response}
	  </div>
      <form onSubmit={this.handleSubmit}>
        <label>
        	Name:
        	<input type="text" value={this.state.name} onChange={this.handleNameChange}/>
        </label>
        <label>
        	Message:
        	<input type="text" value={this.state.message} onChange={this.handleMessageChange}/>
        </label>
        <input type="submit" value="Submit" />

      </form>
    </div>
  )
}
};

export default App