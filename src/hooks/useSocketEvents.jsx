import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

// const socketUrl = "https://dev3-api.zeitblast.com"; // Update with the correct server URL
const socketUrl = "https://dev2-api.zeitblast.com"; // Update with the correct server URL
// const socketUrl = "https://api.zeitblast.com"; // Update with the correct server URL
//const socketUrl = import.meta.env.VITE_APP_BACKEND_WS_URL;
const socketPath = "/app-socket";
// const socketUrl = "http://localhost:9004";
// const socketPath = "/socket.io";
export default function useSocketEvents(userId, events) {
  // Using useRef to persist the same socket instance across re-renders
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize socket only if it's not already initialized
    if (!socketRef.current) {
      socketRef.current = io(socketUrl, {
        path: socketPath,
        transports: ["websocket"],
      });

      console.log("userId is", socketRef);

      // Handle connection errors and disconnections
      socketRef.current.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message);
      });

      socketRef.current.on("connect_timeout", () => {
        console.error("Socket connection timeout");
      });

      socketRef.current.on("disconnect", (reason) => {
        console.warn("Socket disconnected:", reason);
      });

      if (userId) {
        socketRef.current.on("connect", () => {
          console.log(`Connected to ${socketUrl}`);
          socketRef.current.emit("register", userId); // Register the user ID upon connection
        });
      }

      socketRef.current.on("new-message", (data) => {
        console.log("holla newMessage Data is", data);
      });

      socketRef.current.on("batch-update", (data) => {
        console.log("this one newMessage Data is ====", data);
      });
      socketRef.current.on("new-notification-created", (data) => {
        // console.log("new-notification-created ====", data);
      });

      socketRef.current.on("stripe-callback", (data) => {
        console.log("this one newMessage Data is ====", data);
      });

      // Set up event listeners
      events.forEach((event) => {
        socketRef.current.on(event.name, event.handler);
      });
    }

    return () => {
      // Clean up event listeners and disconnect socket
      events.forEach((event) => {
        if (socketRef.current) {
          socketRef.current.off(event.name);
        }
      });

      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [userId, events]); // Dependencies updated to userId and events

  // Return the socket if you need to use it outside
  return socketRef.current;
}
