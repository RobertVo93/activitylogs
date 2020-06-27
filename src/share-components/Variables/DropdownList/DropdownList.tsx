import React from 'react';
import { DropDownProps, DropDownStates, initialDropDownStates } from './DropDownPropsStates';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './DropdownList.scss';
import styled from 'styled-components';
const SearchInput = styled.input`
    border-radius: 0px;
    border-left: 0px;
    border-right: 0px;
`;
export class CustomDropDown extends React.Component<DropDownProps, DropDownStates>{
    constructor(props: DropDownProps) {
        super(props);

        this.state = initialDropDownStates;
        this.onSelectionChangeHandler = this.onSelectionChangeHandler.bind(this);
        this.renderSearchBar = this.renderSearchBar.bind(this);
        this.onSearchInputChangeHandler = this.onSearchInputChangeHandler.bind(this);
    }

    componentDidMount() {
        //set selected value for default
        let preSelected = this.props.options[0];    //default option
        if(this.props.selected && this.props.selected.key != null){
            preSelected = this.props.selected;
        }
        
        this.setState({
            selected: preSelected,
            originalSelected: JSON.parse(JSON.stringify(preSelected)),
            dropdownKey: this.props.dropdownKey
        });
    }

    componentDidUpdate() {
        //listen in case the selected value is retrieved from server
        if (this.props.selected && this.props.selected.key !== null && JSON.stringify(this.state.originalSelected) !== JSON.stringify(this.props.selected)) {
            this.setState({
                selected: JSON.parse(JSON.stringify(this.props.selected)),
                originalSelected: JSON.parse(JSON.stringify(this.props.selected))
            });
        }
    }

    renderSearchBar(){
        let result;
        if(this.props.searchBar){
            result = (
                <div className="search-bar">
                    <SearchInput className="form-control" onChange={this.onSearchInputChangeHandler} placeholder="Search ..." />
                    <Dropdown.Divider></Dropdown.Divider>
                </div>
            );
        }
        return result;
    }

    onSearchInputChangeHandler(event: any){
        event.preventDefault();
        this.setState({
            searchKey: event.target.value
        });
    }

    /**
     * handle selection changed
     * @param eventKey selected key
     * @param event event
     */
    onSelectionChangeHandler(eventKey: any, event: Object) {
        //get the selected option
        let preSelected = this.state.selected;
        for(let i = 0; i < this.props.options.length; i++){
            if(this.props.options[i].key.toString() === eventKey.toString()){
                preSelected = this.props.options[i];
                break;
            }
        }
        //update selected option and send it to parent component
        this.setState({
            selected: preSelected
        }, () => {
            this.props.onSelectionChange(this.state);
        });
    }

    render() {
        return (
            <DropdownButton id="dropdown-box"  
                title={this.state.selected.value} 
                onSelect={this.onSelectionChangeHandler}>
                {
                    this.renderSearchBar()
                }
                {
                    this.props.options.filter((val, index) => {
                        return val.value.indexOf(this.state.searchKey) !== -1 || this.state.searchKey === '';
                    })
                    .map((option, index) => (
                        <Dropdown.Item key={`${option.key}${index}`} eventKey={option.key} className="option" >
                            {option.value}
                        </Dropdown.Item>
                    ))
                }
            </DropdownButton>
        )
    }
}