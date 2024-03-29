import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg, EventApi, EventClickArg, formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { instance, requests } from "../../utils/axios";
import useMediaQuery from "../../hooks/useMediaQuery";
import { CalendarEvent, CalendarEventFromDB } from "../../types/type";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loading from "../../components/loading/Loading";

const Calendar = () => {
  const [savedEvents, setSavedEvents] = useState<CalendarEvent[]>([]);
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>([]);
  const isMediumScreen = useMediaQuery("(min-width: 768px)");
  const currentMember = useSelector((state: RootState) => state.member.currentMember);
  const memberId = currentMember?.member_id;

  const createEventMutation = useMutation({
    mutationFn: (newEvent: CalendarEvent) => instance.post(requests.postCalendarEvent, newEvent),
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: (deleteEvent: CalendarEvent) =>
      instance.delete(`${requests.deleteCalendarEvents}?member_id=${memberId}`, {
        data: deleteEvent,
      }),
    onError: (error: Error) => {
      console.error("Delete event error:", error.message);
    },
  });

  const deleteAllEventMutation = useMutation({
    mutationFn: () => instance.delete(`${requests.deleteCalendarAllEvents}?member_id=${memberId}`),
    onError: (error: Error) => {
      console.error("Delete event error:", error.message);
    },
  });

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
      setSavedEvents(eventObj);
    }
  }, [data]);

  const handleAddEventClick = (selected: DateSelectArg) => {
    if (!currentMember) return alert("Please login to add an event");
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: `${selected.startStr}-${title}`,
        title,
        start: selected.start,
        end: selected.end,
        allDay: selected.allDay,
        member_id: currentMember.member_id,
      };
      createEventMutation.mutate(newEvent);
      calendarApi.addEvent(newEvent);
    }
  };

  const handleDeleteEventClick = (selected: EventClickArg) => {
    if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
      const eventToDelete: CalendarEvent = {
        id: selected.event.id,
        title: selected.event.title,
        start: selected.event.start!,
        end: selected.event.end!,
        allDay: selected.event.allDay,
        member_id: currentMember?.member_id,
      };
      deleteEventMutation.mutate(eventToDelete);
      selected.event.remove();
    }
  };

  const handleDeleteAllEventClick = () => {
    if (window.confirm(`Are you sure you want to delete all events?`)) {
      deleteAllEventMutation.mutate();
      setSavedEvents([]);
      setCurrentEvents([]);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Box m="20px">
      <Box
        display="flex"
        flexDirection={isMediumScreen ? "row" : "column"}
        justifyContent="space-between"
      >
        {/* CALENDAR SIDEBAR */}
        <Box flex="1 1 20%" p="15px" borderRadius="4px">
          <Typography variant="h5" marginBottom={1}>
            Events
          </Typography>
          <Button variant="outlined" color="error" onClick={handleDeleteAllEventClick}>
            Delete All Events
          </Button>
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
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="70vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleAddEventClick}
            eventClick={handleDeleteEventClick}
            eventContent={(event) => <p>{event.event.title}</p>}
            events={savedEvents}
            eventsSet={(events: EventApi[]) => setCurrentEvents(events as CalendarEvent[])}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
