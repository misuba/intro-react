
var priceToUSDString = function(price) {
    return "$" + price.toFixed(2);
};


var ShoppingItemRow = React.createClass({displayName: "ShoppingItemRow",
    propTypes: {
        item: React.PropTypes.object
    },

    render: function() {
        var item = this.props.item;
        return React.createElement("li", null, 
            React.createElement("ul", null, 
                React.createElement("li", {className: "name"}, item.name), 
                React.createElement("li", {className: "quantity"}, 
                    React.createElement(NumberSpinner, {value: item.quantity, 
                                   onChange: this.onChangeQuantity}), 
                    item.quantity===0 ?
                        React.createElement("a", {className: "remove", onClick: this.removeItem}, "×")
                        :
                        null
                ), 
                React.createElement("li", {className: "price"}, 
                    priceToUSDString(item.quantity * item.price)
                )
            )
        );
    },

    onChangeQuantity: function(value) {
        fire(ListActions.changeQuantity(this.props.item.id, value));
    },

    removeItem: function() {
        fire(ListActions.removeItem(this.props.item.id));
    }
});


var ShoppingTotal = React.createClass({displayName: "ShoppingTotal",
    propTypes: {
        list: React.PropTypes.array
    },

    render: function() {
        var total = this.props.list.reduce(function(runningTotal, item) {
            return (item.price * item.quantity) + runningTotal;
        }, 0);
        return React.createElement("ul", {className: "total"}, 
            React.createElement("li", null, "Total"), 
            React.createElement("li", null, priceToUSDString(total))
        );
    }
});


var ShoppingList = React.createClass({displayName: "ShoppingList",
    propTypes: {
        list: React.PropTypes.array.isRequired
    },

    render: function() {
        var listComponents = this.props.list.map(function(item) {
            return React.createElement(ShoppingItemRow, {item: item, key: item.name});
        });

        return React.createElement("div", null, 
            React.createElement("ol", {className: "items"}, 
                listComponents.length ?
                    listComponents
                    :
                    React.createElement("li", {className: "empty"}, "No items")
            ), 
            React.createElement(ShoppingTotal, {list: this.props.list})
        );
    }
});
