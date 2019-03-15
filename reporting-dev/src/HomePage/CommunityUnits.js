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
      const { sortedUnits, selectedCommunity, communities } = this.props;
  
      return (
        <Fragment>
        <Typography style={{fontSize: 13, color: '#707070', height: '35px', fontWeight: '500'}}>
            Community/Units
        </Typography>  
        <List dense style={{fontSize: 14, color: '#404040', height: 'calc(100% - 35px)', overflow: 'auto'}}>
            <ListItem onClick={(event) => this.handleListItemClick(event, 'community')} button style={this.state.selectedIndex === 'community' ? {backgroundColor: '#1ADCFF', borderBottom: '0.1px solid', height: '35px', fontSize: 14, color: 'white', fontWeight: '400'} : {backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px', fontSize: 14, color: '#404040', fontWeight: '400'} }>
                <ListItemText disableTypography primary={communities.filter(c => c.id === selectedCommunity)[0].name} />
            </ListItem>
            {
                sortedUnits.map(u => 
                    <ListItem
                      key={u.id}
                      onClick={(event) => this.handleListItemClick(event, u.id)}
                      button
                      style={this.state.selectedIndex === u.id ? {backgroundColor: '#1ADCFF', borderBottom: '0.1px solid', height: '35px', fontSize: 14, color: 'white', fontWeight: '400'} : {backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px', fontSize: 14, color: '#404040', fontWeight: '400'} }
                    >
                        <ListItemText disableTypography primary={u.name} />
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
    const sortedUnits = units.sort((a, b) => {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })
    return {
        sortedUnits,
        selectedCommunity,
        communities,
        reports
    };
}

const mapDispatchToProps = (dispatch) => ({
    setCommunityUnitFilter: (key) => {
        dispatch(userActions.setCommunityUnitFilter(key))
    }
})
  
const connectedCommunityUnits = connect(mapStateToProps, mapDispatchToProps)(CommunityUnits);
export { connectedCommunityUnits as CommunityUnits }; 