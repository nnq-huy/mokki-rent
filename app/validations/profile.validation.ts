import * as Yup from "yup";

export const profileSchema = Yup.object({
	name: Yup.string().uppercase().required("User name is required")
		.min(2, "Minimum 2 character required" )
		.max(30, "Username must not be longer than 30 characters."),
	email: Yup.string()
		.email("Email must be a valid email address.")
		.required("Email is required."),
	image: Yup.string().required('image url required')
});
