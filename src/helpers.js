import dayjs from "dayjs";

export const getISONow = () => new Date(Date.now()).toISOString();

export const getUserId = (user) => {
  try {
    return JSON.parse(user).id;
  } catch {
    return user.id;
  }
};

export const formatDateTime = (time) => {
  return dayjs(time).format("dddd, MMMM D h:mm A");
};

export const callMutation = ({ mutation, input }) =>
  mutation({
    variables: {
      input,
    },
  });

export default null;
