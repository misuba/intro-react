
var ItemEditForm = React.createClass({
    render: function() {
        return <form>
            <article>
                <p><label>Name:</label>
                    <input type="text"
                        ref="name"
                        defaultValue={this.props.item.name} /></p>
                <p><label>Description:</label>
                    <input type="text"
                        ref="description"
                        defaultValue={this.props.item.description} /></p>
                <p><label>Price:</label>
                    <input type="text"
                        ref="price"
                        defaultValue={this.props.item.price} /></p>
                <button onClick={this.save}>Save</button>
            </article>
        </form>;
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

var ItemListing = React.createClass({
    getInitialState: function() {
        return { quantity: 1 };
    },

    render: function() {
        return <div>
            <article>
                <h3>{this.props.item.name}</h3>
                <p>{this.props.item.description}</p>
                <p className="price">
                    Price:<br />
                    <strong>{priceToUSDString(this.props.item.price)}</strong>
                </p>
                <a href="#" onClick={this.edit} className="edit">Edit</a>
            </article>
            <aside>
                <p className="quantity">
                    Quantity:<br />
                    <NumberSpinner value={this.state.quantity}
                                   onChange={this.setQuantity} />
                </p>
                <button onClick={this.addItem}>Add to List</button>
            </aside>
        </div>;
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

var ItemCatalog = React.createClass({
    getInitialState: function() {
        return {
            editing: null,
            items: ItemStore.getAll()
        };
    },

    render: function() {
        return <section className="catalog">
            {this.state.items.map(function(item) {
                if (this.state.editing === item.id) {
                    return <ItemEditForm item={item} key={item.id} onSave={this.onEdit} />;
                } else {
                    return <ItemListing item={item} key={item.id} onEdit={this.onEdit} />;
                }
            }.bind(this))}
        </section>;
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
