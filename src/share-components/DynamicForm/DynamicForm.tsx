import React from 'react';
import { DynamicFormProps, DynamicFormStates, initialDynamicFormStates } from './DynamicFormPropState';
import styled from 'styled-components';
import { QuestionBase } from './questions/question-base';
import { FormConfig } from './form.config';
import { CustomDropDown } from '../Variables/DropdownList/DropdownList';
import { DropDownStates } from '../Variables/DropdownList/DropDownPropsStates';
import { ReferenceList } from '../Variables/ReferenceList/ReferenceList';
import { ReferenceStates } from '../Variables/ReferenceList/ReferencePropsStates';
import { DateRange } from '../Variables/DateRange/DateRange';
import { DateRangeStates } from '../Variables/DateRange/DateRangePropsStates';
import './DynamicForm.scss';
import { ODateRange } from '../../class/common/date-range';
import { ReactCkeditor } from '../Ckeditor/Ckeditor';
const ContainerDiv = styled.div`
`;
const DangerText: React.CSSProperties = {
    color: 'red',
    fontStyle: 'italic'
};
const Margin0: React.CSSProperties = {
    margin: 0
};
export class DynamicForm extends React.Component<DynamicFormProps, DynamicFormStates>{
    formConfig: FormConfig;
    constructor(props: DynamicFormProps) {
        super(props);

        this.formConfig = new FormConfig();
        this.state = initialDynamicFormStates;

        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.renderQuestion = this.renderQuestion.bind(this);
        this.validateForm = this.validateForm.bind(this);
        //handle change
        this.handleChange = this.handleChange.bind(this);
        this.onSelectionChangeCallback = this.onSelectionChangeCallback.bind(this);
        this.onSelectionReferenceListChange = this.onSelectionReferenceListChange.bind(this);
        this.onselectionDateRangeChange = this.onselectionDateRangeChange.bind(this);
        this.onCkeditorChange = this.onCkeditorChange.bind(this);
    }

    componentDidUpdate() {
        //wait for update from container element
        let listFields: { [s: string]: any } = {};
        this.props.ListFields.forEach((val) => {
            listFields[val.key] = val.value;
        });
        if (JSON.stringify(this.state.originalListFields) !== JSON.stringify(listFields)) {
            this.setState({
                listFields: listFields,
                originalListFields: JSON.parse(JSON.stringify(listFields))
            }, () => {
                let { errors, valid } = this.validateForm();
                let disabled = !valid;
                this.setState({
                    disableSubmitButton: disabled,
                    errors
                });
            });
        }
    }

    /**
     * Handle date range selection changed
     * @param e date range state
     */
    onselectionDateRangeChange(e: DateRangeStates){
        let listFields = this.state.listFields;
        let newDateRange:ODateRange = e.dateRange;
        listFields[e.referenceKey] = newDateRange;
        this.setState({
            listFields: listFields
        }, ()=> {
            let { errors, valid } = this.validateForm();
            let disabled = !valid;
            this.setState({
                disableSubmitButton: disabled,
                errors
            });
        })
    }

    /**
     * Handle reference list selected record
     * @param e reference state
     */
    onSelectionReferenceListChange(e: ReferenceStates){
        let listFields = this.state.listFields;
        listFields[e.referenceKey] = e.selected;
        this.setState({
            listFields
        }, () => {
            let { errors, valid } = this.validateForm();
            let disabled = !valid;
            this.setState({
                disableSubmitButton: disabled,
                errors
            });
        });
    }

    /**
     * Handle dropdown list change
     * @param e Dropdown state
     */
    onSelectionChangeCallback(e: DropDownStates){
        let listFields = this.state.listFields;
        listFields[e.dropdownKey] = e.selected;
        this.setState<never>({
            listFields
        }, () => {
            let { errors, valid } = this.validateForm();
            let disabled = !valid;
            this.setState({
                disableSubmitButton: disabled,
                errors
            });
        });
    }

    /**
     * Handle input change
     * @param event event
     */
    handleChange(event: any) {
        event.preventDefault();
        const { name, value } = event.target;
        let listFields = this.state.listFields;
        listFields[name] = value;
        this.setState<never>({
            listFields
        }, () => {
            let { errors, valid } = this.validateForm();
            let disabled = !valid;
            this.setState({
                disableSubmitButton: disabled,
                errors
            });
        });
    }

    /**
     * On ckeditor change handler
     * @param str string value
     * @param key key of question
     */
    onCkeditorChange(str: string, key: string){
        let listFields = this.state.listFields;
        listFields[key] = str;
        this.setState<never>({
            listFields
        }, () => {
            let { errors, valid } = this.validateForm();
            let disabled = !valid;
            this.setState({
                disableSubmitButton: disabled,
                errors
            });
        });
    }

    /**
     * Validate the form
     */
    validateForm() {
        let valid = true;
        let errors: { [s: string]: string[] } = {};
        this.props.ListFields.forEach(element => {
            errors[element.key] = [];
            switch(element.controlType){
                case this.formConfig.questionControlType.textbox:
                case this.formConfig.questionControlType.textarea:
                    for (var key1 in element.validators) {
                        switch (key1) {
                            case this.formConfig.formValidators.require:
                                if (!(this.state.listFields[element.key] && this.state.listFields[element.key] !== "")) {
                                    errors[element.key].push(
                                        element.validators[key1].errorMessage
                                    );
                                }
                                break;
                            case this.formConfig.formValidators.minLength:
                                if (!(this.state.listFields[element.key] && this.state.listFields[element.key].length >= element.validators[key].value)) {
                                    errors[element.key].push(
                                        element.validators[key1].errorMessage
                                    );
                                }
                                break;
                            case this.formConfig.formValidators.maxLength:
                                if (!(this.state.listFields[element.key] && this.state.listFields[element.key].length <= element.validators[key].value)) {
                                    errors[element.key].push(
                                        element.validators[key1].errorMessage
                                    );
                                }
                                break;
                            case this.formConfig.formValidators.email:
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case this.formConfig.questionControlType.reference:
                    for (var key2 in element.validators) {
                        switch (key2) {
                            case this.formConfig.formValidators.require:
                                if (!this.state.listFields[element.key] || this.state.listFields[element.key]._id == null ) {
                                    errors[element.key].push(
                                        element.validators[key2].errorMessage
                                    );
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case this.formConfig.questionControlType.dropdown:
                    for (var key3 in element.validators) {
                        switch (key3) {
                            case this.formConfig.formValidators.require:
                                //not have value or value is 0 = [--none--]
                                if (!this.state.listFields[element.key] 
                                    || !this.state.listFields[element.key].key
                                    || this.state.listFields[element.key].key === 0
                                    ) {
                                    errors[element.key].push(
                                        element.validators[key3].errorMessage
                                    );
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case this.formConfig.questionControlType.dateRange:
                    for (var key4 in element.validators) {
                        switch (key4) {
                            case this.formConfig.formValidators.require:
                                //not have value or value of one of two date is null
                                if (!this.state.listFields[element.key] || 
                                    this.state.listFields[element.key].startDate == null ||
                                    this.state.listFields[element.key].endDate == null) {
                                    errors[element.key].push(
                                        element.validators[key4].errorMessage
                                    );
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                default:
                    break;
            }
            
        });
        for (var key in errors) {
            if (errors[key].length > 0) {
                valid = false;
                break;
            }
        }
        return { errors, valid };
    }

    /**
     * Render error message base on question key
     * @param questionKey question key
     */
    renderErrorMessage(questionKey: string) {
        //get state.error message base on question key
        let errors = this.state.errors[questionKey];
        //if there is no error => return
        if (!errors) return;
        //else display error message
        return (
            <div style={DangerText}>
                {
                    errors.map((err, i) => (
                        <div key={i}>
                            <span>{err}</span>
                        </div>
                    ))
                }
            </div>
        );
    }

    /**
     * Render questions
     * @param question question definition
     */
    renderQuestion(question: QuestionBase<any>) {
        //depend on type of question => render appropriate element
        switch (question.controlType) {
            case this.formConfig.questionControlType.textbox: //type textbox
                return (
                    <fieldset key={question.key} className="form-group">
                        <label htmlFor={question.key}>
                            <span hidden={!question.validators['required']} style={DangerText}>* </span><span data-text={question.label}>{question.label}</span>
                        </label>
                        <input className="form-control"
                            onChange={this.handleChange}
                            readOnly={question.readonly}
                            type={question.type}
                            name={question.key}
                            value={this.state.listFields[question.key]}
                            id={question.key} />
                        {this.renderErrorMessage(question.key)}
                    </fieldset>
                );
            case this.formConfig.questionControlType.textarea:    //type text area
                return (
                    <fieldset key={question.key} className="form-group">
                        <label htmlFor={question.key}>
                            <span hidden={!question.validators['required']} style={DangerText}>* </span><span data-text={question.label}>{question.label}</span>
                        </label>
                        <textarea className="form-control"
                            onChange={this.handleChange}
                            readOnly={question.readonly}
                            rows={question.rows}
                            name={question.key}
                            value={this.state.listFields[question.key]}
                            id={question.key} ></textarea>
                        {this.renderErrorMessage(question.key)}
                    </fieldset>
                );
            case this.formConfig.questionControlType.dropdown:    //type dropdown
                return (
                    <fieldset key={question.key} className="form-group">
                        <label htmlFor={question.key}>
                            <span hidden={!question.validators['required']} style={DangerText}>* </span><span data-text={question.label}>{question.label}</span>
                        </label>
                        <CustomDropDown searchBar={question.searchBar} 
                            selected={question.value}
                            dropdownKey={question.key} 
                            onSelectionChange={this.onSelectionChangeCallback} 
                            options={question.options}></CustomDropDown>
                        {this.renderErrorMessage(question.key)}
                    </fieldset>
                );
            case this.formConfig.questionControlType.reference:
                return (
                    <fieldset key={question.key} className="form-group">
                        <label htmlFor={question.key}>
                            <span hidden={!question.validators['required']} style={DangerText}>* </span><span data-text={question.label}>{question.label}</span>
                        </label>
                        <ReferenceList serverUrl={question.serverUrl} 
                            displayField={question.displayField}
                            listFields={question.listFields}
                            filterCondition={question.filterCondition}
                            referenceKey={question.key}
                            searchBar={question.searchBar} 
                            selected={question.value}
                            onSelectionChange={this.onSelectionReferenceListChange}
                            ></ReferenceList>
                        {this.renderErrorMessage(question.key)}
                    </fieldset>
                )
            case this.formConfig.questionControlType.dateRange:
                return (
                    <fieldset key={question.key} className="form-group">
                        <label htmlFor={question.key}>
                            <span hidden={!question.validators['required']} style={DangerText}>* </span><span data-text={question.label}>{question.label}</span>
                        </label>
                        <DateRange referenceKey={question.key}
                            dateRange={question.value}
                            onSelectionChange={this.onselectionDateRangeChange}>
                        </DateRange>
                        {this.renderErrorMessage(question.key)}
                    </fieldset>
                )
            case this.formConfig.questionControlType.ckeditor:
                return (
                    <fieldset key={question.key} className="form-group">
                        <label htmlFor={question.key}>
                            <span hidden={!question.validators['required']} style={DangerText}>* </span><span data-text={question.label}>{question.label}</span>
                        </label>
                        <ReactCkeditor 
                            data={question.value}
                            dataChange={this.onCkeditorChange}
                            ckeditorKey={question.key}
                        />
                        {this.renderErrorMessage(question.key)}
                    </fieldset>
                )
            default:
                break;
        }
    }

    render() {
        return (
            <ContainerDiv>
                <form onSubmit={(e) => { e.preventDefault(); this.props.OnSubmitCallback(this.state) }}>
                    {this.props.ListFields.map((field, i) => (
                        this.renderQuestion(field)
                    ))}
                    <input style={Margin0}
                        type="submit"
                        value="Submit"
                        disabled={this.state.disableSubmitButton}
                        className="btn btn-primary btn-block" />
                </form>
            </ContainerDiv>
        );
    }
}