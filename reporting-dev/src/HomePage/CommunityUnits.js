import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText } from '@material-ui/core';
import {userActions} from '../_actions'



class CommunityUnits extends React.Component {
    state = {
        selectedIndex: 'community',
    };

    componentDidMount() {
        this.props.setCommunityUnitFilter('community')
    }
    
    handleListItemClick = (event, key) => {
        this.setState({ selectedIndex: key });
        this.props.setCommunityUnitFilter(key)
    };
    
    render() {
      const { units, selectedCommunity, communities, reports, enabledUnits } = this.props;
  
      return (
        <Fragment>
        <Typography style={{fontSize: 13, color: '#707070', height: '35px'}}>
            Community/Units
        </Typography>  
        <List dense style={{fontSize: 14, color: '#404040'}}>
            <ListItem onClick={(event) => this.handleListItemClick(event, 'community')} button style={this.state.selectedIndex === 'community' ? {backgroundColor: '#1ADCFF', borderBottom: '0.1px solid', height: '35px'} : {backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px'} }>
                <ListItemText primary={communities.find(c => c.id === selectedCommunity).name} />
            </ListItem>
            {
                units.map(u => 
                    <ListItem
                      disabled={enabledUnits.indexOf(u.id) === -1}
                      key={u.id}
                      onClick={(event) => this.handleListItemClick(event, u.id)}
                      button
                      style={this.state.selectedIndex === u.id ? {backgroundColor: '#1ADCFF', borderBottom: '0.1px solid', height: '35px'} : {backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px'} }
                    >
                        <ListItemText primary={u.name} />
                    </ListItem>
                )
            }   
        </List>
        </Fragment>
        )
    }
}
  
function mapStateToProps(state) {
    const { units, selectedCommunity, communities, reports } = state.user;
    return {
        units,
        selectedCommunity,
        communities,
        reports,
        enabledUnits: Object.keys(reports.unit)
    };
}

const mapDispatchToProps = (dispatch) => ({
    setCommunityUnitFilter: (key) => {
        dispatch(userActions.setCommunityUnitFilter(key))
    }
})
  
const connectedCommunityUnits = connect(mapStateToProps, mapDispatchToProps)(CommunityUnits);
export { connectedCommunityUnits as CommunityUnits }; 