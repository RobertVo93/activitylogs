import React from 'react';
import { ReferenceProps, ReferenceStates, initialReferenceStates } from './ReferencePropsStates';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './ReferenceList.scss';
import styled from 'styled-components';
import { ReferenceService } from './Reference.service';
import * as apiConfig from '../../../configuration/api.config';
const SearchInput = styled.input`
    border-radius: 0px;
    border-left: 0px;
    border-right: 0px;
`;
export class ReferenceList extends React.Component<ReferenceProps, ReferenceStates>{
    referenceService: ReferenceService;
    constructor(props: ReferenceProps) {
        super(props);

        this.state = initialReferenceStates;
        this.referenceService = new ReferenceService(apiConfig.apiConfig);
        this.onSelectionChangeHandler = this.onSelectionChangeHandler.bind(this);
        this.renderSearchBar = this.renderSearchBar.bind(this);
        this.onSearchInputChangeHandler = this.onSearchInputChangeHandler.bind(this);
    }

    async componentDidMount() {
        //set selected value for default
        let selected = this.state.selected;
        if (this.props.selected)
            selected = this.props.selected;
        else if (this.props.default)
            selected = this.props.default;

        let allReference = await this.referenceService.getByUrl(this.props.serverUrl);
        let displayedData: any[] = [];
        allReference.forEach(element => {
            let newObj = JSON.parse(JSON.stringify(element));   //clone object
            //remove the fields that do not display
            if (this.props.listFields) {
                for (let p in newObj) {
                    if (this.props.listFields.indexOf(p) === -1 && p !== '_id' && p !== this.props.displayField) {
                        delete newObj[p];
                    }
                }
                displayedData.push(newObj);
            }
        });
        this.setState({
            selected: selected,
            originalSelected: JSON.parse(JSON.stringify(selected)),
            referenceKey: this.props.referenceKey,
            data: displayedData,
            originalData: allReference
        });
    }

    componentDidUpdate() {
        //listen in case the selected value is retrieved from server
        if (JSON.stringify(this.state.originalSelected) !== JSON.stringify(this.props.selected)) {
            this.setState({
                selected: this.props.selected,
                originalSelected: JSON.parse(JSON.stringify(this.props.selected)),
                selectedValue: this.props.selected[this.props.displayField]
            });
        }
    }

    /**
     * Render the search bar: search by display field
     */
    renderSearchBar() {
        let result;
        if (this.props.searchBar) {
            result = (
                <div className="search-bar">
                    <SearchInput className="form-control" onChange={this.onSearchInputChangeHandler} placeholder="Search ..." />
                    <Dropdown.Divider></Dropdown.Divider>
                </div>
            );
        }
        return result;
    }

    /**
     * Search input change
     * @param event input event
     */
    onSearchInputChangeHandler(event: any) {
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
        for (let i = 0; i < this.state.originalData.length; i++) {
            if (this.state.originalData[i]._id.toString() === eventKey.toString()) {
                preSelected = this.state.originalData[i];
                break;
            }
        }
        //update selected option and send it to parent component
        this.setState({
            selected: preSelected,
            selectedValue: preSelected[this.props.displayField]
        }, () => {
            this.props.onSelectionChange(this.state);
        });
    }

    render() {
        return (
            <DropdownButton id="reference-box"
                title={this.state.selectedValue}
                onSelect={this.onSelectionChangeHandler}>
                {
                    this.renderSearchBar()
                }
                {
                    this.state.data
                        .filter((val, i) => {
                            return val[this.props.displayField].indexOf(this.state.searchKey) !== -1 || this.state.searchKey === "";
                        })
                        .map((option, index) => (
                            <Dropdown.Item key={`${option['_id']}${index}`} eventKey={option['_id']} className="option" >
                                {
                                    Object.keys(option).filter((val) => {
                                        return val !== '_id';
                                    }).map((opt, ind) => (
                                        <span className="col-sm-3" key={ind}>{option[opt]}</span>
                                    ))
                                }
                            </Dropdown.Item>
                        ))
                }
            </DropdownButton>
        )
    }
}