
var priceToUSDString = function(price) {
    return "$" + price.toFixed(2);
};


var ShoppingItemQuantity = React.createClass({displayName: "ShoppingItemQuantity",
    propTypes: {
        item: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired
    },

    render: function() {
        return React.createElement("div", null, React.createElement("input", {className: "spin-here"}));
    },

    spinnerInput: function() {
        return $('.spin-here', this.getDOMNode());
    },

    componentDidMount: function() {
        var spinnerInput = this.spinnerInput();
        spinnerInput.spinner({
            min: 0,
            spin: this.props.onChange
        });
        spinnerInput.spinner('value', this.props.item.get('quantity'));
        spinnerInput.on('change', this.props.onChange);
    },

    componentWillReceiveProps: function(nextProps) {
        this.spinnerInput()
            .spinner('value', nextProps.item.get('quantity'));
    },

    shouldComponentUpdate: function(nextProps) {
        return false;
    },

    componentWillUnmount: function() {
        this.spinnerInput().spinner('destroy');
    }
});


var ShoppingItemRow = React.createClass({displayName: "ShoppingItemRow",
    propTypes: {
        item: React.PropTypes.object
    },

    render: function() {
        var item = this.props.item;
        return React.createElement("li", null, 
            React.createElement("ul", null, 
                React.createElement("li", {className: "name"}, item.get('name')), 
                React.createElement("li", {className: "quantity"}, 
                    React.createElement(ShoppingItemQuantity, {item: item, 
                                          onChange: this.onChangeQuantity})
                ), 
                React.createElement("li", {className: "price"}, 
                    priceToUSDString(item.get('quantity') * item.get('price'))
                )
            )
        );
    },

    onChangeQuantity: function(event, ui) {
        this.props.item.set('quantity', ui ? ui.value : event.target.value);
    }
});


var ShoppingTotal = React.createClass({displayName: "ShoppingTotal",
    propTypes: {
        collection: React.PropTypes.object
    },

    render: function() {
        var total = this.props.collection.reduce(function(runningTotal, item) {
            return (item.get('price') * item.get('quantity')) + runningTotal;
        }, 0);
        return React.createElement("ul", {className: "total"}, 
            React.createElement("li", null, "Total"), 
            React.createElement("li", null, priceToUSDString(total))
        );
    }
});


var ShoppingList = React.createClass({displayName: "ShoppingList",
    propTypes: {
        collection: React.PropTypes.object.isRequired
    },

    render: function() {
        return React.createElement("div", null, 
            React.createElement("ol", {className: "items"}, 
                this.props.collection.map(function(item) {
                    return React.createElement(ShoppingItemRow, {item: item});
                })
            ), 
            React.createElement(ShoppingTotal, {collection: this.props.collection})
        );
    }
});
