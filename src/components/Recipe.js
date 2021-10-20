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
            <li>
                <div onClick={() => this.toggleRecipe()}>
                    {this.props.recipe.name}
                </div>
                {this.state.open ? <p>{this.props.recipe.instructions}</p> : null}
            </li>)
    }
}