import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { userActions } from '../_actions';
import { InputBase } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme1 = createMuiTheme({
  overrides: {
    MuiSelect: {
      select: {
        "&:focus": {
          background: "transparent"
        }
      }
    }
  }
});

const BootstrapInput = withStyles(theme => ({
  input: {
    fontWeight: 500,
    color: 'white',
    fontSize: '22px'
  }
}))(InputBase);

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  icon: {
    color: "white",
    top: 'calc(50% - 15px)'
  }
});

class SimpleSelect extends React.Component {
  state = {
    community: this.props.communities[0].name
  };

  handleChange = event => {
    this.props.setCommunity(this.props.communities.filter(c => c.name === event.target.value)[0].id)
    this.setState({ 
      community: event.target.value 
    });
  };

  render() {
    const { classes, communities } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl variant="standard" className={classes.formControl}>
        <MuiThemeProvider theme={theme1}>
          <Select
            value={this.state.community}
            onChange={this.handleChange}
            input={<BootstrapInput name="community" id="select-community"/>}
            classes={{
              icon: classes.icon
            }}
          >
            {communities.map(c => {
              return(
                <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>
              )
            })}
          </Select>
        </MuiThemeProvider>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { communities } = state.user;
  return {
      communities
  };
}

const mapDispatchToProps = (dispatch) => ({
  setCommunity: (id) => {
    dispatch(userActions.setCommunity(id))
  },
})

const connectedSimpleSelect = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SimpleSelect));
export { connectedSimpleSelect as SearchBar }; 