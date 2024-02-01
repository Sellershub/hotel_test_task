import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { IHotel } from "../../types/types";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import styled from "@emotion/styled";

interface ITask {
  id: number;
  taskTitle: string;
  duration: number;
  deadline: string;
  name: string;
  chambermaid: string;
}

export default function TableTasks() {
  const { hotels }: any = useSelector(
    (state: any) => state["chambermaidReducer"]
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="custom table">
        <TableHeadStyled>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Task</TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Duration&nbsp;(hours)
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Deadline
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Hotel
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Chambermaid
            </TableCell>
          </TableRow>
        </TableHeadStyled>
        <TableBody>
          {hotels?.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.titleTask}
              </TableCell>
              <TableCell align="right">
                {dayjs
                  .duration(row.duration.end - row.duration.start)
                  .format("HH:mm")}
              </TableCell>
              <TableCell align="right">
                {new Date(row.deadline).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.chambermaid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const TableHeadStyled = styled(TableHead)({
  background: "blue",
  color: "white",
});
