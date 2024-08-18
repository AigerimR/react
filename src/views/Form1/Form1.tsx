import React, { useState } from "react";
import { ValidationError } from "yup";
import { formSchema } from "../../validations/formValidation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearForm1Values, saveForm1Values } from "../../app/slices/form1Slice";

type ErrorsType = {
  name?: string;
  age?: string;
  email?: string;
  password1?: string;
  password2?: string;
  gender?: string;
  agreement?: string;
  file?: string;
};

const convertFile = (file: File | undefined): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          resolve("");
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    } else {
      resolve("");
    }
  });
};
const Form1: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passwordBarStyle, setPasswordBarStyle] = useState({
    width: "100%",
    backgroundColor: "transparent",
  });
  const [errors, setErrors] = useState<ErrorsType>({
    name: "",
    age: "",
    email: "",
    password1: "",
    password2: "",
    gender: "",
    agreement: "",
    file: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name: (e.currentTarget.elements.namedItem("name") as HTMLInputElement)
        .value,
      age: Number(
        (e.currentTarget.elements.namedItem("age") as HTMLInputElement).value,
      ),
      email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement)
        .value,
      password1: (
        e.currentTarget.elements.namedItem("password1") as HTMLInputElement
      ).value,
      password2: (
        e.currentTarget.elements.namedItem("password2") as HTMLInputElement
      ).value,
      gender: (e.currentTarget.elements.namedItem("gender") as HTMLInputElement)
        .value,
      agreement: (
        e.currentTarget.elements.namedItem("agreement") as HTMLInputElement
      ).checked
        ? "on"
        : "",
      file: (e.currentTarget.elements.namedItem("file") as HTMLInputElement)
        .files?.[0],
    };

    try {
      dispatch(clearForm1Values());
      await formSchema.validate(formData, { abortEarly: false });
      const errorsObject: ErrorsType = {};
      setErrors(errorsObject);
      const fileString = await convertFile(formData.file);
      const updatedFormData = { ...formData, file: fileString };

      dispatch(saveForm1Values(updatedFormData));
      navigate("/");
    } catch (err) {
      if (err instanceof ValidationError) {
        const errorsObject: ErrorsType = {};

        err.inner.forEach((error) => {
          errorsObject[error.path as keyof ErrorsType] = error.message;
        });

        setErrors(errorsObject);
      } else {
        console.error("Unexpected error", err);
      }
    }
  };

  const checkPasswordStrength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[@$!%*?&]/)) strength += 1;

    setPasswordBarStyle({
      width: `${(strength / 5) * 100}%`,
      backgroundColor: gerStrengthBarColor(strength),
    });
  };

  function gerStrengthBarColor(strength: number) {
    switch (strength) {
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "yellow";
      case 4:
        return "lightblue";
      case 5:
        return "green";
      default:
        return "transparent";
    }
  }

  return (
    <>
      <h1>Form 1</h1>
      <form action="#" method="get" onSubmit={(e) => handleSubmit(e)}>
        <div className="flexrow">
          <label htmlFor="name">Name*</label>
          <div className="flexcolumn">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              required
            />
            <p
              className={
                errors.name ? "error-message" : "error-message invisible"
              }
            >
              {errors.name}
            </p>
          </div>
        </div>

        <div className="flexrow">
          <label htmlFor="age">Age*</label>
          <div className="flexcolumn">
            <input
              type="text"
              name="age"
              id="age"
              placeholder="Enter Age"
              required
            />
            <p
              className={
                errors.age ? "error-message" : "error-message invisible"
              }
            >
              {errors.age}
            </p>
          </div>
        </div>

        <div className="flexrow">
          <label htmlFor="email">Enter Email*</label>
          <div className="flexcolumn">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              required
            />
            <p
              className={
                errors.email ? "error-message" : "error-message invisible"
              }
            >
              {errors.email}
            </p>
          </div>
        </div>

        <div className="flexrow">
          <label htmlFor="password1">Password*</label>
          <div className="flexcolumn">
            <input
              type="password"
              name="password1"
              id="password1"
              placeholder="Enter password"
              required
              onChange={checkPasswordStrength}
            />
            <div className="passwordStrengthBarWr">
              <div
                className="passwordStrengthBar"
                style={passwordBarStyle}
              ></div>
            </div>
            <p
              className={
                errors.password1 ? "error-message" : "error-message invisible"
              }
            >
              {errors.password1}
            </p>
          </div>
        </div>

        <div className="flexrow">
          <label htmlFor="password2">Confirm Password*</label>
          <div className="flexcolumn">
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Confirm password"
              required
            />
            <p
              className={
                errors.password2 ? "error-message" : "error-message invisible"
              }
            >
              {errors.password2}
            </p>
          </div>
        </div>

        <div className="flexrow flexcenter">
          <label htmlFor="gender">Gender*</label>
          <div className="flexrow flexcenter">
            <input type="radio" name="gender" value="male" id="male" />
            Male
          </div>
          <div className="flexrow flexcenter">
            <input type="radio" name="gender" value="female" id="female" />
            Female
          </div>
          <p
            className={
              errors.gender ? "error-message" : "error-message invisible"
            }
          >
            {errors.gender}
          </p>
        </div>

        <div className="flexrow flexcenter">
          <label htmlFor="agreement">
            accept Terms and Conditions agreement
          </label>
          <div className="flexrow flexcenter">
            <input type="checkbox" name="agreement" id="agreement" />
            Accepting
            <p
              className={
                errors.agreement ? "error-message" : "error-message invisible"
              }
            >
              {errors.agreement}
            </p>
          </div>
        </div>

        <div className="flexrow">
          <label htmlFor="file">Upload Picture*</label>
          <div className="flexcolumn">
            <input
              type="file"
              name="file"
              id="file"
              placeholder="Upload File"
              required
            />
            <p
              className={
                errors.file ? "error-message" : "error-message invisible"
              }
            >
              {errors.file}
            </p>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form1;
