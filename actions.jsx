
var ActionNames = {
    SHOW_TAB: 'showtab',

    RAW_SET_ITEMS: 'rawsetitems',
    EDIT_ITEM: 'edititem',

    ADD_ITEM: 'additem',
    REMOVE_ITEM: 'removeitem',
    CHANGE_QUANTITY: 'changequantity'
};

var AppActions = {
    showItems: function() {
        return {
            name: ActionNames.SHOW_TAB,
            value: 'items'
        };
    },
    showList: function() {
        return {
            name: ActionNames.SHOW_TAB,
            value: 'list'
        };
    }
};

var ItemActions = {
    edit: function(id, attrs) {
        return {
            name: ActionNames.EDIT_ITEM,
            itemId: id,
            value: attrs
        };
    },

    _rawSetItems: function(items) {
        return {
            name: ActionNames.RAW_SET_ITEMS,
            value: items
        };
    }
};

var ListActions = {
    addItem: function(id, quantity) {
        return {
            name: ActionNames.ADD_ITEM,
            itemId: id,
            quantity: quantity
        };
    },

    changeQuantity: function(id, quantity) {
        return {
            name: ActionNames.CHANGE_QUANTITY,
            itemId: id,
            quantity: quantity
        };
    },

    removeItem: function(id, quantity) {
        return {
            name: ActionNames.REMOVE_ITEM,
            itemId: id
        };
    }
};

function fire(action) {
    ShoppingListDispatcher.dispatch(action);
}
