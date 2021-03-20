import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { TransitionGroup, Transition } from "react-transition-group";
import { play, exit } from './timelines'

import Home from './MuralView'
import NFTView from './NFTView'
import Minter from './Minter'
import Upload from './Upload'
import Nav from './nav.js'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
         

<Route render={({location}) => 
{
    const { pathname, key } = location

    //const query = new URLSearchParams(location.search);
    
   
    return (

        <TransitionGroup component={null}>
              <Transition
                key={key}
                appear={true}
                onEnter={(node, appears) => play(pathname, node, appears)}
                timeout={{enter: 750, exit: 0}}
              >

                <Switch location={location}>
                    <Route exact path="/" component={Home}/>
                    <Route path="/mural" component={Home}/>
                    <Route path="/nftview" component={NFTView} />
                    <Route path="/mint" component={Minter} />
                    <Route path="/upload" component={Upload} />

                </Switch>
                </Transition>
        </TransitionGroup>
          )
}} />

        </div>
      </BrowserRouter>
    )
  }


}


export default App;



