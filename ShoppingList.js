
var priceToUSDString = function(price) {
    return "$" + price.toFixed(2);
};

var ShoppingItemRow = React.createClass({displayName: "ShoppingItemRow",
    propTypes: {
        item: React.PropTypes.object
    },

    render: function() {
        var fields = [];
        var value;
        for (var fieldName in this.props.item) {
            value = this.props.item[fieldName];
            if (fieldName === 'price') {
                value = priceToUSDString(value);
            }
            fields.push(React.createElement("li", {className: fieldName, key: fieldName}, value));
        }

        return React.createElement("li", null, 
            React.createElement("ul", null, fields)
        );
    }
});

var ShoppingTotal = React.createClass({displayName: "ShoppingTotal",
    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    render: function() {
        var total = this.props.items.reduce(function(runningTotal, item) {
            return item.price + runningTotal;
        }, 0);
        return React.createElement("ul", {className: "total"}, 
            React.createElement("li", null, "Total"), 
            React.createElement("li", null, priceToUSDString(total))
        );
    }
});


var ShoppingList = React.createClass({displayName: "ShoppingList",
    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    render: function() {
        return React.createElement("div", null, 
            React.createElement("ol", {className: "items"}, 
                this.props.items.map(function(item) {
                    return React.createElement(ShoppingItemRow, {item: item});
                })
            ), 
            React.createElement(ShoppingTotal, React.__spread({},  this.props))
        );
    }

});


var itemList = [
    {
        name: 'Sleeping Bag w/ Stuff Sack',
        quantity: 1,
        price: 44.99
    },
    {
        name: 'Chocolate Energy Bar',
        quantity: 4,
        price: 2.99 * 4
    },
    {
        name: '2-Person Polyethylene Tent',
        quantity: 1,
        price: 104.33
    }
];

React.render(React.createElement(ShoppingList, {items: itemList}), document.getElementById('here'));
