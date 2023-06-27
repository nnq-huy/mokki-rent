import * as Yup from "yup";

export const listingSchema = Yup.object({
	title: Yup.string().required("Title is required")
		.min(2, "Minimum 2 character required" )
		.max(50, "title must not be longer than 50 characters."),
	category: Yup.string()
		.required("Category is required."),
	locationValue: Yup.string().required('location required'),
  description: Yup.string().required('a description is required'),
  imageSrc: Yup.string().required('at least 1 image is required'),
  roomCount: Yup.number().required('room count is required'),
  guestCount: Yup.number().required('guest count is required'),
  bathroomCount: Yup.number().required('guest count is required'),
  hasSauna:Yup.boolean().required('need to specify sauna availability'),
  price: Yup.number().required('price is required'),
  status: Yup.string().required('need to specify mokki availability'),
  userId: Yup.string().required('userID'),
});
