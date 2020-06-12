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
import Row from './NodeRow.jsx';
import tableTemplate from '../../constants/tableInfoTemplate';

const mapStateToProps = ({ clusterData }) => ({
  nodes: clusterData.nodes,
});

const mapDispatchToProps = (dispatch) => ({
  getNodes: (nodes) => dispatch(actions.getNodes(nodes)),
});

class NodeTable extends Component {
  async componentDidMount() {
    const { getNodes } = this.props;
    try {
      const response = await fetch('/api/nodes');
      const nodes = await response.json();
      getNodes(nodes);
    } catch (err) {
      console.log('An error occured: ', err);
    }
  }

  render() {
    const { nodes } = this.props;
    const headers = tableTemplate.nodes.headers.map((header, i) => {
      return (
        <TableCell align="left" key={`nodeHeader${i}`}>
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
              <TableCell>Nodes</TableCell>
              {headers}
            </TableRow>
          </TableHead>

          <TableBody>
            {nodes.map((node, i) => (
              <Row key={`nodeRow${i}`} node={node} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeTable);
