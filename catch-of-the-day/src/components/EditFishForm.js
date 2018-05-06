import React from 'react';

class EditFishForm extends React.Component {
    handleChange = event => {
        // Update the fish
        // Take a copy of current fish
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };
        // Call updateFish
        this.props.updateFish(this.props.index, updatedFish);
    };
    render() {
        return (
            <div className="fish-edit">
                <input
                    type="name"
                    name="name"
                    onChange={this.handleChange}
                    value={this.props.fish.name}
                />
                <input
                    type="price"
                    name="price"
                    onChange={this.handleChange}
                    value={this.props.fish.price}
                />
                <select
                    type="status"
                    name="status"
                    onChange={this.handleChange}
                    value={this.props.fish.status}
                >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea
                    name="desc"
                    onChange={this.handleChange}
                    value={this.props.fish.desc}
                />
                <input
                    type="image"
                    name="image"
                    onChange={this.handleChange}
                    value={this.props.fish.image}
                />
                <button onClick={() => this.props.deleteFish(this.props.index)}>
                    Remove Fish
                </button>
            </div>
        );
    }
}

export default EditFishForm;
