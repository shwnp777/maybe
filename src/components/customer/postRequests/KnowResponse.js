import { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const KnowResponse = ({ selections }) => {
  console.log("selections: ", selections);

  return (
    <div>
      <Fragment>
        <h3>Here are your results:</h3>
        <p>*sorted from highest concentration to lowest”</p>
        {Object.keys(selections).length === 0 ? (
          <div
            className="alerts"
            styles={{
              background: "red",
              color: "#fff",
              padding: "20px",
              borderRadius: "20px",
              margin: "20px 0",
            }}
          >
            <h3>
              We're Sorry! We cannot seem to find any products that match your
              search criteria.
            </h3>
            <h3>Please try again, or ask the Budtender for help.</h3>
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Strain</TableCell>
                  <TableCell align="center">Percentage</TableCell>
                  <TableCell align="center">Total THC</TableCell>
                  <TableCell align="center">Total CBD</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selections.map((select, index) => (
                  <TableRow
                    key={select.StrainID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{select.Strain}</TableCell>
                    <TableCell align="center">
                      {(select.Percentage * 100).toFixed(2)}%
                    </TableCell>
                    <TableCell align="center">
                      {(select.TotalTHC * 100).toFixed(2)}%
                    </TableCell>
                    <TableCell align="center">
                      {(select.TotalCBD * 100).toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Fragment>

      <div className="refresh">
        <Link to="/" onClick={() => {}}>
          <Button variant="contained" color="success" className="btn">
            New Search
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default KnowResponse;
