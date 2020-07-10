import React, { Component } from 'react';
import { KnowledgeArticle } from '../../../class/knowledgeArticle';
import { KnowledgeArticleService } from '../../../components/Management/KnowledgeArticle/KnowledgeArticle.service';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import KnowledgeArticleComponent from '../../../components/Management/KnowledgeArticle/KnowledgeArticle';
import { CommonService } from '../../../service/common.service';
import { Config } from '../../../configuration/config';
import { storeKnowledgeArticles } from '../../store/knowledgeArticle/actions';
import { AppState } from '../../store';
import { Pagination } from '../../../interface/pagination';
import { Table } from '../../../share-components/Table/Table';

interface KnowledgeArticleContainerProps {
    user: any,
    storeKnowledgeArticles: typeof storeKnowledgeArticles
}
interface KnowledgeArticleContainerStates {
    allKnowledgeArticle: KnowledgeArticle[],
    knowledgeArticleList: KnowledgeArticle[],
    isLoading: boolean,
    redirectCreateNew: boolean
}

const ContainerDiv = styled.div`
    min-height: calc(100vh - 80px);
`;
const contentStyle:React.CSSProperties = {
    maxHeight: '55px',
    overflow: 'hidden'
}
class KnowledgeArticleContainer extends Component<KnowledgeArticleContainerProps, KnowledgeArticleContainerStates> {
    knowledgeArticleService: KnowledgeArticleService;
    config: Config;
    commonService: CommonService;
    constructor(props: KnowledgeArticleContainerProps) {
        super(props);

        this.state = {
            allKnowledgeArticle: [],
            knowledgeArticleList: [],
            isLoading: false,
            redirectCreateNew: false
        }
        this.knowledgeArticleService = new KnowledgeArticleService();
        this.commonService = new CommonService();
        this.config = new Config();

        this.getKnowledgeArticleByFilter = this.getKnowledgeArticleByFilter.bind(this);
        this.deleteKnowledgeArticleHandler = this.deleteKnowledgeArticleHandler.bind(this);
        this.addKnowledgeArticleHandler = this.addKnowledgeArticleHandler.bind(this);
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
    async getKnowledgeArticleByFilter(pagination: Pagination) {
        this.setState({
            isLoading: true
        });
        let knowledgeArticles = this.state.allKnowledgeArticle;
        if (knowledgeArticles.length === 0) {
            knowledgeArticles = await this.knowledgeArticleService.getAllData();
            this.props.storeKnowledgeArticles(knowledgeArticles);
        }
        const startRow = pagination.pageSize * pagination.pageIndex
        const endRow = startRow + pagination.pageSize
        this.setState({
            allKnowledgeArticle: knowledgeArticles,
            knowledgeArticleList: knowledgeArticles.slice(startRow, endRow),
            isLoading: false
        });
    }

    /**
     * Handle delete KnowledgeArticle
     * @param records deleted records
     */
    async deleteKnowledgeArticleHandler(records: KnowledgeArticle[]) {
        if (window.confirm("Do you want to delete the selected record(s)?")) {
            await this.knowledgeArticleService.deleteRecords(records);
            window.location.reload();
        }
    }

    /**
     * Move to create new page
     */
    addKnowledgeArticleHandler() {
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
                <Redirect push={true} to="/management/knowledgearticles/createnew"></Redirect>
            )
        }
    }

    render() {
        const columns = [
            {
                Header: 'Short Description',
                id: 'shortDescription',
                accessor: 'shortDescription',
                Cell: ({ row }: { row: any }) => (<Link to={`knowledgearticles/${row.original._id}`}>{row.original.shortDescription}</Link>)
            },
            {
                Header: 'Base',
                id: 'knowledgeBase',
                accessor: (row: KnowledgeArticle) => row.knowledgeBase ? `${row.knowledgeBase.name}` : ''
            },
            {
                Header: 'Contents',
                id: 'contents',
                accessor: (row: KnowledgeArticle) => (<div style={contentStyle} dangerouslySetInnerHTML={{__html: row.contents}}></div>)
            },
            {
                Header: 'Reviewer',
                id: 'reviewer',
                accessor: (row: KnowledgeArticle) => row.reviewer ? `${row.reviewer.firstName} ${row.reviewer.lastName}` : ''
            }
        ];
        return (
            <div>
                {
                    this.redirectToCreateNew()
                }
                <Switch>
                    <Route exact path="/management/knowledgearticles">
                        <ContainerDiv className="knowledgeArticle-list">
                            <Table columns={columns}
                                data={this.state.knowledgeArticleList}
                                pageCount={this.state.allKnowledgeArticle.length}
                                fetchData={this.getKnowledgeArticleByFilter}
                                deleteRecordHandler={this.deleteKnowledgeArticleHandler}
                                addRecordHandler={this.addKnowledgeArticleHandler}
                                TableName="Knowledge Articles"
                            />
                        </ContainerDiv>
                    </Route>
                    <Route path={`/management/knowledgearticles/:knowledgeArticleId`}>
                        <KnowledgeArticleComponent loginUser={this.props.user.currentUser}></KnowledgeArticleComponent>
                    </Route>
                </Switch>
            </div>
        );
    }
}

const MapStatesToProps = (store: AppState) => {
    return {
        user: store.user,
        knowledgeArticleList: store.knowledgeArticles
    };
}

const MapDispatchToProps = {
    storeKnowledgeArticles
};

export default connect(MapStatesToProps, MapDispatchToProps)(KnowledgeArticleContainer)