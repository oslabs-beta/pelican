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
import Row from './PodRow.jsx';
import tableTemplate from '../../constants/tableInfoTemplate';
import { trackPromise } from 'react-promise-tracker';

const mapStateToProps = ({ clusterData, appState }) => ({
  pods: clusterData.pods,
  firstLoad: appState.firstLoad,
  targetNamespace: clusterData.targetNamespace,
});

const mapDispatchToProps = (dispatch) => ({
  getPods: (pods) => dispatch(actions.getPods(pods)),
  firstLoad: () => dispatch(actions.firstLoad()),
});

class PodTable extends Component {
  async componentDidMount() {
    const { getPods, firstLoad } = this.props;
    try {
      await trackPromise(
        fetch('/api/pods')
          .then((results) => results.json())
          .then((pods) => getPods(pods))
      );
      firstLoad();
      // const pods = await response.json()).then(
      // getPods(pods));
    } catch (err) {
      console.log('An error occured: ', err);
    }
  }
  render() {
    const { pods, targetNamespace, getPods } = this.props;
    const headers = tableTemplate.pods.headers.map((header, i) => {
      return (
        <TableCell align="left" key={`podHeader${i}`}>
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
              <TableCell>Pods</TableCell>
              {headers}
            </TableRow>
          </TableHead>

          <TableBody>
            {pods
              .filter((pod) =>
                targetNamespace
                  ? pod.metadata.namespace === targetNamespace ||
                    targetNamespace === 'All'
                  : pod
              )
              .map((pod, i) => (
                <Row key={`podRow${i}`} pod={pod} getPods={getPods} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PodTable);
