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
import tableTemplate from '../constants/tableInfoTemplate';

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

function Row(props) {
  const { elem } = props;
  const { type } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const cells = [];
  for (const column of tableTemplate[type].columns) {
    let result = { ...elem };
    const splitArray = column.split('.');
    while (splitArray.length) {
      result = result[splitArray[0]];
      splitArray.shift();
    }
    cells.push(
      <StyledTableCell align='left' key={column}>
        {result}
      </StyledTableCell>
    );
  }

  return (
    <>
      <StyledTableRow className={classes.table}>
        <StyledTableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component='th' scope='row'>
          {elem.metadata.name}
        </StyledTableCell>
        {cells}
      </StyledTableRow>
      <TableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h6' gutterBottom component='div'>
                Logs:
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>logs1</TableCell>
                    <TableCell>logs2</TableCell>
                    <TableCell align='right'>logs3</TableCell>
                    <TableCell align='right'>more logs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {['stuff', 'otherstuff'].map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell component='th' scope='row'>
                        {row}
                      </StyledTableCell>
                      <StyledTableCell>{row}</StyledTableCell>
                      <StyledTableCell align='right'>{row}</StyledTableCell>
                      <StyledTableCell align='right'>
                        {Math.round(1 * 5 * 100) / 100}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
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

export default Row;
