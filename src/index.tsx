
// Delete me
import * as  React from 'react';
import  { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import CalendarTodayIcon from "@material-ui/icons/CalendarTodayOutlined";
import { Button } from "@material-ui/core";

const DateComponent = (props:any) => {
  const { value, onChange = () => console.log(value), className = "" } = props;
  const [selectedDate, setSelectedDate] = useState(
    value ? Date.parse(value) : Date.now()
  );
  const [calendarDate, setCalendarDate] = useState(Date.now());
  const [selectEdge, setSelectEdge] = useState(null);
  const open = Boolean(selectEdge);

  const handleCalendarChange = (date:any) => {
    setCalendarDate(date);
    // setDate(date);
  };

  const handleCalendarClose = () => {
    // setDate(Date.now());
    setCalendarDate(Date.now());
    setSelectEdge(null);
  };

  const handleCalendarOpen = (edge:any) => {
    setSelectEdge(edge);
  };

  const handleCalendarAccept = (date:any) => {
    setCalendarDate(Date.now());

    if (selectEdge === "start") {
      setSelectedDate(date);
      onChange(format(date, "dd MMM yyyy"));
    }

    setSelectEdge(null);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        // maxDate={moment()}
        onAccept={handleCalendarAccept}
        onChange={handleCalendarChange}
        onClose={handleCalendarClose}
        open={open}
        style={{ display: "none" }} // Temporal fix to hide the input element
        value={calendarDate}
        variant="dialog"
      />
      <Button
        onClick={() => handleCalendarOpen("start")}
        variant="outlined"
        className={className}
      >
        <CalendarTodayIcon />
        {format(selectedDate, "dd MMM yyyy")}
      </Button>
    </MuiPickersUtilsProvider>
  );
};

export default DateComponent;

