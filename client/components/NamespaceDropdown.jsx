import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import * as actions from '../actions/actions';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const mapStateToProps = ({ clusterData }) => ({
  namespaces: clusterData.namespaces,
});

const mapDispatchToProps = (dispatch) => ({
  getNamespaces: (namespacesRes) =>
    dispatch(actions.getNamespaces(namespacesRes)),
  setTargetNamespace: (namespace) =>
    dispatch(actions.setTargetNamespace(namespace)),
});

function NamespaceDropdown({ getNamespaces, namespaces, setTargetNamespace }) {
  useEffect(() => {
    const fetchNamespaces = async () => {
      try {
        const response = await fetch('/api/namespaces');
        const namespacesRes = await response.json();
        getNamespaces(namespacesRes);
      } catch (err) {
        console.log('An error occured: ', err);
      }
    };
    fetchNamespaces();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Select Namespace
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {namespaces
          ? namespaces.concat(['All']).map((namespace, i) => (
              <StyledMenuItem
                key={`${namespace}${i}`}
                onClick={() => {
                  setTargetNamespace(namespace);
                  handleClose();
                }}
              >
                <ListItemText primary={namespace} />
              </StyledMenuItem>
            ))
          : null}
      </StyledMenu>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NamespaceDropdown);
