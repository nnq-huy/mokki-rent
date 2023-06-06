import * as Yup from "yup";

export const messageSchema = Yup.object({
	message: Yup.string().min(2,"Message is too short.").max(500,"Maximun characters is 500")
	
});
