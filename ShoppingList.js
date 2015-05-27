var priceToUSDString = function(price) {
    return "$" + price.toFixed(2);
};

var ShoppingItemRow = React.createClass({
    render: function() {
        return React.DOM.li({},
            React.DOM.ul({},
                React.DOM.li({className: 'name'}, this.props.item.name),
                React.DOM.li({className: 'quantity'}, this.props.item.quantity),
                React.DOM.li({className: 'price'},
                    priceToUSDString(this.props.item.price)
                )
            )
        );
    }
});
var ShoppingItemRowComponent = React.createFactory(ShoppingItemRow);

var ShoppingTotal = React.createClass({
    render: function() {
        var total = 0;
        var item;
        for (var itemNum in this.props.items) {
            item = this.props.items[itemNum];
            total += item.price;
        }

        return React.DOM.ul({className: 'total'},
            React.DOM.li({}, "Total"),
            React.DOM.li({}, priceToUSDString(total))
        );
    }
});
var ShoppingTotalComponent = React.createFactory(ShoppingTotal);


var ShoppingList = React.createClass({
    render: function() {
        var itemRows = this.props.items.map(function(item) {
            return ShoppingItemRowComponent({item: item, key: item.name});
        });

        return React.DOM.div({},
            React.DOM.ol({className: "items"},
                itemRows
            ),
            ShoppingTotalComponent({items: this.props.items})
        );
    }
});
var ShoppingListComponent = React.createFactory(ShoppingList);

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

React.render(ShoppingListComponent({items: itemList}),
             document.getElementById('here'));
