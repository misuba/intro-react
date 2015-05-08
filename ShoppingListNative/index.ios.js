'use strict';

var React = require('react-native');
var {
    AppRegistry,
    NavigatorIOS,
    PickerIOS,
    ScrollView,
    StyleSheet,
    TabBarIOS,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} = React;

/*
For those of you who are slightly less easily impressed than I was when we taped
the course, this is an expanded version of our React Native demo. Much of the
functionality of the ShoppingList app is here; I didn't go ahead with editing
items; I also didn't base this on the Flux app, even though our Stores and
ActionFactories would probably run here without changes. Instead, the
ShoppingListTabs component's state holds data, and the Items are static, because
there's no edit mode. Read on for more thoughts on nativity as they arise.
*/

var priceToUSDString = function(price) {
    return "$" + price.toFixed(2);
};

var items = [
    {
        id: 0,
        name: 'Sleeping Bag w/ Stuff Sack',
        price: 44.99,
        description: 'Fill in some information about this product.'
    },
    {
        id: 1,
        name: 'Chocolate Energy Bar',
        price: 2.99,
        description: 'Fill in some information about this product.'
    },
    {
        id: 2,
        name: '2-Person Polyethylene Tent',
        price: 104.33,
        description: 'Fill in some information about this product.'
    }
];



var ItemScreen = React.createClass({
    getInitialState() {
        return {quantity: 1};
    },

    render() {
        return (<View style={styles.itemScreen}>
            <View style={styles.pretendImage}></View>
            <Text style={styles.itemHeadline}>
                {this.props.item.name}
            </Text>
            <Text style={styles.instructions}>
                {this.props.item.description}
            </Text>
            <Text style={styles.bigPrice}>
                {priceToUSDString(this.props.item.price)}
            </Text>

            <View style={styles.quantityPicker}>
                <Text style={styles.quantityLabel}>Quantity: </Text>
                <TextInput style={styles.quantityField} keyboardType="numeric"
                    value={this.state.quantity.toString()}
                    onChange={(event) => this._handleQuantityChange(event)} />
            </View>
            <TouchableHighlight onPress={this.addItem}>
                <View style={styles.addButton}>
                    <Text style={styles.buttonText}>Add to List</Text>
                </View>
            </TouchableHighlight>
        </View>);
    },

    _handleBackButtonPress() {
        this.props.navigator.pop();
    },

    _handleQuantityChange(event) {
        var newquant = parseInt(event.nativeEvent.text);
        this.setState({quantity: isNaN(newquant) ? 0 : newquant})
    },

    addItem() {
        this.props.onAddItem(this.props.item, parseInt(this.state.quantity));
        this.props.navigator.pop();
    }
});

var ItemListing = React.createClass({
    render: function() {
        return (
            <TouchableHighlight onPress={() => this.props.onPress(this.props.item)}>
                <View style={styles.listing}>
                    <View style={styles.pretendImage}></View>
                    <View style={styles.listingText}>
                        <Text style={styles.welcome}>
                            {this.props.item.name}
                        </Text>
                        <Text style={styles.price}>
                            {priceToUSDString(this.props.item.price)}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
});

var ListRow = React.createClass({
    render() {
        return (
            <View style={{padding: 10, borderBottomWidth: 0.5, borderColor: '#aaaaaa'}}>
                <Text style={styles.stdLabel}>
                    {this.props.name} ({this.props.quantity})
                </Text>
                <Text style={{color: 'green', fontWeight: 'bold', fontSize: 20}}>
                    {priceToUSDString(this.props.price * this.props.quantity)}
                </Text>
            </View>
        );
        /*
        Forgive me the inlinery, for I am tired.
        */
    }
});

var ShoppingList = React.createClass({
    render() {
        var total = this.props.list.reduce(
            (accum, item) => accum + (item.price * item.quantity),
            0
        );
        return (
            !!this.props.list.length ?
                <ScrollView>
                    {this.props.list.map((row, ind) => {
                        return <ListRow key={ind} {...row} />
                    })}
                    <Text style={{fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            padding: 10}}>
                        Total: {priceToUSDString(total)}
                    </Text>
                </ScrollView>
            :
                <View style={{padding: 10}}>
                    <Text style={styles.stdLabel}>No items</Text>
                </View>
        );
    }
});

var ShoppingItems = React.createClass({
    render: function() {
        return (
            <ScrollView style={{paddingTop: 60, padding: 10}}>
                <View style={styles.container}>
                    {items.map(item => <ItemListing item={item} key={item.id}
                                            onPress={this.props.onPressItem} />)}
                </View>
            </ScrollView>
        );
    }
});

var ShoppingListTabs = React.createClass({
    /*
    As the real "top level" component, since NavigatorIOS likes a more complex
    situation, we'll put our state here. React Native doesn't do context (a part
    of React that's not quite official, so we didn't discuss it), and bringing
    in our Flex code is probably doable but a little heavyweight for right now,
    so here's state. It's what's idiomatic for React Native code... for now.
    */
    getInitialState() {
        return {
            selectedTab: 'items',
            list: [],
        };
        /*
        Check out that comma style. A little more ES6 for ya. No more missing-
        comma errors; just add them all the time and don't worry!
        */
    },

    render() {
        return (
            <TabBarIOS selectedTab={this.state.selectedTab}>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'items'}
                    icon={{uri:'featured'}}
                    onPress={ () => this.setState({selectedTab: 'items'}) }>
                    <ShoppingItems onPressItem={this._handleItemPress} />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'list'}
                    icon={{uri:'bookmarks'}}
                    onPress={ () => this.setState({selectedTab: 'list'}) }>
                    <ShoppingList list={this.state.list} />
                </TabBarIOS.Item>
            </TabBarIOS>
            /*
            TabBar is pretty clearly exampled and a little more straightforwardly
            React-y than NavigatorIOS. But using the system-default icons causes
            their names to override any titles you give your tabs. And I'm not
            drawing new icons for this, so.
            */
        );
    },

    _handleItemPress(pressedItem) {
        this.props.navigator.push({
            component: ItemScreen,
            title: pressedItem.name,
            backButtonTitle: 'Back',
            passProps: {item: pressedItem, onAddItem: this.addItem}
        });
    },

    addItem: function(item, quantity) {
        var newList = this.state.list;
        /*
        find() is an ES6 thing on arrays, see:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        */
        if (newList.find((listrow) => listrow.id === item.id)) {
            newList = newList.map((row) => {
                if (row.id === item.id) {
                    row.quantity += quantity;
                }
                return row;
            })
        } else {
            newList.push({id: item.id,
                name: item.name,
                quantity,
                price: item.price});
        }
        /*
        look up there, an ES6 shorthand for assigning object properties!
        `quantity` is the name of a bound variable, so we can assign it to a
        property in a literal without repeating ourselves.
        */
        this.setState({
            list: newList,
            selectedTab: 'list'
        });
    }
})

var ShoppingListNative = React.createClass({
    render: function() {
        return (
            <NavigatorIOS style={{flex: 1}}
                initialRoute={{
                    component: ShoppingListTabs,
                    title: 'Shopping List'
                }}
            />
        );
    }
    /*
    NavigatorIOS is one of the best-documented React Native components, which is
    nice, because it's a little weird. There are these "route" objects, plus
    automatic passing of a "navigator" prop to involved components... you can
    kinda piece it together from the above. The docs are good, though.
    */
});

// And now, lots of styles and an AppRegistry.register call. Thanks!
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'white'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

    stdLabel: {fontWeight: 'bold', fontSize: 20},

    listing: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginBottom: 10
    },
    pretendImage: {
        width: 80,
        height: 80,
        backgroundColor: '#99aabb',
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 8
    },
    listingText: {
        flex: 1,
    },
    price: {
        color: 'green',
        fontWeight: 'bold'
    },

    itemScreen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 80
    },
    itemHeadline: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10
    },
    addButton: {
        borderRadius: 5,
        backgroundColor: 'green',
        padding: 10
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20
    },
    bigPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 20
    },

    quantityPicker: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 26,
        marginBottom: 30,
    },
    quantityLabel: {
        fontWeight: 'bold',
        fontSize: 20,
        height: 26
    },

    quantityField: {
        height: 30,
        width: 50,
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 4,
        fontSize: 22,
        padding: 4,
    }
});

AppRegistry.registerComponent('ShoppingListNative', () => ShoppingListNative);
