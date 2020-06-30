import './ActivityContainer.scss';
import React, { Component } from 'react';
import { Activity } from '../../../class/activity';
import { ActivityService } from '../../../components/Management/Activities/Activity.service';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import ActivityComponent from '../../../components/Management/Activities/Activity';
import { CommonService } from '../../../service/common.service';
import { Config } from '../../../configuration/config';
import { storeActivities } from '../../store/activity/actions';
import { AppState } from '../../store';
import { Pagination } from '../../../interface/pagination';
import { Table } from '../../../share-components/Table/Table';
import { SelectColumnFilter } from '../../../share-components/Table/Filter/Filter';

interface ActivityContainerProps {
    user: any,
    storeActivities: typeof storeActivities
}
interface ActivityContainerStates {
    allActivity: Activity[],
    activityList: Activity[],
    isLoading: boolean,
    redirectCreateNew: boolean
}

const ContainerDiv = styled.div`
    min-height: calc(100vh - 80px);
`;

class ActivityContainer extends Component<ActivityContainerProps, ActivityContainerStates> {
    activityService: ActivityService;
    config: Config;
    commonService: CommonService;
    constructor(props: ActivityContainerProps) {
        super(props);

        this.state = {
            allActivity: [],
            activityList: [],
            isLoading: false,
            redirectCreateNew: false
        }
        this.activityService = new ActivityService();
        this.commonService = new CommonService();
        this.config = new Config();

        this.getActivityByFilter = this.getActivityByFilter.bind(this);
        this.deleteActivityHandler = this.deleteActivityHandler.bind(this);
        this.addActivityHandler = this.addActivityHandler.bind(this);
        this.redirectToCreateNew = this.redirectToCreateNew.bind(this);
    }

    componentDidUpdate() {
        if (this.state.redirectCreateNew) {
            //reset flag before redirect to new children component.
            //if not then next time this flag is still true and could not redirect again
            this.setState({
                redirectCreateNew: false
            });
        }
    }

    componentDidMount() { 
    }

    /**
     * Handle get data by filter
     * @param pagination pagination object
     */
    async getActivityByFilter(pagination: Pagination) {
        this.setState({
            isLoading: true
        });
        let activities = this.state.allActivity;
        if (activities.length === 0) {
            activities = await this.activityService.getAllData();
            this.props.storeActivities(activities);
        }
        const startRow = pagination.pageSize * pagination.pageIndex
        const endRow = startRow + pagination.pageSize
        this.setState({
            allActivity: activities,
            activityList: activities.slice(startRow, endRow),
            isLoading: false
        });
    }

    /**
     * Handle delete activity
     * @param records deleted records
     */
    async deleteActivityHandler(records: Activity[]) {
        if (window.confirm("Do you want to delete the selected record(s)?")) {
            await this.activityService.deleteRecords(records);
            window.location.reload();
        }
    }

    /**
     * Move to create new page
     */
    addActivityHandler() {
        this.setState({
            redirectCreateNew: true
        });
    }

    /**
     * React-router redirect to create new page
     */
    redirectToCreateNew() {
        if (this.state.redirectCreateNew) {
            return (
                <Redirect push={true} to="/management/activities/createnew"></Redirect>
            )
        }
    }

    render() {
        const columns = [
            {
                Header: 'Description',
                id: 'description',
                accessor: 'description',
                Cell: ({ row }: { row: any }) => (<Link to={`activities/${row.original._id}`}>{row.original.description}</Link>)
            },
            {
                Header: 'Implementation Plan',
                id: 'implemetationPlan',
                accessor: 'implemetationPlan',
            },
            {
                Header: 'Plan date',
                id: 'planDate',
                columns: [
                    {
                        Header: 'Start date',
                        id: 'planStartDate',
                        accessor: (row: Activity) => {
                            let result = '';
                            if (row.planDate && row.planDate.startDate) {
                                let accessor = new Date(row.planDate.startDate);
                                result = this.commonService.convertDateToStringByFormat(accessor, this.config.datetimeFormat.yyyyMMdd)
                            }
                            return result;
                        }
                    },
                    {
                        Header: 'End date',
                        id: 'planEndDate',
                        accessor: (row: Activity) => {
                            let result = '';
                            if (row.planDate && row.planDate.endDate) {
                                let accessor = new Date(row.planDate.endDate);
                                result = this.commonService.convertDateToStringByFormat(accessor, this.config.datetimeFormat.yyyyMMdd)
                            }
                            return result;
                        }
                    }
                ]
            },
            {
                Header: 'Actual date',
                id: 'actualDate',
                columns: [
                    {
                        Header: 'Start date',
                        id: 'actualStartDate',
                        accessor: (row: Activity) => {
                            let result = '';
                            if (row.actualDate && row.actualDate.startDate) {
                                let accessor = new Date(row.actualDate.startDate);
                                result = this.commonService.convertDateToStringByFormat(accessor, this.config.datetimeFormat.yyyyMMdd)
                            }
                            return result;
                        }
                    },
                    {
                        Header: 'End date',
                        id: 'actualEndDate',
                        accessor: (row: Activity) => {
                            let result = '';
                            if (row.actualDate && row.actualDate.endDate) {
                                let accessor = new Date(row.actualDate.endDate);
                                result = this.commonService.convertDateToStringByFormat(accessor, this.config.datetimeFormat.yyyyMMdd)
                            }
                            return result;
                        }
                    }
                ]
            },
            {
                Header: 'Status',
                id: 'status',
                // disableFilters: true,
                Filter: SelectColumnFilter,
                filter: 'includes',
                accessor: (row: Activity) => {
                    let result = '';
                    if (row.status) {
                        result = row.status.value
                    }
                    return result;
                },
            },
            {
                Header: 'Assigned to',
                id: 'assignedTo',
                accessor: (row: Activity) => row.assignedTo ? `${row.assignedTo.firstName} ${row.assignedTo.lastName}` : ''
            }
        ];
        return (
            <div>
                {
                    this.redirectToCreateNew()
                }
                <Switch>
                    <Route exact path="/management/activities">
                        <ContainerDiv className="activity-list">
                            <Table columns={columns}
                                data={this.state.activityList}
                                pageCount={this.state.allActivity.length}
                                fetchData={this.getActivityByFilter}
                                deleteRecordHandler={this.deleteActivityHandler}
                                addRecordHandler={this.addActivityHandler}
                                TableName="Activities"
                            />
                        </ContainerDiv>
                    </Route>
                    <Route path={`/management/activities/:activityId`}>
                        <ActivityComponent loginUser={this.props.user.currentUser}></ActivityComponent>
                    </Route>
                </Switch>
            </div>
        );
    }
}

const MapStatesToProps = (store: AppState) => {
    return {
        user: store.user,
        activityList: store.activities
    };
}

const MapDispatchToProps = {
    storeActivities
};

export default connect(MapStatesToProps, MapDispatchToProps)(ActivityContainer)