import { useSelector } from "react-redux";
import { instance, requests } from "../../utils/axios";
import { RootState } from "../../redux/store";
import { useQuery } from "@tanstack/react-query";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { formatDate } from "@fullcalendar/core/index.js";
import { CalendarEvent, CalendarEventFromDB } from "../../types/type";
import { useEffect, useState } from "react";
import PieChart from "../../components/pieChart/pieChart";
import BarChart from "../../components/BarChart/BarChart";
import LineChart from "../../components/lineChart/LineChart";
import Message from "../../components/message/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components/loading/Loading";

const Home = () => {
  const currentMember = useSelector((state: RootState) => state.member.currentMember);
  const memberId = currentMember?.member_id;
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>([]);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetchCalendarEvents", memberId],
    queryFn: () => instance.get(`${requests.fetchCalendarEvents}?member_id=${memberId}`),
  });

  useEffect(() => {
    if (data) {
      const eventObj = data.data.map((event: CalendarEventFromDB) => ({
        id: event.id,
        title: event.title,
        start: event.start_date,
        end: event.end_date,
        allDay: event.allday === "1",
      }));
      setCurrentEvents(eventObj);
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <main className="box">
      <div className="box__1">
        <Message
          icon={<FontAwesomeIcon icon={faBell} size="lg" />}
          title="Notification"
          text="New Notification : 1"
        />
      </div>
      <div className="box__2">
        <Message
          icon={<FontAwesomeIcon icon={faEnvelope} size="lg" />}
          title="Email"
          text="New Email : 42"
        />
      </div>
      <div className="box__3">
        <h1>Calendar Events</h1>
        {currentEvents.length === 0 ? (
          <p className="box__3-message">No events</p>
        ) : (
          <List sx={{ overflowY: "auto", maxHeight: "80vh" }}>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: "#eeeeee",
                  margin: "10px 0",
                  borderRadius: "2px",
                  padding: "10px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  style={{ color: "#000" }}
                  secondary={
                    <Typography>
                      {formatDate(event.start || new Date(), {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </div>
      <div className="box__5">
        <h3 className="box__5-title">Programming Language Popularity Metrics</h3>
        <div className="box__container">
          <PieChart isDashBoard={true} />
        </div>
      </div>
      <div className="box__6">
        <h3 className="box__6-title">International Food Popularity Comparison</h3>
        <div className="box__container">
          <BarChart isDashBoard={true} />
        </div>
      </div>
      <div className="box__7">
        <h3 className="box__7-title">Transportation Preferences Across Countries</h3>
        <div className="box__container">
          <LineChart isDashBoard={true} />
        </div>
      </div>
    </main>
  );
};

export default Home;
