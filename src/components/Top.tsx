import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import { useFormik } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHotels, setChambermaid } from "../Store/chambermaid.slice";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { IChambermaid, IGetHouseKepper, IAppState } from "../../types/types";
import * as Yup from "yup";

const hotelsArray = [
  { id: 1, hotel: "Hotel A" },
  { id: 2, hotel: "Hotel B" },
  { id: 3, hotel: "Hotel C" },
];

function Top() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs(),
    dayjs().add(5, "m"),
  ]);
  const id = useId();
  dayjs.extend(duration);

  const dispatch = useDispatch();

  const { chambermaid }: { chambermaid: IChambermaid[] } = useSelector(
    (state: IAppState) => state.chambermaidReducer
  );

  const getChambermaid = (hotel: IGetHouseKepper) => {
    const inHotels = [...chambermaid].filter(
      (item: IChambermaid) => item.hotelName === hotel.name
    );

    const sortedInHotels = inHotels.sort(
      (item1: IChambermaid, item2: IChambermaid) => {
        return item1.free.length - item2.free.length;
      }
    );

    dispatch(
      setChambermaid({
        name: sortedInHotels[0].name,
        taskTime: { start: hotel.rangeTime[0], end: hotel.rangeTime[1] },
      })
    );
    return sortedInHotels[0].name;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      id: id,
      titleTask: "",
      rangeTime: [dayjs().valueOf(), dayjs().add(5, "m").valueOf()],
      name: "",
    },

    validationSchema: Yup.object({
      titleTask: Yup.string().required("Title is required"),
      name: Yup.string().required("Hotel name is required"),
    }),

    onSubmit: (values) => {
      const newValues = {
        id: values.id,
        titleTask: values.titleTask,
        name: values.name,
        duration: { start: values.rangeTime[0], end: values.rangeTime[1] },
        deadline: values.rangeTime[1],
        chambermaid: getChambermaid(values),
      };
      dispatch(setHotels(newValues));
      formik.resetForm();
      handleClose();
    },
  });

  return (
    <>
      <div className="top_wrap">
        <Typography variant="h2">Table</Typography>
        <Button
          variant="contained"
          sx={{ height: "fit-content" }}
          onClick={() => setOpen(true)}
        >
          Add Task
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            width: "40%",
            height: "40%",
            bgcolor: "white",
            borderRadius: "25px",
            padding: "30px",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Create Task
          </Typography>

          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              id="titleTask"
              name="titleTask"
              label="Add the Task"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.titleTask}
              error={
                formik.touched.titleTask && Boolean(formik.errors.titleTask)
              }
              helperText={formik.touched.titleTask && formik.errors.titleTask}
              required
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem component="MultiInputTimeRangeField">
                <MultiInputTimeRangeField
                  value={time}
                  onChange={(newValue: [Dayjs | null, Dayjs | null]) => {
                    const [start, end] = newValue.map(
                      (date) => date || dayjs()
                    );
                    setTime([start, end]);
                    formik.setFieldValue(
                      "rangeTime",
                      [start, end].map((date) => date.valueOf())
                    );
                  }}
                />
              </DemoItem>
            </LocalizationProvider>
            <FormControl fullWidth>
              <InputLabel id="hotelName">Hotel</InputLabel>
              <Select
                labelId="hotelName"
                id="hotelName"
                value={formik.values.name}
                label="Hotel"
                required
                onChange={(e: any) =>
                  formik.setFieldValue("name", e.target.value)
                }
                error={formik.touched.name && Boolean(formik.errors.name)}
              >
                {hotelsArray.map((hotel) => (
                  <MenuItem key={hotel.id} value={hotel.hotel}>
                    {hotel.hotel}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.name && formik.errors.name && (
                <Typography variant="caption" color="error">
                  {formik.errors.name}
                </Typography>
              )}
            </FormControl>

            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Top;
