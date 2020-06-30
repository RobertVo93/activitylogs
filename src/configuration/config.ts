import { KeyValue } from "../class/common/keyValue"

export class Config {
    apiServiceURL = {
        server: `${process.env.REACT_APP_SERVER_URL}`,
        serverAPI: `${process.env.REACT_APP_SERVER_URL}/api`,
        users: `${process.env.REACT_APP_SERVER_URL}/api/users`,
        login: `${process.env.REACT_APP_SERVER_URL}/api/login`,
        register:`${process.env.REACT_APP_SERVER_URL}/api/register`,
        todo: `${process.env.REACT_APP_SERVER_URL}/api/todos`,
        activities: `${process.env.REACT_APP_SERVER_URL}/api/activities`,
        knowledgeBases: `${process.env.REACT_APP_SERVER_URL}/api/knowledgebases`
    }

    commonMessage = {
        loginError: 'Login error!!!',
        userNotFound: 'User not found!!!',
        signUpError: 'Register error!!!'
    }

    alertVariants = {
        primary :'primary',
        secondar :'secondary',
        success :'success',
        danger :'danger',
        warning :'warning',
        info :'info',
        light :'light',
        dark :'dark'
    }

    activityStatus:any = {
        'open': new KeyValue({key: 1, value: 'Open'}),
        'inProgress': new KeyValue({key: 2, value: 'In Progress'}),
        'completed': new KeyValue({key: 3, value: 'Completed'}),
        'onPending': new KeyValue({key: 4, value: 'Pending'}),
        'closed': new KeyValue({key: 5, value: 'Closed'}),
        'cancelled': new KeyValue({key: 6, value: 'Cancelled'})
    }

    defaultDropDownOptions = {
        all: new KeyValue({key: -1, value: '--All--'}),
        none: new KeyValue({key: 0, value: '--None--'})
    }

    datetimeFormat = {
        yyyyMMdd: 'yyyy/MM/dd',
        ddMMyyyy: 'dd/mm/yyyy'
    }

    localStorageKey = {
        appState: "application_state"
    }
}