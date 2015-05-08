
var words = ['Always', 'Before', 'Closer', 'Defense', 'Ergo', 'Fevers',
    'Gardens', 'Haskell', 'Indigo', 'Jodphurs', 'Kismet', 'Llamas',
    'Major', 'Never', 'Opal'];

var FlyingList = React.createClass({
    getInitialState: function() {
        return {
            listItems: words,
            index: 0
        };
    },

    render: function() {
        var CSSTransitionGroup = React.addons.CSSTransitionGroup;

        return <div>
            <CSSTransitionGroup transitionName="flying">
                {this.state.listItems.map(function(word, mapindex) {
                    if (word === null) {
                        return null;
                    }
                    return <p key={word + mapindex}>
                        <a onClick={() => this.cut(mapindex)}>
                            {word}
                        </a>
                    </p>;
                }.bind(this)) }
            </CSSTransitionGroup>
            <button onClick={this.add}>Add</button>
        </div>;
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
