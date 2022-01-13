import { useState, useEffect, useMemo } from "react";
import { UserRespository, User } from "../../respository/UserRespository";

function AppViewModel() {
  const [state, setState] = useState(0);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>(null);
  const [info, setInfo] = useState<{ name: string; age: number }>();

  const userRepository = useMemo(() => new UserRespository(), []);

  useEffect(() => {
    console.log("effect");
    return () => {
      console.log("clean");
    };
  }, []);

  const increment = () => {
    setState(state + 1);
  };

  const decrement = () => {
    setState(state - 1);
  };

  const getUsers = async () => {
    const result = await userRepository.getAll();
    if (result.error) {
      setError(result.error);
      return;
    }
    setUsers(result.value);
  };

  const onChangeHandler = e => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "age") {
      value = Number.parseInt(value);
    }
    let newInfo = {
      ...info,
      [name]: value,
    };

    setInfo(newInfo);
  };

  const addUser = async () => {
    const result = await userRepository.add(info);
    if (result.error) {
      setError(result.error);
      return;
    }
    setError("");
    getUsers();
  };

  const deleteUserById = async (id: string) => {
    const result = await userRepository.deleteById(id);
    if (result.error) {
      setError(result.error);
      return;
    }
    getUsers();
  };

  const updateUserById = async (id: string) => {
    console.log(id);
    const user = { ...info };
    console.log(user);
    const result = await userRepository.updateById(id, user);
    if (result.error) {
      setError(result.error);
      return;
    }
    getUsers();
  };

  return {
    state,
    increment,
    decrement,
    error,
    users,
    getUsers,
    onChangeHandler,
    addUser,
    deleteUserById,
    updateUserById,
  };
}

export default AppViewModel;
