import { Component } from "react";
import { Wrapper, Label, Input } from "./Filter.styled";

export class Filter extends Component {
    getFilterName = (e) => {
        const { onChange } = this.props;

        return onChange(e.currentTarget.value);
    };

    render() {
        const { value } = this.props;
        return (
            <Wrapper>
                <Label htmlFor="filter">Find contacts by name</Label>
                <Input
                    type="text"
                    name="filter"
                    value={value}
                    onChange={this.getFilterName}
                />
            </Wrapper>
        );
    };
};
