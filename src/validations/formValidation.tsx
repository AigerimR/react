import { object, string, number, ref, mixed } from "yup";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const formSchema = object({
  name: string()
    .required("name is required")
    .min(2, "must be at least 2 charachters long")
    .matches(/^[A-Z]/, "Name must start with uppercase"),
  age: number()
    .required("age is required")
    .max(100, "too old)")
    .typeError("must be a number")
    .positive()
    .integer(),

  email: string().required("email is required").email("invalid email"),
  password1: string()
    .required("password is required")
    .min(8, "password needs at least 8 charachters")
    .matches(/[0-9]/, "password must contain at least one number")
    .matches(/[a-z]/, "password must contain at least one lowersCase letter")
    .matches(/[A-Z]/, "password must contain at least one upperCase letter")
    .matches(
      /[@$!%*?&]/,
      "password must contain at least one upperCase letter",
    ),
  password2: string()
    .required("password is required")
    .oneOf([ref("password1")], "password is not matching"),
  gender: string().required("need to choose"),
  agreement: string().required("need to check"),
  file: mixed()
    .required("A file is required")
    .test("fileSize", "The file is too large", (value) => {
      return value && value instanceof File && value.size <= MAX_FILE_SIZE;
    })
    .test("fileFormat", "Unsupported file format", (value) => {
      return (
        value && value instanceof File && SUPPORTED_FORMATS.includes(value.type)
      );
    }),
});
