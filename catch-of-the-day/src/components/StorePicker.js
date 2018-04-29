import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    constructor() {
        super();
        this.myInput = React.createRef();
    }
    goToStore = event => {
        // Stop form from submitting
        event.preventDefault();
        // Get text from input
        const storeName = this.myInput.value.value;
        // Change page to /store/entered-store-name
        this.props.history.push(`/store/${storeName}`);
    };
    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                {/* comment */}
                <h2>Please Enter A Store:</h2>
                <input
                    type="text"
                    ref={this.myInput}
                    required
                    placeholder="Store Name"
                    defaultValue={getFunName()}
                />
                <button type="submit">Visit Store</button>
            </form>
        );
    }
}

export default StorePicker;
