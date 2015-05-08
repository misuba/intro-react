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

document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        var renderShoppingList = function renderShoppingList(coll) {
            React.render(<ShoppingList collection={coll} />,
                document.getElementById('here'));
        };

        var ShoppingItem = Backbone.Model.extend();

        var ShoppingItemsCollection = Backbone.Collection.extend({
            model: ShoppingItem,

            initialize: function() {
                this.on('change', function() {
                    renderShoppingList(this);
                }.bind(this));
            }
        });

        var shoppingList = new ShoppingItemsCollection(itemList);
        renderShoppingList(shoppingList);
    }
};
