
var items = {
    0: {
        id: 0,
        name: 'Sleeping Bag w/ Stuff Sack',
        price: 44.99,
        description: 'Fill in some information about this product.'
    },
    1: {
        id: 1,
        name: 'Chocolate Energy Bar',
        price: 2.99,
        description: 'Fill in some information about this product.'
    },
    2: {
        id: 2,
        name: '2-Person Polyethylene Tent',
        price: 104.33,
        description: 'Fill in some information about this product.'
    }
};


var ShoppingApp = React.createClass({
    render: function() {
        return <main>
            <NavTabs />

            {AppStore.currentTab()==='items' ?
                <ItemCatalog startingItems={this.props.items} />
                :
                <ShoppingList ref="list" list={ListStore.getList()} />}
        </main>;
    },

    componentWillMount: function() {
        AppStore.addListener('change', this.update);
        ListStore.addListener('change', this.update);
    },

    componentWillUnmount: function() {
        AppStore.removeListener('change', this.update);
        ListStore.addListener('change', this.update);
    },

    update: function() {
        this.forceUpdate();
    }
})

document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        var renderShoppingList = function renderShoppingList() {
            React.render(<ShoppingApp items={items} />, document.getElementById('here'));
        };

        renderShoppingList();
        fire(ItemActions._rawSetItems(items));
    }
};
