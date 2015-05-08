
var NavTabs = React.createClass({displayName: "NavTabs",
    render: function() {
        var picked = AppStore.currentTab();

        return React.createElement("nav", {id: "tabs"}, 
            React.createElement("div", {onClick: this.pickItems, 
                 className: picked === 'items' ? 'picked' : ''}, "Items"), 
            React.createElement("div", {onClick: this.pickList, 
                 className: picked === 'list' ? 'picked' : ''}, "Shopping List")
        );
    },

    componentWillMount: function() {
        AppStore.addListener('change', this.forceUpdate);
    },

    componentWillUnmount: function() {
        AppStore.removeListener('change', this.forceUpdate);
    },

    pickItems: function() { fire(AppActions.showItems()); },
    pickList: function() { fire(AppActions.showList()); }
});
