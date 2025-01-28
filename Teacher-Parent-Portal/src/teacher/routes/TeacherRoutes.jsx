import LandingPage from "../landingPages/LandingPage";
import ChildLandingPage from "../landingPages/ChildLandingPage";
import Profile from "../profile/Profile";
import Schedules from "../schedules/Schedules";
import AddActivity from "../children/AddActivity";
import ShowAllActivities from "../children/ShowAllActivities";
import ChildAttendanceLandingPage from "../landingPages/ChildAttendanceLandingPage";
import AddChildAttendance from "../children/AddChildAttendance";
import AttendanceRecords from "../children/AttendanceRecords";
import MileStonesLandingPage from "../landingPages/MileStonesLandingPage";
import AddMilestone from "../children/AddMilestone";
import MilestoneRecords from "../children/MilestoneRecords";
import Attendance from "../attendance/Attendance";

export default [
  {
    path: "welcome",
    element: <LandingPage />,
  },
  {
    path: "childActions",
    element: <ChildLandingPage />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "schedules",
    element: <Schedules />,
  },
  {
    path: "addActivity",
    element: <AddActivity />,
  },
  {
    path: "showActivities",
    element: <ShowAllActivities />,
  },
  {
    path: "ChildAttendanceLandingPage",
    element: <ChildAttendanceLandingPage />,
  },
  {
    path: "addChildAttendance",
    element: <AddChildAttendance />,
  },
  {
    path: "attendanceRecords",
    element: <AttendanceRecords />,
  },
  {
    path: "mileStonesLandingPage",
    element: <MileStonesLandingPage />,
  },
  {
    path: "addMilestone",
    element: <AddMilestone />,
  },
  {
    path: "milestoneRecords",
    element: <MilestoneRecords />,
  },
  {
    path: "teacherAttendance",
    element: <Attendance />,
  },
];
