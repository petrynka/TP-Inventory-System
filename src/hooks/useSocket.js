import { useEffect } from "react";
import socket from "../services/socketService";
import { useDispatch } from "react-redux";
import { setActiveSessions } from "../store/slices/appSlice";

const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    
    socket.on("activeSessions", (count) => {
      dispatch(setActiveSessions(count));
    });

    return () => {
      socket.off("activeSessions");
    };
  }, [dispatch]);
};

export default useSocket;