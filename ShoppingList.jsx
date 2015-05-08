
var priceToUSDString = function(price) {
    return "$" + price.toFixed(2);
};

var ShoppingItemRow = React.createClass({
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
            fields.push(<li className={fieldName} key={fieldName}>{value}</li>);
        }

        return <li>
            <ul>{fields}</ul>
        </li>;
    }
});

var ShoppingTotal = React.createClass({
    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    render: function() {
        var total = this.props.items.reduce(function(runningTotal, item) {
            return item.price + runningTotal;
        }, 0);
        return <ul className="total">
            <li>Total</li>
            <li>{priceToUSDString(total)}</li>
        </ul>;
    }
});


var ShoppingList = React.createClass({
    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    render: function() {
        return <div>
            <ol className="items">
                {this.props.items.map(function(item) {
                    return <ShoppingItemRow item={item} />;
                })}
            </ol>
            <ShoppingTotal {...this.props} />
        </div>;
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

React.render(<ShoppingList items={itemList} />, document.getElementById('here'));
