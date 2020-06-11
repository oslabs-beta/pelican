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
import * as actions from '../actions/actions';
import Row from './CollapsibleTableRow.jsx';
import tableTemplate from '../constants/tableInfoTemplate';

const mapStateToProps = (state) => ({
  localData: state.localData,
  display: state.localData.display,
});

const mapDispatchToProps = (dispatch) => ({
  getPods: (data) => dispatch(actions.getPods(data)),
});

class CollapsibleTable extends Component {
  async componentDidMount() {
    const { display } = this.props;
    const dispatchFunc = `get${display[0]
      .toUpperCase()
      .concat(display.slice(1))}`;
    try {
      const response = await fetch(`/api/local/${display}`);
      const data = await response.json();
      this.props[dispatchFunc](data);
    } catch (err) {
      console.log('An error occured: ', err);
    }
  }

  render() {
    const { display } = this.props;
    const tableData = [...this.props.localData[display]];

    const headers = [];
    for (const header of tableTemplate[display].headers) {
      headers.push(
        <TableCell align='left' key={`${display}${header}`}>
          {header}
        </TableCell>
      );
    }
    return (
      <div className='tableHolder'>
        <TableContainer
          component={Paper}
          style={{ width: '100%', height: '100%' }}
          id='tableContainer'
        >
          <Table size='small' aria-label='collapsible table'>
            <TableHead>
              <TableRow>
                <TableCell>
                  {display[0].toUpperCase().concat(display.slice(1))}
                </TableCell>
                {headers}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((elem, i) => (
                <Row key={`row${i}`} row={i} elem={elem} type={display} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleTable);
