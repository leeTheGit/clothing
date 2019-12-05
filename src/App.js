import React from 'react';
import {Switch, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './components/header/header.component'
import Auth from './pages/sign-in-and-sign-up/auth.componet'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import {setCurrentUser} from './redux/user/user.actions'
import './App.css';

class App extends React.Component {


    unsubscribeFromAuth = null;

    componentDidMount(){

        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot( snapshot => {
                    setCurrentUser({
                        id: snapshot._key.path.segments[1],
                        ...snapshot.data()
                    });
                });
                
            } else {
                setCurrentUser( null );
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
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/shop" component={ShopPage} />
                    <Route exact path="/signin" component={Auth} />
                </Switch>
            </div>
        );
    }
  
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
