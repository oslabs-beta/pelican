/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import * as actions from '../../actions/actions';
import Row from './DeploymentRow.jsx';
import tableTemplate from '../../constants/tableInfoTemplate';
import { trackPromise } from 'react-promise-tracker';

const mapStateToProps = ({ clusterData }) => ({
  deployments: clusterData.deployments,
});

const mapDispatchToProps = (dispatch) => ({
  getDeployments: (deployments) => dispatch(actions.getDeployments(deployments)),
});

class DeploymentTable extends Component {
  async componentDidMount() {
    const { getDeployments } = this.props;
    try {
      // const response = await fetch('/api/deployments');
      // const deployments = await response.json();
      // getDeployments(deployments);
      await trackPromise(
        fetch('/api/deployments')
          .then((results) => results.json())
          .then((deployments) => getDeployments(deployments))
      );
    } catch (err) {
      console.log('An error occured: ', err);
    }
  }

  render() {
    const { deployments } = this.props;
    const headers = tableTemplate.deployments.headers.map((header, i) => {
      return (
        <TableCell align="left" key={`deploymentHeader${i}`}>
          {header}
        </TableCell>
      );
    });
    return (
      <TableContainer
        component={Paper}
        style={{
          width: `calc(100% - 200px)`,
          marginLeft: '200px',
          marginTop: '0',
        }}
      >
        <Table size="small" aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Deployments</TableCell>
              {headers}
            </TableRow>
          </TableHead>
          <TableBody>
            {deployments.map((deployment, i) => (
              <Row key={`deploymentRow${i}`} deployment={deployment} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentTable);
