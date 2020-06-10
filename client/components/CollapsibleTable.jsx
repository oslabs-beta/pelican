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
import * as actions from '../actions/actions';
import Row from './CollapsibleTableRow.jsx';

const mapStateToProps = (state) => ({
  localData: state.localData,
  display: state.localData.display,
});

const mapDispatchToProps = (dispatch) => ({
  getPods: (data) => dispatch(actions.getPods(data)),
  getNodes: (data) => dispatch(actions.getNodes(data)),
  getDeployments: (data) => dispatch(actions.getDeployments(data)),
  getServices: (data) => dispatch(actions.getServices(data)),
  getNamespaces: (data) => dispatch(actions.getNamespaces(data)),
});

class CollapsibleTable extends Component {
  async componentDidMount() {
    const { display } = this.props;
    try {
      const response = await fetch(`/api/local/${display}`);
      const data = await response.json();
      this.props[`get${display}`](data);
    } catch (err) {
      console.log('An error occured: ', err);
    }
  }

  render() {
    const { Pods } = this.props;
    const { display } = this.props;
    return (
      <div className="tableHolder">
        <div> {display} </div>
        <TableContainer component={Paper} style={{ width: '60%', height: '80%' }}>
          <Table size="small" aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Pods</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Namespace</TableCell>
                <TableCell align="right">Node</TableCell>
                <TableCell align="right">PodIP</TableCell>
                <TableCell align="right">Creation Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Pods.map((pod, i) => (
                <Row key={`row${i}`} row={i} pod={pod} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleTable);
