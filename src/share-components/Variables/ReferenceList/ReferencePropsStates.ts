import { KeyValue } from "../../../class/common/keyValue";

export interface ReferenceProps {
    serverUrl: string,
    displayField: string,   //the field will show on search bar
    listFields?: string[],  //the list of field will show in options
    filterCondition?: string,
    onSelectionChange: (selected: ReferenceStates) => void,
    selected?: any,
    default?: KeyValue,
    searchBar?: boolean,
    referenceKey: string
}

export interface ReferenceStates {
    referenceKey: string,
    originalSelected: any,
    selected: any,
    selectedValue: string,
    searchKey: string,
    data: any[],
    originalData: any[],
    selectedItems: any[]
}

export const initialReferenceStates: ReferenceStates = {
    referenceKey: '',
    //default value is None
    originalSelected: null,
    selected: null,
    selectedValue: '',
    searchKey: '',
    data: [],
    originalData: [],
    selectedItems: []
}