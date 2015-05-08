
var words = ['Always', 'Before', 'Closer', 'Defense', 'Ergo', 'Fevers',
    'Gardens', 'Haskell', 'Indigo', 'Jodphurs', 'Kismet', 'Llamas',
    'Major', 'Never', 'Opal'];

var FlyingList = React.createClass({displayName: "FlyingList",
    getInitialState: function() {
        return {
            listItems: words,
            index: 0
        };
    },

    render: function() {
        var CSSTransitionGroup = React.addons.CSSTransitionGroup;

        return React.createElement("div", null, 
            React.createElement(CSSTransitionGroup, {transitionName: "flying"}, 
                this.state.listItems.map(function(word, mapindex) {
                    if (word === null) {
                        return null;
                    }
                    return React.createElement("p", {key: word + mapindex}, 
                        React.createElement("a", {onClick: function()  {return this.cut(mapindex);}.bind(this)}, 
                            word
                        )
                    );
                }.bind(this)) 
            ), 
            React.createElement("button", {onClick: this.add}, "Add")
        );
    },

    cut: function(index) {
        this.setState({listItems: this.state.listItems.map(function(word, ind) {
            return ind === index ? null : word;
        }) });
    },

    add: function() {
        var list = this.state.listItems;
        list.push(words[this.state.index]);
        var tickOver = this.state.index + 1 >= 15;
        this.setState({
            listItems: list,
            index: tickOver ? 0 : this.state.index + 1
        });
    }
});
