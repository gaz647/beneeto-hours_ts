import "./Summary.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";

import { deleteDay, deleteAll } from "../redux/hours";
import moment from "moment";

const Summary: React.FC = () => {
  const sumDays = useSelector((state: RootState) => state.hours.sumDays);
  const sumMinutes = useSelector((state: RootState) => state.hours.sumMinutes);

  const dispatch = useDispatch();

  return (
    <section className="summary">
      {sumMinutes > 0 ? (
        <>
          <h2 className="summmary-heading">Souhrn</h2>
          <div className="summmary-heading">
            {Math.floor(sumMinutes / 60) +
              "h " +
              (sumMinutes - Math.floor(sumMinutes / 60) * 60) +
              "m"}
          </div>
        </>
      ) : null}

      <ul>
        {sumDays.map(
          ({
            startDate,
            startTime,
            endDate,
            endTime,
            totalMinutes,
            id,
          }: {
            startDate: string;
            startTime: string;
            endDate: string;
            endTime: string;
            totalMinutes: number;
            id: string;
          }) => {
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes - hours * 60;
            return (
              <li className="summary-one-day" key={id}>
                <div className="summary-one-day-days">
                  <div className="summary-one-day-days-flex-container">
                    <div className="summary-one-day-heading">Začátek</div>
                    <p>{startDate}</p>
                    <p>{moment(startTime).format("HH:mm")}</p>
                  </div>
                  <div className="summary-one-day-days-flex-container">
                    <div className="summary-one-day-heading">Konec</div>
                    <p>{endDate}</p>
                    <p>{moment(endTime).format("HH:mm")}</p>
                  </div>
                </div>

                <div className="summary-one-day-hours">
                  {hours + "h " + minutes + "m"}
                </div>

                <button
                  className="summary-one-day-delete-btn"
                  type="button"
                  onClick={() => dispatch(deleteDay(id))}
                >
                  Smazat
                </button>
              </li>
            );
          }
        )}
      </ul>
      {sumDays.length > 1 && (
        <button
          className="delete-all-btn"
          onClick={() => dispatch(deleteAll())}
        >
          Smazat vše
        </button>
      )}
    </section>
  );
};

export default Summary;
