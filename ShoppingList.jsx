
var priceToUSDString = function(price) {
    return "$" + price.toFixed(2);
};


var ShoppingItemQuantity = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired
    },

    render: function() {
        return <div><input className="spin-here" /></div>;
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


var ShoppingItemRow = React.createClass({
    propTypes: {
        item: React.PropTypes.object
    },

    render: function() {
        var item = this.props.item;
        return <li>
            <ul>
                <li className="name">{item.get('name')}</li>
                <li className="quantity">
                    <ShoppingItemQuantity item={item}
                                          onChange={this.onChangeQuantity} />
                </li>
                <li className="price">
                    {priceToUSDString(item.get('quantity') * item.get('price'))}
                </li>
            </ul>
        </li>;
    },

    onChangeQuantity: function(event, ui) {
        this.props.item.set('quantity', ui ? ui.value : event.target.value);
    }
});


var ShoppingTotal = React.createClass({
    propTypes: {
        collection: React.PropTypes.object
    },

    render: function() {
        var total = this.props.collection.reduce(function(runningTotal, item) {
            return (item.get('price') * item.get('quantity')) + runningTotal;
        }, 0);
        return <ul className="total">
            <li>Total</li>
            <li>{priceToUSDString(total)}</li>
        </ul>;
    }
});


var ShoppingList = React.createClass({
    propTypes: {
        collection: React.PropTypes.object.isRequired
    },

    render: function() {
        return <div>
            <ol className="items">
                {this.props.collection.map(function(item) {
                    return <ShoppingItemRow item={item} />;
                })}
            </ol>
            <ShoppingTotal collection={this.props.collection} />
        </div>;
    }
});
