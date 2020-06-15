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
import Row from './ServiceRow.jsx';
import tableTemplate from '../../constants/tableInfoTemplate';
import { trackPromise } from 'react-promise-tracker';

const mapStateToProps = ({ clusterData }) => ({
  services: clusterData.services,
});

const mapDispatchToProps = (dispatch) => ({
  getServices: (services) => dispatch(actions.getServices(services)),
});

class ServiceTable extends Component {
  async componentDidMount() {
    const { getServices } = this.props;
    try {
      await trackPromise(
        fetch('/api/services')
          .then((results) => results.json())
          .then((services) => getServices(services))
      );
    } catch (err) {
      console.log('An error occured: ', err);
    }
  }

  render() {
    const { services } = this.props;
    const headers = tableTemplate.services.headers.map((header, i) => {
      return (
        <TableCell align="left" key={`serviceHeader${i}`}>
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
              <TableCell>Services</TableCell>
              {headers}
            </TableRow>
          </TableHead>

          <TableBody>
            {services.map((service, i) => (
              <Row key={`serviceRow${i}`} service={service} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceTable);
