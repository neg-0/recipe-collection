import { Component } from "react";

export default class Recipe extends Component {
    constructor(props) {
        super(props)
        this.state = { open: false }
    }

    toggleRecipe() {
        this.setState({ open: !this.state.open })
    }

    render() {
        return (
            <div onClick={() => this.toggleRecipe()}>
                <li key={this.props.key}>{this.props.recipe.name}
                    {this.state.open ? <p>{this.props.recipe.instructions}</p> : null}
                </li>
            </div>)
    }
}