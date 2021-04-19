import React from "react";
import axios from "axios";

import Tweet from './tweet'

import '../styles/rep_page.css'


class RepPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      tweets: [],
      user: [],
      loading: true,
      messages: [],
      errors: []
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({name: params.name})
    this.getRepInfo(params.name)
  }


  getRepInfo(name) {
    axios
      .get(`/rep_info/${name}`)
      .then((res) => {
        this.setState({tweets: res.data.tweets, user: res.data.user})
        this.setState({loading: false})
      })
      .catch((error) => {
        this.addError(error.response.data.error)
        this.setState({loading: true})
      })
      .then(() => {
        this.clearMessages()
      });
  }

  addMessage(message){
    this.setState({messages: this.state.messages.concat([message])})
  }

  addError(error){
    this.setState({errors: this.state.errors.concat([error])})
  }

  clearMessages() {
    setInterval(
      () => this.setState({messages: [], errors: []})
      , 5000);
  }


  render() {
    return (
      <div className='rep'>
        <h1>{this.state.name}</h1>
        {this.state.messages ? this.state.messages.map( message => 
          <p key={message} style={{color:"green"}}>{message}</p>
        ): null}
        {this.state.errors ? this.state.errors.map( error => 
          <p key={error} style={{color:"red"}}>{error}</p>
        ): null}
        {this.state.loading ? <p>Loading ...</p> : 
          <div>
            <h3>Twitter</h3><p><a href={this.state.user.twitter_link} target='_blank' rel="noreferrer">{this.state.user.twitter_handle}</a></p>
            <h3>Instagram</h3>
            <p><a href={this.state.user.instagram_link} target='_blank' rel="noreferrer">{this.state.user.instagram_handle}</a></p>
            <h3>Facebook</h3>
            <p><a href={this.state.user.facebook_link} target='_blank' rel="noreferrer">Page</a></p>
            <h3>Tweets</h3>
            {this.state.tweets.length ?  
              this.state.tweets.map( tweet => 
                  <Tweet props={tweet} key={tweet.id}></Tweet>
              )
            : null}
          </div>
        }
      </div>
    );
  }
}

export default RepPage;
