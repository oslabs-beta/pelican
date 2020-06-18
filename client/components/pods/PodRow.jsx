/* eslint-disable react/prop-types */
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
import DeletePod from '../Buttons/DeletePod.jsx';

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
  const { pod } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const cells = tableTemplate.pods.columns.map((column, i) => {
    if (column === 'Cpu') {
      return (
        <StyledTableCell align="left" key={`podColumn${i}`}>
          {getCpu(pod)}
        </StyledTableCell>
      );
    }
    if (column === 'Memory') {
      return (
        <StyledTableCell align="left" key={`podColumn${i}`}>
          {getMemory(pod)}
        </StyledTableCell>
      );
    }
    let property = { ...pod };
    const splitArray = column.split('.');
    while (splitArray.length) {
      property = property[splitArray[0]];
      splitArray.shift();
    }
    return (
      <StyledTableCell align="left" key={`podcolumn${i}`}>
        {property}
      </StyledTableCell>
    );
  });

  function getCpu(pod) {
    return pod.spec.containers
      .map((container) =>
        container.resources.requests
          ? Number(
              container.resources.requests.cpu.substring(
                0,
                container.resources.requests.cpu.length - 1
              )
            )
          : null
      )
      .reduce((curCpu, totalCpu) => {
        return (totalCpu += curCpu);
      });
  }

  function getMemory(pod) {
    return pod.spec.containers
      .map((container) =>
        container.resources.memory
          ? Number(
              container.resources.requests.memory.substring(
                0,
                container.resources.requests.memory.length - 2
              )
            )
          : null
      )
      .reduce((curMem, totalMem) => {
        return (totalMem += curMem);
      });
  }

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
        <StyledTableCell
          component="th"
          scope="row"
          style={{ maxWidth: '200px' }}
        >
          {pod.metadata.name}
        </StyledTableCell>
        {cells}
        <StyledTableCell>
          <Link to={`/pods/${pod.metadata.name}`}>
            <EditButton />
          </Link>
        </StyledTableCell>
        <StyledTableCell>
          <DeletePod
            name={pod.metadata.name}
            namespace={pod.metadata.namespace}
          />
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
                Status History:
              </Typography>
              <Table size="small" aria-label="logs">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="left">
                      Transitioned At
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pod.status.conditions.map((condition, i) => (
                    <StyledTableRow key={`podCondition${i}`}>
                      <StyledTableCell component="th" scope="row">
                        {condition.type}
                      </StyledTableCell>
                      <StyledTableCell>
                        {condition.lastTransitionTime}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography variant="subtitle1" gutterBottom component="div">
                Container Statuses:
              </Typography>
              <Table size="small" aria-label="logs">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="left">
                      Image
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="left">
                      State
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="left">
                      Ready
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="left">
                      Restart Count
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pod.status.containerStatuses.map((container, i) => (
                    <StyledTableRow key={`podContainerStatus${i}`}>
                      <StyledTableCell component="th" scope="row">
                        {container.name}
                      </StyledTableCell>
                      <StyledTableCell>{container.image}</StyledTableCell>
                      <StyledTableCell>
                        {Object.keys(container.state)[0]}
                      </StyledTableCell>
                      <StyledTableCell>
                        {container.ready.toString()}
                      </StyledTableCell>
                      <StyledTableCell>
                        {container.restartCount}
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
