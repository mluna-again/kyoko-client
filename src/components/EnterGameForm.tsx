import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./EnterGameForm.module.css";
import Teams from "./Teams";

type Inputs = {
  username: string;
};

const schema = yup
  .object({
    username: yup
      .string()
      .required("Required")
      .max(30, "Should be at most 30 characters long"),
  })
  .required();

type Props = {
  onSave: (username: string, team?: string) => void;
  teams?: boolean;
};
const EnterGameForm = ({ onSave, teams }: Props) => {
  const [team, setTeam] = useState(teams ? "black" : undefined);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const enterGame: SubmitHandler<Inputs> = (data) => {
    const username = data.username;
    onSave(username, team);

    localStorage.setItem(
      "user",
      JSON.stringify({ username, forUrl: window.location.href })
    );
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(enterGame)}>
      <h1>Select a username</h1>

      <div className={styles.input}>
        <input
          id="username"
          type="text"
          {...register("username")}
          placeholder="Username"
        />
        {errors.username && <p>{errors.username?.message}</p>}
      </div>

      {teams && <Teams setTeam={setTeam} team={team} />}

      <button disabled={isSubmitting} className={styles.go}>
        Go
      </button>
    </form>
  );
};

export default EnterGameForm;
