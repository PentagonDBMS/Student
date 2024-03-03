import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  Header,
  Segment,
  Message,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    college_name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false); // Define isChecked state
  const { register,authError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e, { name, value }) =>
    setFormData({ ...formData, [name]: value });

  const handleSubmit = async () => {
    setLoading(true);
    setError(""); // Reset error state
    if (!isChecked) formData.college_name = "IIT KGP";
    console.log(formData);
    if (
      await register(
        formData.name,
        formData.email,
        formData.password,
        !isChecked,
        formData.college_name
      )
    ) {
      navigate("/dashboard"); // Or wherever you'd like to redirect post-registration
    } else {
      setError("Registration failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Container>
      <Header as="h1" textAlign="center" style={{ margin: "20px 0" }}>
        Student Register
      </Header>
      <Segment loading={loading}>
        {authError && <Message error content={authError} />}
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Name"
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Form.Input
            label="Email"
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Form.Input
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Form.Checkbox
            toggle
            label="Visiting Student?"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)} // Toggle isChecked state on change

          />
          {/* {isChecked} */}
          {/* if ischecked then only ask college name, else college_name is "IIT KGP" */}
          {isChecked ? (
            <Form.Input
              label="College Name"
              type="text"
              name="college_name"
              placeholder="College Name"
              value={formData.college_name}
              onChange={handleChange}
              required
            />
          ) : (
            <Form.Input
              label="College Name"
              type="text"
              name="college_name"
              placeholder="College Name"
              value="IIT KGP"
              disabled
            />
          )}
          <Button type="submit" fluid primary>
            Register
          </Button>
        </Form>
      </Segment>
    </Container>
  );
};

export default Register;
