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
import AddButton from '../Buttons/AddButton.jsx';
import SubtractButton from '../Buttons/SubtractButton.jsx';
import DeleteButton from '../Buttons/TrashButton.jsx';

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

const handleScale = (deployment, index, setDeployment, direction) => {
  let newNum = 0;
  if (direction === 'up') {
    newNum = deployment.spec.replicas + 1;
  } else {
    if (deployment.spec.replicas === 0) {
      return;
    }
    newNum = deployment.spec.replicas - 1;
  }
  fetch(`/api/deployments/scale?name=${deployment.metadata.name}`, {
    method: 'PUT',
    body: JSON.stringify({
      namespace: deployment.metadata.namespace,
      spec: { replicas: newNum },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((result) => {
      return result.json();
    })
    .then((deployment) => {
      setDeployment({ deployment, index });
    })
    .catch((err) => console.log(err));
};

function DeploymentRow({ deployment, setDeployment, index }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const cells = tableTemplate.deployments.columns.map((column, i) => {
    let property = { ...deployment };
    const splitArray = column.split('.');
    while (splitArray.length) {
      property = property[splitArray[0]];
      splitArray.shift();
    }
    if (column === 'spec.replicas') {
      return (
        <StyledTableCell
          align="left"
          key={`deploymentColumn${i}`}
          style={{ minWidth: '180px' }}
        >
          <SubtractButton
            onClick={() => {
              handleScale(deployment, index, setDeployment, 'down');
            }}
          />
          {property}
          <AddButton
            onClick={() => handleScale(deployment, index, setDeployment, 'up')}
          />
        </StyledTableCell>
      );
    } else {
      return (
        <StyledTableCell align="left" key={`deploymentColumn${i}`}>
          {property}
        </StyledTableCell>
      );
    }
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
          {deployment.metadata.name}
        </StyledTableCell>
        {cells}
        <StyledTableCell>
          <Link to={`/deployments/${deployment.metadata.name}`}>
            <EditButton />
          </Link>
        </StyledTableCell>
        <StyledTableCell>
          <DeleteButton />
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
                  {Object.keys(deployment.spec.selector.matchLabels).map(
                    (key, i) => (
                      <StyledTableRow key={`deploymentCondition${i}`}>
                        <StyledTableCell component="th" scope="row">
                          {key}
                        </StyledTableCell>
                        <StyledTableCell>
                          {deployment.spec.selector.matchLabels[key]}
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  )}
                </TableBody>
              </Table>
              <Typography variant="subtitle1" gutterBottom component="div">
                Containers:
              </Typography>
              <Table size="small" aria-label="logs">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="left">
                      Image
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deployment.spec.template.spec.containers.map(
                    (container, i) => (
                      <StyledTableRow key={`deploymentContainerStatus${i}`}>
                        <StyledTableCell component="th" scope="row">
                          {container.name}
                        </StyledTableCell>
                        <StyledTableCell>{container.image}</StyledTableCell>
                      </StyledTableRow>
                    )
                  )}
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

export default DeploymentRow;
