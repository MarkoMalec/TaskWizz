import { toast } from "react-hot-toast";

interface Error {
  meta: { target: string };
}

const handleServerError = (error: Error) => {
  if (error) {
    console.log(error);
    if (error.meta.target === "User_email_key") {
      toast.error(
        "There is already the user with same email address. Please use another.",
      );
    }
  }
};

export default handleServerError;
