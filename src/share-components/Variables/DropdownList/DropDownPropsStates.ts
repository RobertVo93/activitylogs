import { KeyValue } from "../../../class/common/keyValue";

export interface DropDownProps {
    options: KeyValue[],
    dropdownKey: string,
    onSelectionChange: (selected: DropDownStates) => void,
    selected?: KeyValue,
    searchBar?: boolean
}

export interface DropDownStates {
    dropdownKey: string,
    originalSelected: any,
    selected: any,
    searchKey: string,
}

export const initialDropDownStates: DropDownStates = {
    dropdownKey: '',
    originalSelected: new KeyValue({
        key: 0,
        value: "--None--"
    }),
    //default value is None
    selected: new KeyValue({
        key: 0,
        value: "--None--"
    }),
    searchKey: ''
}