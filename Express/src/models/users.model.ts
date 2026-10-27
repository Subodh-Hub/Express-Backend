import { db } from "../config/db";

export const getAllUsers = () => {
  return db.orm.public.User.all().then((users) =>
    users.map(({ password, ...user }) => user),
  );
};
