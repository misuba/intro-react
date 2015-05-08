var NumberSpinner = React.createClass({displayName: "NumberSpinner",
    propTypes: {
        value: React.PropTypes.number,
        onChange: React.PropTypes.func
    },

    statics: {
        styles: {
            container: {
                display: 'inline-block',
                width: '60%',
                position: 'relative',
                height: '1.8em'
            },
            input: {
                width: '75%',
                position: 'absolute',
                top: 0,
                left: 0,
                lineHeight: '1.8em'
            },
            spinButtons: {
                // resets
                backgroundColor: 'none',
                border: 'none',
                padding: 0,
                // styles for our particular needs
                position: 'absolute',
                right: 0,
                height: 12,
                width: 22
            }
        }
    },

    customStyle: function(styles, mods) {
        var newStyles = {};
        for (var key in styles) {
            newStyles[key] = styles[key];
        }
        for (var key in mods) {
            newStyles[key] = mods[key];
        }
        return newStyles;
    },

    render: function() {
        return React.createElement("div", {style: NumberSpinner.styles.container}, 
            React.createElement("input", {type: "text", 
                   value: this.props.value, 
                   onChange: this.changeFromField, 
                   onKeyDown: this.doArrowKeys, 
                   style: NumberSpinner.styles.input}), 
            React.createElement("button", {onClick: this.increment, 
                style: this.customStyle(
                        NumberSpinner.styles.spinButtons,
                        {top: 0}) }, "^"), 
            React.createElement("button", {onClick: this.decrement, 
                style: this.customStyle(
                        NumberSpinner.styles.spinButtons,
                        {top: 13}) }, "v")
        );
    },

    changeFromField: function(evt) {
        var newValue = parseInt(evt.target.value, 10);
        if (isNaN(newValue)) {
            newValue = '';
        }
        this.props.onChange(newValue);
    },

    increment: function() {
        this.props.onChange(this.props.value + 1);
    },

    decrement: function() {
        this.props.onChange(this.props.value <= 0 ? 0 : this.props.value - 1);
    },

    doArrowKeys: function(evt) {
        if (evt.key === 'ArrowUp' || evt.key === 'ArrowDown') {
            evt.preventDefault();
            if (evt.key === 'ArrowUp') {
                this.increment();
            } else {
                this.decrement();
            }
        }
    }
});
