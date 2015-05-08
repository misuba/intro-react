
var ItemEditForm = React.createClass({displayName: "ItemEditForm",
    render: function() {
        return React.createElement("form", null, 
            React.createElement("article", null, 
                React.createElement("p", null, React.createElement("label", null, "Name:"), 
                    React.createElement("input", {type: "text", 
                        ref: "name", 
                        defaultValue: this.props.item.name})), 
                React.createElement("p", null, React.createElement("label", null, "Description:"), 
                    React.createElement("input", {type: "text", 
                        ref: "description", 
                        defaultValue: this.props.item.description})), 
                React.createElement("p", null, React.createElement("label", null, "Price:"), 
                    React.createElement("input", {type: "text", 
                        ref: "price", 
                        defaultValue: this.props.item.price})), 
                React.createElement("button", {onClick: this.save}, "Save")
            )
        );
    },

    save: function(event) {
        event.preventDefault();
        fire(ItemActions.edit(this.props.item.id, {
            id: this.props.item.id,
            name: this.refs.name.getDOMNode().value,
            description: this.refs.description.getDOMNode().value,
            price: parseFloat(this.refs.price.getDOMNode().value)
        }));
        this.props.onSave(null);
    }
});

var ItemListing = React.createClass({displayName: "ItemListing",
    getInitialState: function() {
        return { quantity: 1 };
    },

    render: function() {
        return React.createElement("div", null, 
            React.createElement("article", null, 
                React.createElement("h3", null, this.props.item.name), 
                React.createElement("p", null, this.props.item.description), 
                React.createElement("p", {className: "price"}, 
                    "Price:", React.createElement("br", null), 
                    React.createElement("strong", null, priceToUSDString(this.props.item.price))
                ), 
                React.createElement("a", {href: "#", onClick: this.edit, className: "edit"}, "Edit")
            ), 
            React.createElement("aside", null, 
                React.createElement("p", {className: "quantity"}, 
                    "Quantity:", React.createElement("br", null), 
                    React.createElement(NumberSpinner, {value: this.state.quantity, 
                                   onChange: this.setQuantity})
                ), 
                React.createElement("button", {onClick: this.addItem}, "Add to List")
            )
        );
    },

    setQuantity: function(value) {
        this.setState({quantity: value});
    },

    addItem: function() {
        fire(ListActions.addItem(this.props.item.id, this.state.quantity));
    },

    edit: function() {
        this.props.onEdit(this.props.item.id);
    }
});

var ItemCatalog = React.createClass({displayName: "ItemCatalog",
    getInitialState: function() {
        return {
            editing: null,
            items: ItemStore.getAll()
        };
    },

    render: function() {
        return React.createElement("section", {className: "catalog"}, 
            this.state.items.map(function(item) {
                if (this.state.editing === item.id) {
                    return React.createElement(ItemEditForm, {item: item, key: item.id, onSave: this.onEdit});
                } else {
                    return React.createElement(ItemListing, {item: item, key: item.id, onEdit: this.onEdit});
                }
            }.bind(this))
        );
    },

    componentWillMount: function() {
        ItemStore.addListener('change', this.onStoreChange);
    },

    componentWillUnmount: function() {
        ItemStore.removeListener('change', this.onStoreChange);
    },

    onEdit: function(itemIdOrNull) {
        this.setState({editing: itemIdOrNull});
    },

    onStoreChange: function() {
        this.setState({items: ItemStore.getAll()});
    }
});
