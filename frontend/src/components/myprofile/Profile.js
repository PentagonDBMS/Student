import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import studentImage from "../../images/student.png";
import externlImage from "../../images/formalman.png";
import {
  Container,
  Header,
  Segment,
  Icon,
  Divider,
  Form,
  Button,
  Message,
  Card,
  Image,
  Grid,
  Label,
  CardContent,
  CardHeader,
  CardDescription,
  Modal,
  Loader,
  Dimmer,
} from "semantic-ui-react";

const Profile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [passwordChangeData, setPasswordChangeData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordChangeError, setPasswordChangeError] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState("");
  // const [showPasswordForm, setShowPasswordForm] = useState(false); // State to control the visibility of the form
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser]);

  const handlePasswordChange = async () => {
    setLoading(true);
    setPasswordChangeSuccess("");
    setPasswordChangeError("");
    const { oldPassword, newPassword, confirmNewPassword } = passwordChangeData;
    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError("New passwords do not match.");
      setLoading(false);
      return;
    }

    if (newPassword.length < 2) {
      setPasswordChangeError(
        "New password must be at least 2 characters long."
      );
      setLoading(false);
      return;
    }

    console.log("idh ");
    console.log(currentUser.students_or_externals_id);
    // console.log(userData.studentid);
    console.log(currentUser.email);

    try {
      //send just 1 post request to /updatepassword endpoint with studentid, oldpassword, newpassword
      setPasswordChangeError("");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/student/auth/updatepassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            studentid: currentUser.students_or_externals_id,
            oldPassword,
            newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setPasswordChangeError(errorData.msg || "Password change failed");
        console.log("errorData", errorData);
        throw new Error(errorData.msg || "Password change failed");
        // display error message on the form
      }
      setPasswordChangeSuccess("Password changed successfully");
      setPasswordChangeData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      console.log("Password changed successfully");

      // setShowPasswordForm(false);
    } catch (error) {
      console.error("Password change failed:", error);
      console.log(error.toString());
      setPasswordChangeError(error.toString());
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordChangeData({ ...passwordChangeData, [name]: value });
  };

  const handleShowPasswordForm = () => {
    // setShowPasswordForm(true);
    setPasswordChangeSuccess("");
    setPasswordChangeError("");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // setShowPasswordForm(false);
  };

  return (
    <Container>
      <Header as="h1" textAlign="center" style={{ margin: "20px 0" }}>
        My Profile
      </Header>
      <Divider />
      <Card centered>
        {/* <Image src={studentImage} wrapped ui={false} /> */}
        {currentUser.isstudent ? (
          <Image src={studentImage} wrapped ui={false} />
        ) : (
          <Image src={externlImage} wrapped ui={false} />
        )}
        <CardContent>
          <CardHeader>{userData ? userData.name : "Student Name"}</CardHeader>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <CardDescription>
                  {userData ? userData.email : "Student Email"}
                </CardDescription>
                <CardDescription>
                  {userData ? userData.college_name : "College Name"}
                </CardDescription>
              </Grid.Column>
              <Grid.Column>
                <Label as="a" color="blue" ribbon="right">
                  {userData && userData.college_name === "IIT KGP"
                    ? "Student"
                    : "Visitor"}
                </Label>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </CardContent>
        <CardContent extra>
          <Icon name="time" />
          {userData &&
            `Joined in ${new Date(
              new Date(userData.created_at).getTime() +
                (5 * 60 + 30) * 60 * 1000
            ).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}`}
        </CardContent>
        <CardContent extra>
          <Button
            icon
            fluid
            labelPosition="left"
            onClick={handleShowPasswordForm}
            // disabled={showPasswordForm}
          >
            <Icon name="lock" />
            Change Password
          </Button>
        </CardContent>
      </Card>
      <Divider />
      {/* Modal for password change */}
      <Modal
        onClose={handleCloseModal}
        onOpen={handleShowPasswordForm}
        open={openModal}
        size="tiny"
      >
        <Dimmer active={loading}>
          <Loader>Loading</Loader>
        </Dimmer>
        <Modal.Header>Change Password</Modal.Header>
        <Modal.Content>
          {passwordChangeError && (
            <Message
              negative
              header="Password Change Failed"
              content={passwordChangeError}
            />
          )}

          {passwordChangeSuccess && (
            <Message
              success
              header="Password Changed Successfully"
              content={passwordChangeSuccess}
            />
          )}

          <Form>
            <Form.Field>
              <label>Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={passwordChangeData.oldPassword}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordChangeData.newPassword}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={passwordChangeData.confirmNewPassword}
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Change Password"
            onClick={handlePasswordChange}
          />
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default Profile;
