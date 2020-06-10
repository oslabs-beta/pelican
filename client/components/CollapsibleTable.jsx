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
  pods: state.localData.pods,
});

const mapDispatchToProps = (dispatch) => ({
  getPods: (data) => dispatch(actions.getPods(data)),
});

class CollapsibleTable extends Component {
  async componentDidMount() {
    const { getPods } = this.props;
    try {
      const response = await fetch('/api/local/pods');
      // console.log("response: ", response);
      const data = await response.json();
      //console.log("response data:::  ", data);
      getPods(data);
    } catch (err) {
      console.log('An error occured: ', err);
    }
  }

  render() {
    console.log('PODPROPS:: ', this.props);
    const { pods } = this.props;
    return (
      <div className="tableHolder">
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
              {pods.map((pod, i) => (
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
