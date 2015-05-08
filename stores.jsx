
var ShoppingListDispatcher = new Flux.Dispatcher();


var Store = function(instanceObj) {
    for (var key in instanceObj) {
        this[key] = instanceObj[key];
    }

    this.dispatchToken = ShoppingListDispatcher.register(
        this.handleDispatch.bind(this)
    );
};

Store.prototype = new events.EventEmitter();

Store.prototype.emitChange = function() {
    this.emit('change');
};

var AppStore = new Store({
    _currentTab: 'items',

    handleDispatch: function(action) {
        if (action.name === ActionNames.SHOW_TAB) {
            this._currentTab = action.value;
            this.emitChange();
        } else if (action.name === ActionNames.ADD_ITEM) {
            this._currentTab = 'list';
            this.emitChange();
        }
    },

    currentTab: function() {
        return this._currentTab;
    }
});

var ItemStore = new Store({
    _items: {},

    handleDispatch: function(action) {
        switch (action.name) {
            case ActionNames.RAW_SET_ITEMS:
                this._items = action.value;
                this.emitChange();
                break;
            case ActionNames.EDIT_ITEM:
                this._items[action.itemId] = action.value;
                this.emitChange();
                break;
        }
    },

    getAll: function() {
        var itemsForOutput = [];
        for (var key in this._items) {
            itemsForOutput.push(this._items[key]);
        }
        return itemsForOutput;
    }
});

var ListStore = new Store({
    _items: [],

    handleDispatch: function(action) {
        var setQuantity = function(amount) {
            this._items = this._items.map(function(item) {
                if (item.id === action.itemId) {
                    item.quantity = amount;
                }
                return item;
            });
        }.bind(this);

        switch (action.name) {
            case ActionNames.ADD_ITEM:
                ShoppingListDispatcher.waitFor([AppStore.dispatchToken]);

                var existingItem = this._items.reduce(function(found, item) {
                    if (item.id === action.itemId) {
                        found.push(item);
                    }
                    return found;
                }, []);

                if (existingItem.length) {
                    setQuantity(existingItem[0].quantity + action.quantity);
                } else {
                    this._items.push({id: action.itemId, quantity: action.quantity});
                }

                this.emitChange();
                break;

            case ActionNames.CHANGE_QUANTITY:
                setQuantity(action.quantity);
                this.emitChange();
                break;

            case ActionNames.REMOVE_ITEM:
                this._items = this._items.reduce(function(newCollection, item) {
                    if (item.id !== action.itemId) {
                        newCollection.push(item);
                    }
                    return newCollection;
                }, []);
                this.emitChange();
                break;
        }
    },

    getList: function() {
        return this._items.map(function(listItem) {
            var itemEntry = ItemStore._items[listItem.id];
            for (var key in itemEntry) {
                listItem[key] = itemEntry[key];
            }
            return listItem;
        });
    }
});
