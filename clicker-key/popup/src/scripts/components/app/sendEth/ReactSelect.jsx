import React, {Component} from 'react';
import Select from 'react-select';


class ReactSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selectedOption) {
        this.setState({ selectedOption });
        this.props.updateTo(selectedOption);
        console.log(`Option selected:`, selectedOption);
    };

    render() {
        const { selectedOption } = this.state;
        const { options } = this.props.options ? this.props : [];

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
            />
        );
    }
}

export default ReactSelect;
