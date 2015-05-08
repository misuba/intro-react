
var NavTabs = React.createClass({
    render: function() {
        var picked = AppStore.currentTab();

        return <nav id="tabs">
            <div onClick={this.pickItems}
                 className={picked === 'items' ? 'picked' : ''}>Items</div>
            <div onClick={this.pickList}
                 className={picked === 'list' ? 'picked' : ''}>Shopping List</div>
        </nav>;
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
