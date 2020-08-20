import React, { Component } from 'react';
import { KnowledgeBase } from '../../../class/knowledgeBase';
import { KnowledgeBaseService } from '../../../components/Management/KnowledgeBase/KnowledgeBase.service';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import KnowledgeBaseComponent from '../../../components/Management/KnowledgeBase/KnowledgeBase';
import { CommonService } from '../../../service/common.service';
import { Config } from '../../../configuration/config';
import { storeKnowledgeBases } from '../../store/knowledgeBase/actions';
import { AppState } from '../../store';
import { Pagination } from '../../../interface/pagination';
import { Table } from '../../../share-components/Table/Table';

interface KnowledgeBaseContainerProps {
    user: any,
    storeKnowledgeBases: typeof storeKnowledgeBases
}
interface KnowledgeBaseContainerStates {
    allKnowledgeBase: KnowledgeBase[],
    knowledgeBaseList: KnowledgeBase[],
    isLoading: boolean,
    redirectCreateNew: boolean
}

const ContainerDiv = styled.div`
    min-height: calc(100vh - 80px);
`;

class KnowledgeBaseContainer extends Component<KnowledgeBaseContainerProps, KnowledgeBaseContainerStates> {
    knowledgeBaseService: KnowledgeBaseService;
    config: Config;
    commonService: CommonService;
    constructor(props: KnowledgeBaseContainerProps) {
        super(props);

        this.state = {
            allKnowledgeBase: [],
            knowledgeBaseList: [],
            isLoading: false,
            redirectCreateNew: false
        }
        this.knowledgeBaseService = new KnowledgeBaseService();
        this.commonService = new CommonService();
        this.config = new Config();

        this.getKnowledgeBaseByFilter = this.getKnowledgeBaseByFilter.bind(this);
        this.deleteKnowledgeBaseHandler = this.deleteKnowledgeBaseHandler.bind(this);
        this.addKnowledgeBaseHandler = this.addKnowledgeBaseHandler.bind(this);
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

    async componentDidMount() {
        let knowledgeBases = await this.knowledgeBaseService.getAllData();
        this.props.storeKnowledgeBases(knowledgeBases);
        this.setState({ allKnowledgeBase: knowledgeBases });
    }

    /**
     * Handle get data by filter
     * @param pagination pagination object
     */
    async getKnowledgeBaseByFilter(pagination: Pagination) {
        this.setState({
            isLoading: true
        });
        let knowledgeBases = this.state.allKnowledgeBase;
        if (knowledgeBases.length === 0) {
            knowledgeBases = await this.knowledgeBaseService.getAllData();
            this.props.storeKnowledgeBases(knowledgeBases);
        }
        const startRow = pagination.pageSize * pagination.pageIndex
        const endRow = startRow + pagination.pageSize
        this.setState({
            allKnowledgeBase: knowledgeBases,
            knowledgeBaseList: knowledgeBases.slice(startRow, endRow),
            isLoading: false
        });
    }

    /**
     * Handle delete KnowledgeBase
     * @param records deleted records
     */
    async deleteKnowledgeBaseHandler(records: KnowledgeBase[]) {
        if (window.confirm("Do you want to delete the selected record(s)?")) {
            await this.knowledgeBaseService.deleteRecords(records);
            window.location.reload();
        }
    }

    /**
     * Move to create new page
     */
    addKnowledgeBaseHandler() {
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
                <Redirect push={true} to="/management/knowledgebases/createnew"></Redirect>
            )
        }
    }

    render() {
        const columns = [
            {
                Header: 'Name',
                id: 'name',
                accessor: 'name',
                Cell: ({ row }: { row: any }) => (<Link to={`knowledgebases/${row.original._id}`}>{row.original.name}</Link>)
            },
            {
                Header: 'Owner',
                id: 'owner',
                accessor: (row: KnowledgeBase) => row.owner ? `${row.owner.firstName} ${row.owner.lastName}` : ''
            }
        ];
        return (
            <div>
                {
                    this.redirectToCreateNew()
                }
                <Switch>
                    <Route exact path="/management/knowledgebases">
                        <ContainerDiv className="knowledgeBase-list">
                            <Table columns={columns}
                                data={this.state.allKnowledgeBase}
                                pageCount={this.state.allKnowledgeBase.length}
                                fetchData={() => { }}
                                deleteRecordHandler={this.deleteKnowledgeBaseHandler}
                                addRecordHandler={this.addKnowledgeBaseHandler}
                                TableName="Knowledge Bases"
                            />
                        </ContainerDiv>
                    </Route>
                    <Route path={`/management/knowledgebases/:knowledgeBaseId`}>
                        <KnowledgeBaseComponent loginUser={this.props.user.currentUser}></KnowledgeBaseComponent>
                    </Route>
                </Switch>
            </div>
        );
    }
}

const MapStatesToProps = (store: AppState) => {
    return {
        user: store.user,
        knowledgeBaseList: store.knowledgeBases
    };
}

const MapDispatchToProps = {
    storeKnowledgeBases
};

export default connect(MapStatesToProps, MapDispatchToProps)(KnowledgeBaseContainer)