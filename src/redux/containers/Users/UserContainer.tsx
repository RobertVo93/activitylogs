import React, { Component } from 'react';
import './UserContainer.scss';
import { User } from '../../../class/user';
import { connect } from 'react-redux';
import { UserServiceApi } from '../../../components/Management/Users/User.service';
import * as apiConfig from '../../../configuration/api.config';
import { Link, Switch, Route } from 'react-router-dom';
import  UserComponent  from '../../../components/Management/Users/User';
import { storeUser } from '../../store/user/actions';
import { AppState } from '../../store';
import styled from 'styled-components';
import { Pagination } from '../../../interface/pagination';
import { Table } from '../../../share-components/Table/Table';

interface UserContainerProps {
    user: any,
    storeUser: typeof storeUser
}
interface UserContainerStates {
    allUser: User[],
    userList: User[],
    isLoading: boolean,
    skipPageReset: boolean,
}

const ContainerDiv = styled.div`
    min-height: calc(100vh - 80px);
`;
class UserContainer extends Component<UserContainerProps, UserContainerStates>{
    userService: UserServiceApi;
    constructor(props: UserContainerProps) {
        super(props);

        this.state = {
            allUser: [],
            userList: [],
            isLoading: false,
            skipPageReset: false
        }
        this.userService = new UserServiceApi(apiConfig.apiConfig);
        this.getUserByFilter = this.getUserByFilter.bind(this);
        this.deleteUserHandler = this.deleteUserHandler.bind(this);
    }

    async componentDidMount() {
        this.getUserByFilter({pageSize: 10, pageIndex: 0});
    }

    async getUserByFilter(pagination: Pagination){
        this.setState({
            isLoading: true
        });
        let users = this.state.allUser;
        if(users.length === 0){
            users = await this.userService.getAllUsers();
            this.props.storeUser(users);
        }
        const startRow = pagination.pageSize * pagination.pageIndex
        const endRow = startRow + pagination.pageSize
        this.setState({
            allUser: users,
            userList: users.slice(startRow, endRow),
            isLoading: false
        });
    }

    async deleteUserHandler(records: User[]){
        if(window.confirm("Do you want to delete the selected record(s)?")){
            await this.userService.deleteRecords(records);
        }
    }

    render() {
        const columns = [
            {
                Header: 'Email',
                accessor: 'email',
                Cell: ({ row }: { row: any }) => (<Link to={`users/${row.original._id}`}>{row.original.email}</Link>)
            },
            {
                Header: 'First Name',
                accessor: 'firstName'
            },
            {
                Header: 'Last Name',
                accessor: 'lastName'
            },
            {
                Header: 'Phone',
                accessor: 'phone'
            },
            {
                Header: 'Address',
                accessor: 'address'
            }];
        return (
            <Switch>
                <Route exact path='/users'>
                    <ContainerDiv className="user-list">
                        <Table columns={columns} 
                            data={this.state.userList} 
                            pageCount={this.state.allUser.length}
                            fetchData={this.getUserByFilter}
                            deleteRecordHandler={this.deleteUserHandler}
                            TableName="Users"
                        />
                    </ContainerDiv>
                </Route>
                <Route path={`/users/:userId`}>
                    <UserComponent></UserComponent>
                </Route>
            </Switch>
        );
    }
}

const MapStatesToProps = (store: AppState) => {
    return {
        user: store.user,
        userList: store.user
    };
}

const MapDispatchToProps = {
    storeUser
}

export default connect(MapStatesToProps, MapDispatchToProps)(UserContainer)