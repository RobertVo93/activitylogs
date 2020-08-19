import { ODateRange } from "./date-range";

export interface DateRangeProps {
    dateRange?: ODateRange,
    onSelectionChange: (selected: DateRangeStates) => void,
    referenceKey: string
}

export interface DateRangeStates {
    referenceKey: string,
    originalDateRange: ODateRange,
    dateRange: ODateRange,
    startDate: any,
    endDate: any
}

export const initialDateRangeStates: DateRangeStates = {
    referenceKey: '',
    originalDateRange: new ODateRange(),
    dateRange: new ODateRange(),
    startDate: null,
    endDate: null
}