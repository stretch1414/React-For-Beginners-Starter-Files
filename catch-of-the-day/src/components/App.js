import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };
    // Lifecycle method
    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeid);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }
    componentDidUpdate() {
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        );
    }
    componentWillUnmount() {
        // Destroy reference to prevent memory leaks
        base.removeBinding(this.ref);
    }
    addFish = fish => {
        // Take a copy of the existing state
        const fishes = { ...this.state.fishes };
        // Add new fish to fishes
        fishes[`fish${Date.now()}`] = fish;
        // Set new fishes to state
        this.setState({ fishes });
    };
    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };
    addToOrder = key => {
        // Take a copy of state
        const order = { ...this.state.order };
        // Add to order or update number in order
        order[key] = order[key] + 1 || 1;
        // Call setState to update state object
        this.setState({ order });
    };
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish
                                key={key}
                                index={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}
                            />
                        ))}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory
                    addFish={this.addFish}
                    loadSampleFishes={this.loadSampleFishes}
                />
            </div>
        );
    }
}

export default App;
