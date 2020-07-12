import React from 'react';
import { ReferenceProps, ReferenceStates, initialReferenceStates } from './ReferencePropsStates';
import { TextField,Checkbox } from '@material-ui/core';
import Autocomplete, { AutocompleteCloseReason, AutocompleteChangeReason } from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import './ReferenceList.scss';
import { ReferenceService } from './Reference.service';
import * as apiConfig from '../../../configuration/api.config';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export class ReferenceMultipleList extends React.Component<ReferenceProps, ReferenceStates>{
    referenceService: ReferenceService;
    constructor(props: ReferenceProps) {
        super(props);

        this.state = initialReferenceStates;
        this.referenceService = new ReferenceService(apiConfig.apiConfig);
        this.onCloseDropdown = this.onCloseDropdown.bind(this);
        this.onChangeDropdown = this.onChangeDropdown.bind(this);
    }

    async componentDidMount() {
        //set selected value for default
        let selected = this.state.selected;
        if (this.props.selected)
            selected = this.props.selected;
        else if (this.props.default)
            selected = [this.props.default.key];

        let allReference = await this.referenceService.getByUrl(this.props.serverUrl);
        let displayedData: any[] = [];
        allReference.forEach(element => {
            delete element['createdBy'];
            delete element['createdDate'];
            delete element['updatedBy'];
            delete element['updatedDate'];
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
        //get selected items
        let selectedItems: any[] = [];
        displayedData.forEach((value) => {
            if (selected && selected.indexOf(value['_id']) !== -1) {
                selectedItems.push(value);
            }
        });

        this.setState({
            selected: selected,
            selectedItems: selectedItems,
            originalSelected: JSON.parse(JSON.stringify(selected)),
            referenceKey: this.props.referenceKey,
            data: displayedData,
            originalData: allReference
        });
    }

    componentDidUpdate() {
        //listen in case the selected value is retrieved from server
        if (JSON.stringify(this.state.originalSelected) !== JSON.stringify(this.props.selected)) {
            //get selected items
            let selectedItems: any[] = [];
            this.state.data.forEach((value) => {
                if (this.props.selected.indexOf(value['_id']) !== -1) {
                    selectedItems.push(value);
                }
            });
            this.setState({
                selected: this.props.selected,
                originalSelected: JSON.parse(JSON.stringify(this.props.selected)),
                selectedItems: selectedItems
            });
        }
    }

    /**
     * Handle action close dropdown list
     * @param event change event
     * @param reason reason for close
     */
    onCloseDropdown(event: React.ChangeEvent<{}>, reason: AutocompleteCloseReason) {
        //update selected value for the parent component
        this.props.onSelectionChange(this.state);
    }

    /**
     * Handle action change selection
     * @param event change event
     * @param value value selected
     * @param reason reason for change
     */
    onChangeDropdown(event: React.ChangeEvent<{}>, value: any, reason: AutocompleteChangeReason) {
        //extract selected id
        let selected: any[] = [];
        (value as string[]).forEach((val: any) => {
            selected.push(val["_id"]);
        });
        this.setState({
            selectedItems: value,
            selected: selected
        }, ()=> {
            this.props.onSelectionChange(this.state);
        });
    }

    render() {
        return (
            <Autocomplete
                multiple
                id="autocomplete-box"
                className="font-theme"
                value={this.state.selectedItems}
                onClose={this.onCloseDropdown}
                onChange={this.onChangeDropdown}
                options={this.state.data}
                disableCloseOnSelect
                getOptionLabel={(option) => option[this.props.displayField]}
                renderOption={(option, { selected }) => (
                    <React.Fragment>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {
                            Object.keys(option).filter((val) => {
                                return val !== '_id';
                            }).map((opt, ind) => (
                                <span className="font-theme" style={{ paddingRight: '10px' }} key={ind}>{option[opt]}</span>
                            ))
                        }
                    </React.Fragment>
                )}
                style={{ width: '100%' }}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Please select items" placeholder="Search for items ..." />
                )}
            />
        )
    }
}