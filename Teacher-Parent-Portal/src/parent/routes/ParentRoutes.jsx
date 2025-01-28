import WelcomeLandingPage from "../landingPages/WelcomeLandingPage";
import Profile from "../profile/Profile";
import FamilyProfile from "../profile/FamilyProfile";
import ViewChildren from "../children/ViewChildren";
import ViewChildActivities from "../children/ViewChildActivities";
import ViewMilestones from "../children/ViewMilestones";
import ViewAttendance from "../children/ViewAttendance";
import ViewAuthorizedPickups from "../children/ViewAuthorizedPickups";
import ViewEmergencyContacts from "../children/ViewEmergencyContacts";
import FamilyDocuments from "../children/FamilyDocuments";
import ChildDocuments from "../children/ChildDocuments";
import ChildMessages from "../children/ChildMessages";
import FormsLandingPage from "../landingPages/FormsLandingPage";
import NewEnrollHomeEdForm from "../form/NewEnrollHomeEdForm";
import FCAOnlineCurriculumApplication from "../form/FCAOnlineCurriculumApplication";
import CampusEnrollForm from "../form/campusEnrollReEnrollForm/CampusEnrollForm";
import EditStudentInformation from "../form/EditStudentInformation";
import EditStudentChurchInformationForm from "../form/EditStudentChurchInformationForm";

export default [
  {
    path: "welcome",
    element: <WelcomeLandingPage />,
  },
  {
    path: "profile",
    element: <FamilyProfile />,
  },
  {
    path: "viewChildren",
    element: <ViewChildren />,
  },
  {
    path: "childActivities/:childId",
    element: <ViewChildActivities />,
  },
  {
    path: "viewMilestones/:childId",
    element: <ViewMilestones />,
  },
  {
    path: "viewAttendance/:childId",
    element: <ViewAttendance />,
  },
  {
    path: "viewAuthorizedPickups",
    element: <ViewAuthorizedPickups />,
  },
  {
    path: "viewEmergencyContacts",
    element: <ViewEmergencyContacts />,
  },
  {
    path: "familyDocuments",
    element: <FamilyDocuments />,
  },
  {
    path: "childDocuments/:id",
    element: <ChildDocuments />,
  },
  {
    path: "childMessages/:id",
    element: <ChildMessages />,
  },
  {
    path: "formsLandingPage",
    element: <FormsLandingPage />,
  },
  {
    path: "newEnrollHomeEdForm",
    element: <NewEnrollHomeEdForm />,
  },
  {
    path: "FCAOnlineCurriculumApplication",
    element: <FCAOnlineCurriculumApplication />,
  },
  {
    path: "campusEnrollForm",
    element: <CampusEnrollForm />,
  },
  {
    path: "editStudentInformation/:id",
    element: <EditStudentInformation />,
  },
  {
    path: "editStudentChurchInformationForm/:id",
    element: <EditStudentChurchInformationForm />,
  },
];
