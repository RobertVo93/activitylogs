import React from 'react';
import styled from 'styled-components';
const ContainerDiv = styled.div`
    margin: auto;
    padding-top: 15px;
    border-bottom: 0.2px solid #b0b0b0;
`;
export interface BreakLineProps {
    cssProperties?: React.CSSProperties
}
export class BreakLine extends React.Component<BreakLineProps> {

    render(){
        return(
            this.props.cssProperties ? 
            (
                <div style={this.props.cssProperties}></div>
            )
            :
            (
                <ContainerDiv></ContainerDiv>
            )
            
        );
    }
}