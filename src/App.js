import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Header from './components/header/header.component'
import Auth from './pages/sign-in-and-sign-up/auth.componet'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utils'

import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: null
        }
    }


    unsubscribeFromAuth = null;

    componentDidMount(){
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot( snapshot => {
                    this.setState({
                        currentUser: {
                            id: snapshot._key.path.segments[1],
                            ...snapshot.data()
                        }
                    }, () => {
                        console.log(this.state);
                    });
                    console.log(this.state);
                });
                
            } else {
                this.setState({curentUser: null});
            }
            
            createUserProfileDocument(userAuth);
            // this.setState({currentUser: user});
            // console.log(user);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/shop" component={ShopPage} />
                    <Route exact path="/signin" component={Auth} />
                </Switch>
            </div>
        );
    }
  
}

export default App;
