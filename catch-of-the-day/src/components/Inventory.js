import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object.isRequired,
        updateFish: PropTypes.func.isRequired,
        deleteFish: PropTypes.func.isRequired,
        loadSampleFishes: PropTypes.func.isRequired,
        storeId: PropTypes.string.isRequired
    };
    state = {
        uid: null,
        owner: null
    };
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        });
    }
    authHandler = async authData => {
        // Look up current store in firebase database
        // base.fetch() returns promise so await gives us the value
        const store = await base.fetch(this.props.storeId, { context: this });
        // Claim it if no owner
        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        // Set state of inventory component to reflect current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
    };
    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    };
    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null });
    };
    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>;
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        }
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you are not the owner!</p>
                    {logout}
                </div>
            );
        }
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm
                        key={key}
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}
                    />
                ))}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>
                    Load Sample Fishes
                </button>
            </div>
        );
    }
}

export default Inventory;
