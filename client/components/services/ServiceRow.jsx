/* eslint-disable no-restricted-syntax */
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
import tableTemplate from '../../constants/tableInfoTemplate';
import { Link } from 'react-router-dom';
import EditButton from '../Buttons/CoolButton.jsx';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function ServiceRow({ service }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const cells = tableTemplate.services.columns.map((column, i) => {
    let property = { ...service };
    const splitArray = column.split('.');
    while (splitArray.length) {
      property = property[splitArray[0]];
      splitArray.shift();
    }
    return (
      <StyledTableCell align="left" key={`serviceColumn${i}`}>
        {property}
      </StyledTableCell>
    );
  });

  return (
    <>
      <StyledTableRow className={classes.table}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {service.metadata.name}
        </StyledTableCell>
        {cells}
        <StyledTableCell>
          <Link to={`/services/${service.metadata.name}`}>
            <EditButton />
          </Link>
        </StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="subtitle1" gutterBottom component="div">
                Match Labels on Pods:
              </Typography>
              <Table size="small" aria-label="logs">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Key</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="left">
                      Value
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {service.spec.selector
                    ? Object.keys(service.spec.selector).map((key, i) => (
                        <StyledTableRow key={`deploymentCondition${i}`}>
                          <StyledTableCell component="th" scope="row">
                            {key}
                          </StyledTableCell>
                          <StyledTableCell>
                            {service.spec.selector[key]}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
              <Typography variant="subtitle1" gutterBottom component="div">
                Ports:
              </Typography>
              <Table size="small" aria-label="logs">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>
                      Protocol
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Port</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>
                      Target Port
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="left">
                      Node Port
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {service.spec.ports
                    ? service.spec.ports.map((portObj, i) => (
                        <StyledTableRow key={`servicePortsRow${i}`}>
                          {Object.values(portObj).map((value, i) => (
                            <StyledTableCell key={`servicePortValueRow${i}`}>
                              {value}
                            </StyledTableCell>
                          ))}
                        </StyledTableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
      <TableRow />
    </>
  );
}

export default ServiceRow;
