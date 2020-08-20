import React, { Component } from 'react';
import { Project } from '../../../class/project';
import { ProjectService } from '../../../components/Management/Project/Project.service';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import ProjectComponent from '../../../components/Management/Project/Project';
import { CommonService } from '../../../service/common.service';
import { Config } from '../../../configuration/config';
import { storeProjects } from '../../store/project/actions';
import { AppState } from '../../store';
import { Pagination } from '../../../interface/pagination';
import { Table } from '../../../share-components/Table/Table';

interface ProjectContainerProps {
    user: any,
    storeProjects: typeof storeProjects
}
interface ProjectContainerStates {
    allProject: Project[],
    projectList: Project[],
    isLoading: boolean,
    redirectCreateNew: boolean
}

const ContainerDiv = styled.div`
    min-height: calc(100vh - 80px);
`;

class ProjectContainer extends Component<ProjectContainerProps, ProjectContainerStates> {
    projectService: ProjectService;
    config: Config;
    commonService: CommonService;
    constructor(props: ProjectContainerProps) {
        super(props);

        this.state = {
            allProject: [],
            projectList: [],
            isLoading: false,
            redirectCreateNew: false
        }
        this.projectService = new ProjectService();
        this.commonService = new CommonService();
        this.config = new Config();

        this.getProjectByFilter = this.getProjectByFilter.bind(this);
        this.deleteProjectHandler = this.deleteProjectHandler.bind(this);
        this.addProjectHandler = this.addProjectHandler.bind(this);
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
        let projects = await this.projectService.getAllData();
        this.props.storeProjects(projects);
        this.setState({ allProject: projects });
    }

    /**
     * Handle get data by filter
     * @param pagination pagination object
     */
    async getProjectByFilter(pagination: Pagination) {
        this.setState({
            isLoading: true
        });
        let projects = this.state.allProject;
        if (projects.length === 0) {
            projects = await this.projectService.getAllData();
            this.props.storeProjects(projects);
        }
        const startRow = pagination.pageSize * pagination.pageIndex
        const endRow = startRow + pagination.pageSize
        this.setState({
            allProject: projects,
            projectList: projects.slice(startRow, endRow),
            isLoading: false
        });
    }

    /**
     * Handle delete Project
     * @param records deleted records
     */
    async deleteProjectHandler(records: Project[]) {
        if (window.confirm("Do you want to delete the selected record(s)?")) {
            await this.projectService.deleteRecords(records);
            window.location.reload();
        }
    }

    /**
     * Move to create new page
     */
    addProjectHandler() {
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
                <Redirect push={true} to="/management/projects/createnew"></Redirect>
            )
        }
    }

    render() {
        const columns = [
            {
                Header: 'Name',
                id: 'name',
                accessor: 'name',
                Cell: ({ row }: { row: any }) => (<Link to={`projects/${row.original._id}`}>{row.original.name}</Link>)
            },
            {
                Header: 'Manager',
                id: 'manager',
                accessor: (row: Project) => row.manager ? `${row.manager.firstName} ${row.manager.lastName}` : ''
            }
        ];
        return (
            <div>
                {
                    this.redirectToCreateNew()
                }
                <Switch>
                    <Route exact path="/management/projects">
                        <ContainerDiv className="project-list">
                            <Table columns={columns}
                                data={this.state.allProject}
                                pageCount={this.state.allProject.length}
                                fetchData={() => { }}
                                deleteRecordHandler={this.deleteProjectHandler}
                                addRecordHandler={this.addProjectHandler}
                                TableName="Projects"
                            />
                        </ContainerDiv>
                    </Route>
                    <Route path={`/management/projects/:projectId`}>
                        <ProjectComponent loginUser={this.props.user.currentUser}></ProjectComponent>
                    </Route>
                </Switch>
            </div>
        );
    }
}

const MapStatesToProps = (store: AppState) => {
    return {
        user: store.user,
        projectList: store.projects
    };
}

const MapDispatchToProps = {
    storeProjects
};

export default connect(MapStatesToProps, MapDispatchToProps)(ProjectContainer)