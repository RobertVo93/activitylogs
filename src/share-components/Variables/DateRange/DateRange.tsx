/**
 * Require react-datepicker
 */
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { DateRangeProps, DateRangeStates, initialDateRangeStates } from './DateRangePropsStates';
import './DateRange.scss';
import styled from 'styled-components';
import { ODateRange } from '../../../class/common/date-range';
const ContainerDiv = styled.div`
    width: 100%;
`;
const StartDateDiv = styled.div`
    display: inline-block;
    width: 50%;
    padding: 0px 20px;
`;
const EndDateDiv = styled.div`
    display: inline-block;
    width: 50%;
    padding: 0px 20px;
`;
export class DateRange extends React.Component<DateRangeProps, DateRangeStates>{
    constructor(props: DateRangeProps) {
        super(props);

        this.state = initialDateRangeStates;

        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    }

    componentDidMount() {
        let dateRange = new ODateRange();
        if (this.props.dateRange) {
            dateRange.startDate = this.props.dateRange.startDate || undefined;
            dateRange.endDate = this.props.dateRange.endDate || undefined;
        }
        this.setState({
            referenceKey: this.props.referenceKey,
            dateRange: dateRange,
            originalDateRange: JSON.parse(JSON.stringify(dateRange))
        });
    }

    componentDidUpdate() {
        if(this.props.dateRange){
            let dateRange = new ODateRange();
            dateRange.startDate = this.props.dateRange.startDate || undefined;
            dateRange.endDate = this.props.dateRange.endDate || undefined;
            if (JSON.stringify(this.state.originalDateRange) !== JSON.stringify(dateRange)) {
                this.setState({
                    dateRange: dateRange,
                    originalDateRange: JSON.parse(JSON.stringify(dateRange))
                });
            }
        }
    }

    /**
     * handle start date selection changed
     * @param date selected date
     */
    handleChangeStartDate(date: any) {
        console.log(date);
        let dateRange = new ODateRange({
            startDate: date,
            endDate: this.state.dateRange.endDate
        });
        this.setState({
            dateRange: dateRange
        }, () => {
            this.props.onSelectionChange(this.state);
        });
    }

    /**
     * handle end date selection changed
     * @param date selected date
     */
    handleChangeEndDate(date: any) {
        console.log(date);
        let dateRange = new ODateRange({
            startDate: this.state.dateRange.startDate,
            endDate: date
        });
        this.setState({
            dateRange: dateRange
        }, () => {
            this.props.onSelectionChange(this.state);
        });
    }

    render() {
        return (
            <ContainerDiv>
                <StartDateDiv>
                    <div>Start Date</div>
                    <ReactDatePicker
                        dateFormat="yyyy/MM/dd"
                        maxDate={this.state.dateRange.endDate}
                        selected={this.state.dateRange.startDate}
                        onChange={this.handleChangeStartDate}
                    />
                </StartDateDiv>
                <EndDateDiv>
                    <div>End Date</div>
                    <ReactDatePicker
                        dateFormat="yyyy/MM/dd"
                        minDate={this.state.dateRange.startDate}
                        selected={this.state.dateRange.endDate}
                        onChange={this.handleChangeEndDate}
                    />
                </EndDateDiv>
            </ContainerDiv>
        )
    }
}