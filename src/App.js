import React, {Component}  from 'react';
import Mission from './components/Mission.js';
// import FullRating from './components/FullRating.js'
import NewRating from './components/NewRating.js';
import MenuDisplay from './components/MenuDisplay.js';
import AdminPage from './components/AdminPage.js';
import Home from './components/Home.js'

import { Button, Jumbotron, Navbar, Nav, FormControl, NavDropdown, Form, Card, Container, ListGroup } from 'react-bootstrap';
import './App.css';
import axios from "axios"
import Logo from "./logo.png"
import LifeLogo from "./lifelogo.png"
import SustainableFare from "./sustainablefare.png"



import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link
} from "react-router-dom";
import { Redirect, IndexRedirect } from "react-router-dom";

var uploadURL = window.CURRENT_HOST + "complete_meal";
var completedMealsURL = window.CURRENT_HOST + "completed_meals";
var rateURL = window.CURRENT_HOST + "receive_rating";

var is_admin = window.admin

var menu = {
  "Breakfast":{
    "date":"August 19",
    "time":0,
    "title":"Breakfast - August 19",
    "items":["Belgium Waffles", "Homefried Potatoes", "Sausage Links", "Assorted Pastries"],
    "type":"breakfast"
  },
  "Lunch":{
    "date":"August 19",
    "time":0,
    "title":"Lunch - August 19",
    "items":["French Onion Soup", "Mako Shark Tacos", "Kale Sautee", "Ice Cream"],
    "type":"breakfast"
  },
  "Dinner":{
    "date":"August 19",
    "time":0,
    "title":"Dinner - August 19",
    "items":["Flank Steak", "Mashed Potatoes", "Seasonal Vegetables", "Ice Cream"],
    "type":"breakfast"
  }
}

if(window.menu.length > 100){
  menu = JSON.parse(window.menu.replace(new RegExp('u&#39;', 'g'),'"').replace(new RegExp('&#39;', 'g'),'"'))
}

class App extends Component{

  constructor(props){
    super(props)
    this.state={
      ratings_input:[],
      submit_detector:0,
      ready_to_send:false,
      completed:[true,true,true]
    }
  }

  renderSignInButton(){
    if(window.user_email){
      return(
        <Navbar.Text>
          <a href="/logout"><Button variant="outline" id="sign-in-button">Sign Out</Button></a>
        </Navbar.Text>
      )}
      else{
        return(
          <Navbar.Text>
            <a href="/auth/google"><Button variant="outline" id="sign-in-button">Sign In</Button></a>
          </Navbar.Text>
        )
      }
    }

  renderGreeting(){
    if(window.user_name){
      return(
        <h1 className="greeting">Welcome {window.user_name}, what do you think about the dining hall today?</h1>
      )
    }
    else{
      return(
        <p className="sign-in-prompt">You must sign in with an Lville account in order to be able to rate the food.</p>
      )
    }
  }

  renderRating(){
    return(
      <div>
        {
          Object.keys(menu).map((meal_type) => {
            return(
              <Card style={{"marginLeft":30, "marginRight":30, "marginTop":30}}>
                <Card.Header className="menu-title"><h4 style={{"margin":15}}>{menu[meal_type].title}</h4></Card.Header>
                <ListGroup variant="flush">
                  {menu[meal_type].items.map((item) => {
                    if(window.user_name){
                      return(<NewRating item={item}/>)
                    }
                    else{
                      return(<MenuDisplay item={item}/>)
                    }
                  })}
                </ListGroup>
              </Card>

            )
          })}
      </div>
    )
  }

  readyToSend(){
    this.setState({ready_to_send:true})
  }

  render(){
      return (
      <div className="App">
        <HashRouter>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
          />
          <Navbar bg="light" expand="lg" color="red">
            <Navbar.Brand href="#home">
              <img src={LifeLogo} className='lville'/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#forms">Forms</Nav.Link>
                <Nav.Link href="#mission">Mission</Nav.Link>
                {window.admin ? <Nav.Link href="#admin">Admin Page</Nav.Link>:<div/>}
              </Nav>
              {this.renderSignInButton()}
            </Navbar.Collapse>
          </Navbar>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/forms" render={() => <div>{this.renderGreeting()}{this.renderRating()}</div>}/>
          <Route path="/admin" component={AdminPage} />
          <Route path="/mission" component={Mission} />
          <Route path="/home" component={Home} />
        </HashRouter>
        <div class="footer">
        <img src={Logo} className="lvillelogo"/>
        <img src={SustainableFare} className="sustainable"/>
      {/* <span className="copyright">LIFE Surveys © 2019</span> */}
        </div>
      </div>
    );
  }
}

export default App;
