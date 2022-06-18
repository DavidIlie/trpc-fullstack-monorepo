import * as yup from "yup";

export const helloSchema = yup.object({
   name: yup.string().required(),
});
