import React from 'react';
import Alert, { AlertProps } from 'react-bootstrap/Alert';
import styled from 'styled-components';
import './Alert.scss';
const ContainerDiv = styled.div`
    position: fixed;
    top: -20px;
    width: 100%;
    z-index: 1000000;
    padding: 30px;
`;
const CloseButton = styled.div`
    float: right;
    margin-top: -18px;
    cursor: pointer;
    margin-right: -10px;
`;
const AlertStyle: React.CSSProperties = {
    borderRadius: '.25rem'
};
type AlertStates = {
    show?: boolean
}
export class AlertDiv extends React.Component<AlertProps, AlertStates> {
    constructor(props:AlertProps){
        super(props);
        this.state = {
            show: this.props.show
        }

        this.setShow = this.setShow.bind(this);
    }
    setShow(flag: boolean){
        this.setState({
            show: flag
        });
    }
    handleOnCloseButton(){
        return this.props.onClose? this.props.onClose() : null;
    }
    render(){

        return(
            <ContainerDiv>
                {this.state.show ? (
                    <Alert style={AlertStyle}
                        key={this.props.key} 
                        variant={this.props.variant}>
                        <CloseButton onClick={()=> this.handleOnCloseButton()}>
                            <strong>x</strong>
                        </CloseButton>
                        {this.props.value}
                    </Alert>
                ) : ''
                }
            </ContainerDiv>
        );
    }
}