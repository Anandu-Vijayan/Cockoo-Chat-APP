import { Link as RouterLink } from "react-router-dom";
import Auth from "./Auth";
import { Link as MuiLink } from "@mui/material";
import { useCreateUser } from "../../hooks/useCreateUser";

const SignUp = () => {
  const [createUser] = useCreateUser();
  return (
    <Auth
      submitButtonLabel="Sign Up"
      onSubmit={async ({ email, password }) => {
        await createUser({
          variables: {
            createUserInput: {
              email,
              password,
            },
          },
        });
      }}
    >
      <MuiLink
        component={RouterLink}
        to="/sign-in"
        style={{ alignSelf: "center" }}
      >
        Already have an account? Sign in
      </MuiLink>
    </Auth>
  );
};

export default SignUp;
