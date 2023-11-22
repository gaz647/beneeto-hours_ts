import "./HoursAdder.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addDay } from "../redux/hours";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const HoursAdder: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [readyToDispatch, setReadyToDispatch] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStart = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setStartDate(moment(value).format("DD MMMM YYYY"));
    setStartTime(value);
    if (endTime !== "") {
      setReadyToDispatch(true);
    }
  };

  const handleEnd = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setEndDate(moment(value).format("DD MMMM YYYY"));
    setEndTime(value);
    if (startTime !== "") {
      setReadyToDispatch(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const startMoment = moment(startTime);
    const endMoment = moment(endTime);

    if (!startMoment.isValid() || !endMoment.isValid()) {
      window.alert("Vocasoid, vyplň obě pole");
      return;
    }

    if (endMoment.isBefore(startMoment)) {
      window.alert("Vocasoid, končíš dřív než jsi začal? :D :D :D");
      return;
    }

    const totalMinutes = endMoment.diff(startMoment, "minutes");
    const resultToDispatch = {
      startDate,
      startTime,
      endDate,
      endTime,
      totalMinutes,
      id: uuidv4(),
    };
    dispatch(addDay(resultToDispatch));
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setReadyToDispatch(false);
    navigate("/summary");
  };

  return (
    <section className="hours-adder">
      <form className="hours-adder-form" onSubmit={(e) => handleSubmit(e)}>
        <p>Začátek</p>
        <input
          type="datetime-local"
          onChange={(e) => handleStart(e)}
          value={startTime}
        />

        <p>Konec</p>
        <input
          type="datetime-local"
          onChange={(e) => handleEnd(e)}
          value={endTime}
        />
        {readyToDispatch && (
          <button className="hours-adder-form-btn" type="submit" value="Uložit">
            Uložit
          </button>
        )}
      </form>
    </section>
  );
};

export default HoursAdder;
