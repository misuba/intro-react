
var priceToUSDString = function(price) {
    return "$" + price.toFixed(2);
};


var ShoppingItemRow = React.createClass({
    propTypes: {
        item: React.PropTypes.object
    },

    render: function() {
        var item = this.props.item;
        return <li>
            <ul>
                <li className="name">{item.name}</li>
                <li className="quantity">
                    <NumberSpinner value={item.quantity}
                                   onChange={this.onChangeQuantity} />
                    {item.quantity===0 ?
                        <a className="remove" onClick={this.removeItem}>×</a>
                        :
                        null}
                </li>
                <li className="price">
                    {priceToUSDString(item.quantity * item.price)}
                </li>
            </ul>
        </li>;
    },

    onChangeQuantity: function(value) {
        fire(ListActions.changeQuantity(this.props.item.id, value));
    },

    removeItem: function() {
        fire(ListActions.removeItem(this.props.item.id));
    }
});


var ShoppingTotal = React.createClass({
    propTypes: {
        list: React.PropTypes.array
    },

    render: function() {
        var total = this.props.list.reduce(function(runningTotal, item) {
            return (item.price * item.quantity) + runningTotal;
        }, 0);
        return <ul className="total">
            <li>Total</li>
            <li>{priceToUSDString(total)}</li>
        </ul>;
    }
});


var ShoppingList = React.createClass({
    propTypes: {
        list: React.PropTypes.array.isRequired
    },

    render: function() {
        var listComponents = this.props.list.map(function(item) {
            return <ShoppingItemRow item={item} key={item.name} />;
        });

        return <div>
            <ol className="items">
                {listComponents.length ?
                    listComponents
                    :
                    <li className="empty">No items</li>}
            </ol>
            <ShoppingTotal list={this.props.list} />
        </div>;
    }
});
