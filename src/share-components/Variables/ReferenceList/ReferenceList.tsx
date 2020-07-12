import React from 'react';
import { ReferenceProps, ReferenceStates, initialReferenceStates } from './ReferencePropsStates';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteChangeReason } from '@material-ui/lab/Autocomplete';
import './ReferenceList.scss';
import { ReferenceService } from './Reference.service';
import * as apiConfig from '../../../configuration/api.config';
export class ReferenceList extends React.Component<ReferenceProps, ReferenceStates>{
    referenceService: ReferenceService;
    constructor(props: ReferenceProps) {
        super(props);

        this.state = initialReferenceStates;
        this.referenceService = new ReferenceService(apiConfig.apiConfig);
        this.onChangeDropdown = this.onChangeDropdown.bind(this);
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
                originalSelected: JSON.parse(JSON.stringify(this.props.selected))
            });
        }
    }

    /**
     * Handle action change selection
     * @param event change event
     * @param value value selected
     * @param reason reason for change
     */
    onChangeDropdown(event: React.ChangeEvent<{}>, value: any, reason: AutocompleteChangeReason) {
        //get the selected option
        let preSelected = this.state.selected;
        for (let i = 0; i < this.state.originalData.length; i++) {
            if (this.state.originalData[i]._id.toString() === value["_id"]) {
                preSelected = this.state.originalData[i];
                break;
            }
        }
        //update selected option and send it to parent component
        this.setState({
            selected: preSelected,
            selectedItems: value
        }, () => {
            this.props.onSelectionChange(this.state);
        });
    }

    render() {
        return (
            <Autocomplete
                id="autocomplete-box"
                className="font-theme"
                value={this.state.selected}
                onChange={this.onChangeDropdown}
                options={this.state.data}
                autoHighlight
                getOptionLabel={(option) => option[this.props.displayField] ? option[this.props.displayField]: ''}
                renderOption={(option) => (
                    <React.Fragment>
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