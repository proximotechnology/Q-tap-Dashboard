// import React, { useEffect, useState, useRef } from "react";
// import {
//   Grid,
//   Box,
//   List,
//   ListItem,
//   ListItemAvatar,
//   Avatar,
//   ListItemText,
//   Paper,
//   TextField,
//   IconButton,
//   Typography,
//   Divider,
//   CircularProgress,
// } from "@mui/material";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import { Menu, MenuItem } from "@mui/material";
// import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
// import "./chat.css";

// const ChatApp = () => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messageInput, setMessageInput] = useState("");
//   const [users, setUsers] = useState([]);
//   const [lastMessages, setLastMessages] = useState({}); // Store last message for each user
//   const [isLoading, setIsLoading] = useState(false);
//   const [unreadMessages, setUnreadMessages] = useState({}); // Store unread status for each user

//   // Add a ref to store the last known message timestamps
//   const lastKnownMessages = useRef({});

//   // Add request queue management
//   const requestQueue = useRef([]);
//   const isProcessingQueue = useRef(false);
//   const isRequestPending = useRef(false);

//   // Add cache for messages
//   const messageCache = useRef({});

//   // Process queue function
//   const processQueue = async () => {
//     if (isProcessingQueue.current || requestQueue.current.length === 0) return;

//     isProcessingQueue.current = true;

//     while (requestQueue.current.length > 0) {
//       const { url, options, resolve, reject } = requestQueue.current[0];

//       try {
//         // Wait before making the next request
//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         const response = await fetch(url, options);
//         if (!response.ok) {
//           if (response.status === 429) {
//             // If rate limited, wait and try again
//             await new Promise((resolve) => setTimeout(resolve, 2000));
//             continue;
//           }
//           throw new Error(`Network error: ${response.status}`);
//         }

//         const data = await response.json();
//         resolve(data);
//         requestQueue.current.shift();
//       } catch (error) {
//         reject(error);
//         requestQueue.current.shift();
//       }
//     }

//     isProcessingQueue.current = false;
//   };

//   // Wrapper for making API requests
//   const makeRequest = async (url, options) => {
//     return new Promise((resolve, reject) => {
//       requestQueue.current.push({ url, options, resolve, reject });
//       processQueue();
//     });
//   };

//   // Optimized initial data fetch
//   const getInitialData = async () => {
//     setIsLoading(true);
//     try {
//       // Fetch users and their last messages in parallel
//       const [usersResponse, lastMessagesResponse] = await Promise.all([
//         fetch("https://highleveltecknology.com/Qtap/api/customer_info", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//         }),
//         fetch("https://highleveltecknology.com/Qtap/api/last_messages", {
//           // Assuming this endpoint exists
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//         }),
//       ]);

//       const usersData = await usersResponse.json();
//       const lastMessagesData = await lastMessagesResponse.json();

//       // Update states
//       setUsers(usersData.customer_info);
//       setLastMessages(lastMessagesData);
//     } catch (error) {
//       console.error("Error fetching initial data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Optimized chat selection
//   const handleSelectChat = async (chat) => {
//     setSelectedChat({ ...chat, messages: messageCache.current[chat.id] || [] });
//     setIsLoading(true);

//     try {
//       const response = await fetch(
//         `https://highleveltecknology.com/Qtap/api/chat?customer_id=${chat.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//         }
//       );
//       const data = await response.json();

//       if (data.success) {
//         const messages = [
//           ...data.customer.map((msg) => ({
//             text: msg.message,
//             sender: "user",
//             time: new Date(msg.created_at).toLocaleTimeString(),
//             created_at: msg.created_at,
//           })),
//           ...data.support.map((msg) => ({
//             text: msg.message,
//             sender: "me",
//             time: new Date(msg.created_at).toLocaleTimeString(),
//             created_at: msg.created_at,
//           })),
//         ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

//         // Update cache
//         messageCache.current[chat.id] = messages;
//         setSelectedChat({ ...chat, messages });
//       }
//     } catch (error) {
//       console.error("Error fetching chat history:", error);
//     } finally {
//       setIsLoading(false);
//     }

//     // Clear unread status
//     setUnreadMessages((prev) => ({
//       ...prev,
//       [chat.id]: false,
//     }));
//   };

//   // Handle new messages more efficiently
//   const handleNewMessage = (message) => {
//     const newMessage = {
//       text: message.message,
//       sender: message.sender_type === "support" ? "me" : "user",
//       time: new Date(message.created_at).toLocaleTimeString(),
//       created_at: message.created_at,
//     };

//     // Update cache
//     if (messageCache.current[message.sender_id]) {
//       messageCache.current[message.sender_id] = [
//         ...messageCache.current[message.sender_id],
//         newMessage,
//       ];
//     }

//     // Update last messages
//     setLastMessages((prev) => ({
//       ...prev,
//       [message.sender_id]: message,
//     }));

//     // Update unread status
//     if (
//       selectedChat?.id !== message.sender_id &&
//       message.sender_type === "user"
//     ) {
//       setUnreadMessages((prev) => ({
//         ...prev,
//         [message.sender_id]: true,
//       }));
//     }

//     // Update current chat if selected
//     if (selectedChat?.id === message.sender_id) {
//       setSelectedChat((prev) => ({
//         ...prev,
//         messages: [...(prev.messages || []), newMessage],
//       }));
//     }
//   };

//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleOpenMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   // Modified fetchLastMessage function
//   const fetchLastMessage = async (userId) => {
//     try {
//       const url = `https://highleveltecknology.com/Qtap/api/chat?customer_id=${userId}`;
//       const options = {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//         },
//       };

//       const data = await makeRequest(url, options);
//       if (data.success) {
//         const allMessages = [
//           ...data.customer.map((msg) => ({
//             ...msg,
//             sender: "user",
//           })),
//           ...data.support.map((msg) => ({
//             ...msg,
//             sender: "me",
//           })),
//         ];

//         if (allMessages.length > 0) {
//           allMessages.sort(
//             (a, b) => new Date(b.created_at) - new Date(a.created_at)
//           );
//           return allMessages[0];
//         }
//       }
//       return null;
//     } catch (error) {
//       console.error("Error fetching last message:", error);
//       return null;
//     }
//   };

//   // Modify the polling interval and add debouncing
//   useEffect(() => {
//     getUsers();

//     const pollInterval = setInterval(() => {
//       getUsers();
//     }, 10000); // Increased to 10 seconds for better performance

//     return () => clearInterval(pollInterval);
//   }, []);

//   // Optimize getUsers function with debouncing and caching
//   const getUsers = async () => {
//     if (isRequestPending.current) return;

//     isRequestPending.current = true;
//     try {
//       const url = `https://highleveltecknology.com/Qtap/api/customer_info`;
//       const options = {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//         },
//       };

//       const data = await makeRequest(url, options);
//       const dataUsers = data?.customer_info;

//       // Batch fetch last messages in chunks
//       const BATCH_SIZE = 5;
//       const newLastMessages = {};
//       let hasNewMessages = false;

//       for (let i = 0; i < dataUsers.length; i += BATCH_SIZE) {
//         const batch = dataUsers.slice(i, i + BATCH_SIZE);
//         const promises = batch.map((user) => fetchLastMessage(user.id));
//         const messages = await Promise.all(promises);

//         messages.forEach((msg, index) => {
//           if (msg) {
//             const userId = batch[index].id;
//             newLastMessages[userId] = msg;
//             const lastKnownMsg = lastKnownMessages.current[userId];

//             if (
//               !lastKnownMsg ||
//               new Date(msg.created_at) > new Date(lastKnownMsg.created_at)
//             ) {
//               hasNewMessages = true;
//               if (selectedChat?.id !== userId && msg.sender === "user") {
//                 setUnreadMessages((prev) => ({
//                   ...prev,
//                   [userId]: true,
//                 }));
//               }
//             }
//           }
//         });
//       }

//       if (hasNewMessages) {
//         setLastMessages(newLastMessages);
//         lastKnownMessages.current = newLastMessages;

//         setUsers((prevUsers) => {
//           const sortedUsers = [...dataUsers].sort((a, b) => {
//             const msgA = newLastMessages[a.id];
//             const msgB = newLastMessages[b.id];
//             if (!msgA && !msgB) return 0;
//             if (!msgA) return 1;
//             if (!msgB) return -1;
//             return new Date(msgB.created_at) - new Date(msgA.created_at);
//           });

//           // Only update if there are actual changes
//           if (JSON.stringify(prevUsers) !== JSON.stringify(sortedUsers)) {
//             return sortedUsers;
//           }
//           return prevUsers;
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setTimeout(() => {
//         isRequestPending.current = false;
//       }, 1000); // Reduced cooldown time
//     }
//   };

//   // Optimize message sending
//   const handleSendMessage = async () => {
//     if (messageInput.trim() === "" || !selectedChat) return;

//     const messageData = {
//       sender_id: "1",
//       receiver_id: selectedChat.id,
//       sender_type: "support",
//       message: messageInput,
//     };

//     // Optimistic update
//     const newMessage = {
//       text: messageInput,
//       sender: "me",
//       time: new Date().toLocaleTimeString(),
//       created_at: new Date().toISOString(),
//     };

//     setSelectedChat((prev) => ({
//       ...prev,
//       messages: [...(prev.messages || []), newMessage],
//     }));
//     setMessageInput("");

//     try {
//       const response = await fetch(
//         "https://highleveltecknology.com/Qtap/api/chat",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//           body: JSON.stringify(messageData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to send message");
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       // Rollback optimistic update if needed
//     }
//   };

//   // Optimize message list rendering with virtualization
//   const MessageList = React.memo(({ messages }) => {
//     const listRef = useRef(null);

//     useEffect(() => {
//       if (listRef.current) {
//         listRef.current.scrollTop = listRef.current.scrollHeight;
//       }
//     }, [messages]);

//     return (
//       <Box
//         ref={listRef}
//         sx={{ overflowY: "auto", flexGrow: 1, padding: "0px 20px" }}
//       >
//         {messages.map((msg, index) => (
//           <Box
//             key={`${msg.created_at}-${index}`}
//             sx={{
//               display: "flex",
//               justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",
//               marginBottom: 1,
//             }}
//           >
//             <Box
//               sx={{
//                 bgcolor: msg.sender === "me" ? "#E57C00" : "#F1F1F1",
//                 color: msg.sender === "me" ? "white" : "black",
//                 padding: "6px 20px",
//                 width: "50%",
//                 maxWidth: "70%",
//                 fontSize: "12px",
//                 borderRadius:
//                   msg.sender === "me"
//                     ? "30px 30px 0px 30px"
//                     : "30px 30px 30px 0px",
//               }}
//             >
//               {msg.text}
//             </Box>
//           </Box>
//         ))}
//       </Box>
//     );
//   });

//   return (
//     <Paper sx={{ height: "70vh", borderRadius: "20px" }}>
//       <Typography
//         variant="body2"
//         sx={{ fontSize: "12px", padding: "20px", color: "#363535fa" }}
//       >
//         Live Chat
//       </Typography>

//       <Grid container>
//         <Grid item width="30%">
//           {(isLoading ||users) ? (
//             <Box
//               sx={{
//                 height: "60vh",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: 2,
//               }}
//             >
//               <CircularProgress
//                 size={40}
//                 thickness={4}
//                 sx={{
//                   color: "#E57C00",
//                   "& .MuiCircularProgress-circle": {
//                     strokeLinecap: "round",
//                   },
//                 }}
//               />
//               <Typography
//                 sx={{
//                   fontSize: "14px",
//                   color: "#666",
//                   fontWeight: 500,
//                   animation: "pulse 1.5s infinite",
//                   "@keyframes pulse": {
//                     "0%": { opacity: 0.6 },
//                     "50%": { opacity: 1 },
//                     "100%": { opacity: 0.6 },
//                   },
//                 }}
//               >
//                 Loading chats...
//               </Typography>
//             </Box>
//           ) : (
//             <List
//               sx={{
//                 height: "60vh",
//                 overflowY: "scroll",
//                 "&::-webkit-scrollbar": {
//                   width: "8px",
//                   height: "8px",
//                 },
//                 "&::-webkit-scrollbar-track": {
//                   background: "#f1f1f1",
//                   borderRadius: "4px",
//                 },
//                 "&::-webkit-scrollbar-thumb": {
//                   background: "#E57C00",
//                   borderRadius: "4px",
//                   width: "2px",
//                   "&:hover": {
//                     background: "#ef7d00",
//                   },
//                 },
//               }}
//             >
//               {users.map((user) => (
//                 <ListItem
//                   button
//                   key={user.id}
//                   onClick={() => handleSelectChat(user)}
//                   sx={{
//                     fontSize: "12px",
//                     padding: "3px 20px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     position: "relative",
//                     "&:hover": {
//                       backgroundColor: "#f7f7f7fa",
//                     },
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <ListItemAvatar>
//                       <Avatar
//                         sx={{
//                           backgroundColor:
//                             selectedChat?.id === user.id
//                               ? "#ef7d00"
//                               : "#AAAAAA",
//                           width: 35,
//                           height: 35,
//                         }}
//                       >
//                         <PersonOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
//                       </Avatar>
//                     </ListItemAvatar>
//                     <ListItemText
//                       primary={
//                         <Box sx={{ display: "flex", alignItems: "center" }}>
//                           <Typography
//                             sx={{ fontSize: "11px", color: "#575756" }}
//                           >
//                             {user.name}
//                           </Typography>
//                           {unreadMessages[user.id] && (
//                             <Box
//                               sx={{
//                                 width: 8,
//                                 height: 8,
//                                 borderRadius: "50%",
//                                 backgroundColor: "red",
//                                 marginLeft: 1,
//                               }}
//                             />
//                           )}
//                         </Box>
//                       }
//                       secondary={
//                         <Typography
//                           sx={{
//                             fontSize: "8px",
//                             color: "gray",
//                             marginLeft: "10px",
//                           }}
//                         >
//                           {lastMessages[user.id]?.message || ""}
//                         </Typography>
//                       }
//                     />
//                   </Box>
//                   <Typography
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       fontSize: "8px",
//                       textAlign: "right",
//                     }}
//                   >
//                     {lastMessages[user.id] && (
//                       <>
//                         <span style={{ color: "#AAAAAA" }}>
//                           {new Date(
//                             lastMessages[user.id].created_at
//                           ).toLocaleDateString()}
//                         </span>
//                         <span style={{ color: "#AAAAAA" }}>
//                           {new Date(
//                             lastMessages[user.id].created_at
//                           ).toLocaleTimeString()}
//                         </span>
//                       </>
//                     )}
//                   </Typography>
//                 </ListItem>
//               ))}
//             </List>
//           )}
//         </Grid>

//         <Divider
//           orientation="vertical"
//           flexItem
//           sx={{
//             borderRightWidth: 1,
//             borderColor: "#d3d3d3",
//             height: "55vh ",
//           }}
//         />

//         <Grid item width="65%">
//           {selectedChat ? (
//             <Box
//               sx={{
//                 height: "calc(70vh - 70px)",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Box sx={{ padding: "0px 20px", flexGrow: 1, overflowY: "auto" }}>
//                 <Box display={"flex"} justifyContent={"space-between"}>
//                   <Typography sx={{ color: "#3c3d3d", fontSize: "12px" }}>
//                     {selectedChat ? selectedChat.name : "Name"}
//                   </Typography>

//                   <Box>
//                     <span
//                       class="icon-magnifier"
//                       sx={{
//                         fontSize: "20px",
//                         color: "#3c3d3d",
//                         cursor: "pointer",
//                       }}
//                     ></span>
//                     <LocalPhoneIcon
//                       sx={{
//                         fontSize: "20px",
//                         color: "#3c3d3d",
//                         margin: "0px 13px",
//                         cursor: "pointer",
//                       }}
//                     />
//                     <PersonOutlineOutlinedIcon
//                       sx={{
//                         fontSize: "20px",
//                         color: "#3c3d3d",
//                         cursor: "pointer",
//                       }}
//                       onClick={handleOpenMenu}
//                     />
//                   </Box>
//                 </Box>
//                 <Divider />

//                 {isLoading ? (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       height: "100%",
//                     }}
//                   >
//                     <CircularProgress sx={{ color: "#E57C00" }} />
//                   </Box>
//                 ) : (
//                   <MessageList messages={selectedChat.messages} />
//                 )}
//               </Box>

//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   textAlign: "center",
//                   padding: "20px 40px",
//                   width: "100%",
//                   gap: 1,
//                   margin: "0 auto",
//                 }}
//               >
//                 <IconButton edge="start" sx={{ color: "#ef7d00" }}>
//                   <span
//                     class="icon-plus"
//                     style={{ fontSize: "22px", WebkitTextFillColor: "#ef7d00" }}
//                   >
//                     <span class="path1"></span>
//                     <span
//                       style={{ WebkitTextFillColor: "white" }}
//                       class="path2"
//                     ></span>
//                   </span>
//                 </IconButton>

//                 <IconButton edge="start" sx={{ color: "#ef7d00" }}>
//                   <span class="icon-image" style={{ fontSize: "22px" }}></span>
//                 </IconButton>

//                 <TextField
//                   fullWidth
//                   value={messageInput}
//                   onChange={(e) => setMessageInput(e.target.value)}
//                   placeholder="Type your message"
//                   InputProps={{
//                     sx: {
//                       height: "30px",
//                       borderRadius: "20px",
//                       backgroundColor: "#EBEDF3",
//                       fontSize: "12px",
//                       "& .MuiOutlinedInput-notchedOutline": {
//                         border: "none",
//                       },
//                       display: "flex",
//                       alignItems: "center",
//                     },
//                   }}
//                 />

//                 <IconButton
//                   onClick={handleSendMessage}
//                   sx={{ color: "#ef7d00" }}
//                 >
//                   <span
//                     class="icon-send-message"
//                     style={{ fontSize: "18px", WebkitTextFillColor: "#ef7d00" }}
//                   ></span>
//                 </IconButton>
//               </Box>
//             </Box>
//           ) : (
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: "100%",
//               }}
//             >
//               <IconButton>
//                 <WhatsAppIcon sx={{ color: "gray", fontSize: "55px" }} />{" "}
//               </IconButton>
//               <Typography
//                 variant="body1"
//                 sx={{ fontSize: "16px", color: "gray" }}
//               >
//                 Select a chat to start messaging.
//               </Typography>
//             </Box>
//           )}
//         </Grid>

//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleCloseMenu}
//           PaperProps={{
//             sx: {
//               minWidth: "100px",
//             },
//           }}
//         >
//           <MenuItem>
//             <PersonOutlineOutlinedIcon
//               sx={{ fontSize: 16, color: "#575756", marginRight: "10px" }}
//             />
//             <Box>
//               <Typography sx={{ fontSize: "10px", color: "#575756" }}>
//                 Name:
//               </Typography>
//               <Typography sx={{ fontSize: "10px", color: "gray" }}>
//                 {selectedChat ? selectedChat.name : "Name"}
//               </Typography>
//             </Box>
//           </MenuItem>
//           <MenuItem>
//             <LocalPhoneOutlinedIcon
//               sx={{ fontSize: 15, marginRight: "10px" }}
//             />
//             <Box>
//               <Typography sx={{ fontSize: "10px", color: "#575756" }}>
//                 Mobile:
//               </Typography>
//               <Typography sx={{ fontSize: "10px", color: "gray" }}>
//                 {selectedChat ? selectedChat.phone : "Mobile"}
//               </Typography>
//             </Box>
//           </MenuItem>
//           <MenuItem>
//             <MailOutlineIcon sx={{ fontSize: 15, marginRight: "10px" }} />
//             <Box>
//               <Typography sx={{ fontSize: "10px", color: "#575756" }}>
//                 Email:
//               </Typography>
//               <Typography sx={{ fontSize: "10px", color: "gray" }}>
//                 {selectedChat ? selectedChat.email : "Email"}
//               </Typography>
//             </Box>
//           </MenuItem>
//           <MenuItem>
//             <AddLocationAltOutlinedIcon
//               sx={{ fontSize: 15, marginRight: "10px" }}
//             />
//             <Box>
//               <Typography sx={{ fontSize: "10px", color: "#575756" }}>
//                 Address:
//               </Typography>
//               <Typography sx={{ fontSize: "10px", color: "gray" }}>
//                 {selectedChat ? selectedChat.address : "Address"}
//               </Typography>
//             </Box>
//           </MenuItem>
//         </Menu>
//       </Grid>
//     </Paper>
//   );
// };

// export default ChatApp;



// import React, { useEffect, useState, useRef } from "react";
// import {
//   Grid,
//   Box,
//   List,
//   ListItem,
//   ListItemAvatar,
//   Avatar,
//   ListItemText,
//   Paper,
//   TextField,
//   IconButton,
//   Typography,
//   Divider,
//   CircularProgress,
// } from "@mui/material";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import { Menu, MenuItem } from "@mui/material";
// import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
// import "./chat.css";

// const ChatApp = () => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messageInput, setMessageInput] = useState("");
//   const [users, setUsers] = useState([]);
//   const [lastMessages, setLastMessages] = useState({}); // Store last message for each user
//   const [isLoading, setIsLoading] = useState(false);
//   const [loading ,setLoading] = useState(false)
//   const [unreadMessages, setUnreadMessages] = useState({}); // Store unread status for each user

//   // Add a ref to store the last known message timestamps
//   const lastKnownMessages = useRef({});

//   // Add request queue management
//   const requestQueue = useRef([]);
//   const isProcessingQueue = useRef(false);
//   const isRequestPending = useRef(false);

//   // Add cache for messages
//   const messageCache = useRef({});

//   // Process queue function
//   const processQueue = async () => {
//     if (isProcessingQueue.current || requestQueue.current.length === 0) return;

//     isProcessingQueue.current = true;

//     while (requestQueue.current.length > 0) {
//       const { url, options, resolve, reject } = requestQueue.current[0];

//       try {
//         // Wait before making the next request
//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         const response = await fetch(url, options);
//         if (!response.ok) {
//           if (response.status === 429) {
//             // If rate limited, wait and try again
//             await new Promise((resolve) => setTimeout(resolve, 2000));
//             continue;
//           }
//           throw new Error(`Network error: ${response.status}`);
//         }

//         const data = await response.json();
//         resolve(data);
//         requestQueue.current.shift();
//       } catch (error) {
//         reject(error);
//         requestQueue.current.shift();
//       }
//     }

//     isProcessingQueue.current = false;
//   };

//   // Wrapper for making API requests
//   const makeRequest = async (url, options) => {
//     return new Promise((resolve, reject) => {
//       requestQueue.current.push({ url, options, resolve, reject });
//       processQueue();
//     });
//   };

//   // Optimized initial data fetch
//   const getInitialData = async () => {
//     setIsLoading(true);
//     try {
//       // Fetch users and their last messages in parallel
//       const [usersResponse, lastMessagesResponse] = await Promise.all([
//         fetch("https://highleveltecknology.com/Qtap/api/customer_info", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//         }),
//         fetch("https://highleveltecknology.com/Qtap/api/last_messages", {
//           // Assuming this endpoint exists
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//         }),
//       ]);

//       const usersData = await usersResponse.json();
//       const lastMessagesData = await lastMessagesResponse.json();

//       // Update states
//       setUsers(usersData.customer_info);
//       setLastMessages(lastMessagesData);
//     } catch (error) {
//       console.error("Error fetching initial data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Optimized chat selection
//   const handleSelectChat = async (chat) => {
//     setSelectedChat({ ...chat, messages: messageCache.current[chat.id] || [] });
//     setIsLoading(true);

//     try {
//       const response = await fetch(
//         `https://highleveltecknology.com/Qtap/api/chat?customer_id=${chat.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//         }
//       );
//       const data = await response.json();

//       if (data.success) {
//         const messages = [
//           ...data.customer.map((msg) => ({
//             text: msg.message,
//             sender: "user",
//             time: new Date(msg.created_at).toLocaleTimeString(),
//             created_at: msg.created_at,
//           })),
//           ...data.support.map((msg) => ({
//             text: msg.message,
//             sender: "me",
//             time: new Date(msg.created_at).toLocaleTimeString(),
//             created_at: msg.created_at,
//           })),
//         ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

//         // Update cache
//         messageCache.current[chat.id] = messages;
//         setSelectedChat({ ...chat, messages });
//       }
//     } catch (error) {
//       console.error("Error fetching chat history:", error);
//     } finally {
//       setIsLoading(false);
//     }

//     // Clear unread status
//     setUnreadMessages((prev) => ({
//       ...prev,
//       [chat.id]: false,
//     }));
//   };

//   // Handle new messages more efficiently
//   const handleNewMessage = (message) => {
//     const newMessage = {
//       text: message.message,
//       sender: message.sender_type === "support" ? "me" : "user",
//       time: new Date(message.created_at).toLocaleTimeString(),
//       created_at: message.created_at,
//     };

//     // Update cache
//     if (messageCache.current[message.sender_id]) {
//       messageCache.current[message.sender_id] = [
//         ...messageCache.current[message.sender_id],
//         newMessage,
//       ];
//     }

//     // Update last messages
//     setLastMessages((prev) => ({
//       ...prev,
//       [message.sender_id]: message,
//     }));

//     // Update unread status
//     if (
//       selectedChat?.id !== message.sender_id &&
//       message.sender_type === "user"
//     ) {
//       setUnreadMessages((prev) => ({
//         ...prev,
//         [message.sender_id]: true,
//       }));
//     }

//     // Update current chat if selected
//     if (selectedChat?.id === message.sender_id) {
//       setSelectedChat((prev) => ({
//         ...prev,
//         messages: [...(prev.messages || []), newMessage],
//       }));
//     }
//   };

//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleOpenMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   // Modified fetchLastMessage function
//   const fetchLastMessage = async (userId) => {
//     try {
//       const url = `https://highleveltecknology.com/Qtap/api/chat?customer_id=${userId}`;
//       const options = {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//         },
//       };

//       const data = await makeRequest(url, options);
//       if (data.success) {
//         const allMessages = [
//           ...data.customer.map((msg) => ({
//             ...msg,
//             sender: "user",
//           })),
//           ...data.support.map((msg) => ({
//             ...msg,
//             sender: "me",
//           })),
//         ];

//         if (allMessages.length > 0) {
//           allMessages.sort(
//             (a, b) => new Date(b.created_at) - new Date(a.created_at)
//           );
//           return allMessages[0];
//         }
//       }
//       return null;
//     } catch (error) {
//       console.error("Error fetching last message:", error);
//       return null;
//     }
//   };

//   // Modify the polling interval and add debouncing
//   useEffect(() => {
//     getUsers();

//     const pollInterval = setInterval(() => {
//       getUsers();
//     }, 2000); // Increased to 10 seconds for better performance

//     return () => clearInterval(pollInterval);
//   }, []);

//   // Optimize getUsers function with debouncing and caching
//   const getUsers = async () => {
//     if (isRequestPending.current) return;

//     isRequestPending.current = true;
//     try {
//       setLoading(true)
//       const url = `https://highleveltecknology.com/Qtap/api/customer_info`;
//       const options = {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//         },
//       };

//       const data = await makeRequest(url, options);
//       const dataUsers = data?.customer_info;

//       // Batch fetch last messages in chunks
//       const BATCH_SIZE = 5;
//       const newLastMessages = {};
//       let hasNewMessages = false;

//       for (let i = 0; i < dataUsers.length; i += BATCH_SIZE) {
//         const batch = dataUsers.slice(i, i + BATCH_SIZE);
//         const promises = batch.map((user) => fetchLastMessage(user.id));
//         const messages = await Promise.all(promises);

//         messages.forEach((msg, index) => {
//           if (msg) {
//             const userId = batch[index].id;
//             newLastMessages[userId] = msg;
//             const lastKnownMsg = lastKnownMessages.current[userId];

//             if (
//               !lastKnownMsg ||
//               new Date(msg.created_at) > new Date(lastKnownMsg.created_at)
//             ) {
//               hasNewMessages = true;
//               if (selectedChat?.id !== userId && msg.sender === "user") {
//                 setUnreadMessages((prev) => ({
//                   ...prev,
//                   [userId]: true,
//                 }));
//               }
//             }
//           }
//         });
//       }

//       if (hasNewMessages) {
//         setLastMessages(newLastMessages);
//         lastKnownMessages.current = newLastMessages;

//         setUsers((prevUsers) => {
//           const sortedUsers = [...dataUsers].sort((a, b) => {
//             const msgA = newLastMessages[a.id];
//             const msgB = newLastMessages[b.id];
//             if (!msgA && !msgB) return 0;
//             if (!msgA) return 1;
//             if (!msgB) return -1;
//             return new Date(msgB.created_at) - new Date(msgA.created_at);
//           });

//           // Only update if there are actual changes
//           if (JSON.stringify(prevUsers) !== JSON.stringify(sortedUsers)) {
//             return sortedUsers;
//           }
//           return prevUsers;
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setLoading(false)
//       setTimeout(() => {
//         isRequestPending.current = false;
//       }, 1000); // Reduced cooldown time
//     }
//   };

//   // Optimize message sending
//   const handleSendMessage = async () => {
//     if (messageInput.trim() === "" || !selectedChat) return;

//     const messageData = {
//       sender_id: "1",
//       receiver_id: selectedChat.id,
//       sender_type: "support",
//       message: messageInput,
//     };

//     // Optimistic update
//     const newMessage = {
//       text: messageInput,
//       sender: "me",
//       time: new Date().toLocaleTimeString(),
//       created_at: new Date().toISOString(),
//     };

//     setSelectedChat((prev) => ({
//       ...prev,
//       messages: [...(prev.messages || []), newMessage],
//     }));
//     setMessageInput("");

//     try {
//       const response = await fetch(
//         "https://highleveltecknology.com/Qtap/api/chat",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//           },
//           body: JSON.stringify(messageData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to send message");
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       // Rollback optimistic update if needed
//     }
//   };

//   // Optimize message list rendering with virtualization
//   const MessageList = React.memo(({ messages }) => {
//     const listRef = useRef(null);

//     useEffect(() => {
//       if (listRef.current) {
//         listRef.current.scrollTop = listRef.current.scrollHeight;
//       }
//     }, [messages]);

//     return (
//       <Box
//         ref={listRef}
//         sx={{ overflowY: "auto", flexGrow: 1, padding: "0px 20px" }}
//       >
//         {messages.map((msg, index) => (
//           <Box
//             key={`${msg.created_at}-${index}`}
//             sx={{
//               display: "flex",
//               justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",
//               marginBottom: 1,
//             }}
//           >
//             <Box
//               sx={{
//                 bgcolor: msg.sender === "me" ? "#E57C00" : "#F1F1F1",
//                 color: msg.sender === "me" ? "white" : "black",
//                 padding: "6px 20px",
//                 width: "50%",
//                 maxWidth: "70%",
//                 fontSize: "12px",
//                 borderRadius:
//                   msg.sender === "me"
//                     ? "30px 30px 0px 30px"
//                     : "30px 30px 30px 0px",
//               }}
//             >
//               {msg.text}
//             </Box>
//           </Box>
//         ))}
//       </Box>
//     );
//   });

//   return (
//     <Paper sx={{ height: "70vh", borderRadius: "20px" }}>
//       <Typography
//         variant="body2"
//         sx={{ fontSize: "12px", padding: "20px", color: "#363535fa" }}
//       >
//         Live Chat
//       </Typography>

//       <Grid container>
//         <Grid item width="30%">
//           {!users ? (<Box
//               sx={{
//                 height: "60vh",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: 2,
//               }}
//             >
//               <CircularProgress
//                 size={40}
//                 thickness={4}
//                 sx={{
//                   color: "#E57C00",
//                   "& .MuiCircularProgress-circle": {
//                     strokeLinecap: "round",
//                   },
//                 }}
//               />
//               <Typography
//                 sx={{
//                   fontSize: "14px",
//                   color: "#666",
//                   fontWeight: 500,
//                   animation: "pulse 1.5s infinite",
//                   "@keyframes pulse": {
//                     "0%": { opacity: 0.6 },
//                     "50%": { opacity: 1 },
//                     "100%": { opacity: 0.6 },
//                   },
//                 }}
//               >
//                 Loading chats...
//               </Typography>
//             </Box>
//           ) : (
//             <List
//               sx={{
//                 height: "60vh",
//                 overflowY: "scroll",
//                 "&::-webkit-scrollbar": {
//                   width: "8px",
//                   height: "8px",
//                 },
//                 "&::-webkit-scrollbar-track": {
//                   background: "#f1f1f1",
//                   borderRadius: "4px",
//                 },
//                 "&::-webkit-scrollbar-thumb": {
//                   background: "#E57C00",
//                   borderRadius: "4px",
//                   width: "2px",
//                   "&:hover": {
//                     background: "#ef7d00",
//                   },
//                 },
//               }}
//             >
//               {users.map((user) => (
//                 <ListItem
//                   button
//                   key={user.id}
//                   onClick={() => handleSelectChat(user)}
//                   sx={{
//                     fontSize: "12px",
//                     padding: "3px 20px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     position: "relative",
//                     "&:hover": {
//                       backgroundColor: "#f7f7f7fa",
//                     },
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <ListItemAvatar>
//                       <Avatar
//                         sx={{
//                           backgroundColor:
//                             selectedChat?.id === user.id
//                               ? "#ef7d00"
//                               : "#AAAAAA",
//                           width: 35,
//                           height: 35,
//                         }}
//                       >
//                         <PersonOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
//                       </Avatar>
//                     </ListItemAvatar>
//                     <ListItemText
//                       primary={
//                         <Box sx={{ display: "flex", alignItems: "center" }}>
//                           <Typography
//                             sx={{ fontSize: "11px", color: "#575756" }}
//                           >
//                             {user.name}
//                           </Typography>
//                           {unreadMessages[user.id] && (
//                             <Box
//                               sx={{
//                                 width: 8,
//                                 height: 8,
//                                 borderRadius: "50%",
//                                 backgroundColor: "red",
//                                 marginLeft: 1,
//                               }}
//                             />
//                           )}
//                         </Box>
//                       }
//                       secondary={
//                         <Typography
//                           sx={{
//                             fontSize: "8px",
//                             color: "gray",
//                             marginLeft: "10px",
//                           }}
//                         >
//                           {lastMessages[user.id]?.message || ""}
//                         </Typography>
//                       }
//                     />
//                   </Box>
//                   <Typography
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       fontSize: "8px",
//                       textAlign: "right",
//                     }}
//                   >
//                     {lastMessages[user.id] && (
//                       <>
//                         <span style={{ color: "#AAAAAA" }}>
//                           {new Date(
//                             lastMessages[user.id].created_at
//                           ).toLocaleDateString()}
//                         </span>
//                         <span style={{ color: "#AAAAAA" }}>
//                           {new Date(
//                             lastMessages[user.id].created_at
//                           ).toLocaleTimeString()}
//                         </span>
//                       </>
//                     )}
//                   </Typography>
//                 </ListItem>
//               ))}
//             </List>
//           )}
//         </Grid>

//         <Divider
//           orientation="vertical"
//           flexItem
//           sx={{
//             borderRightWidth: 1,
//             borderColor: "#d3d3d3",
//             height: "55vh ",
//           }}
//         />

//         <Grid item width="65%">
//           {selectedChat ? (
//             <Box
//               sx={{
//                 height: "calc(70vh - 70px)",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Box sx={{ padding: "0px 20px", flexGrow: 1, overflowY: "auto" }}>
//                 <Box display={"flex"} justifyContent={"space-between"}>
//                   <Typography sx={{ color: "#3c3d3d", fontSize: "12px" }}>
//                     {selectedChat ? selectedChat.name : "Name"}
//                   </Typography>

//                   <Box>
//                     <span
//                       class="icon-magnifier"
//                       sx={{
//                         fontSize: "20px",
//                         color: "#3c3d3d",
//                         cursor: "pointer",
//                       }}
//                     ></span>
//                     <LocalPhoneIcon
//                       sx={{
//                         fontSize: "20px",
//                         color: "#3c3d3d",
//                         margin: "0px 13px",
//                         cursor: "pointer",
//                       }}
//                     />
//                     <PersonOutlineOutlinedIcon
//                       sx={{
//                         fontSize: "20px",
//                         color: "#3c3d3d",
//                         cursor: "pointer",
//                       }}
//                       onClick={handleOpenMenu}
//                     />
//                   </Box>
//                 </Box>
//                 <Divider />

//                 {isLoading ? (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       height: "100%",
//                     }}
//                   >
//                     <CircularProgress sx={{ color: "#E57C00" }} />
//                   </Box>
//                 ) : (
//                   <MessageList messages={selectedChat.messages} />
//                 )}
//               </Box>

//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   textAlign: "center",
//                   padding: "20px 40px",
//                   width: "100%",
//                   gap: 1,
//                   margin: "0 auto",
//                 }}
//               >
//                 <IconButton edge="start" sx={{ color: "#ef7d00" }}>
//                   <span
//                     class="icon-plus"
//                     style={{ fontSize: "22px", WebkitTextFillColor: "#ef7d00" }}
//                   >
//                     <span class="path1"></span>
//                     <span
//                       style={{ WebkitTextFillColor: "white" }}
//                       class="path2"
//                     ></span>
//                   </span>
//                 </IconButton>

//                 <IconButton edge="start" sx={{ color: "#ef7d00" }}>
//                   <span class="icon-image" style={{ fontSize: "22px" }}></span>
//                 </IconButton>

//                 <TextField
//                   fullWidth
//                   value={messageInput}
//                   onChange={(e) => setMessageInput(e.target.value)}
//                   placeholder="Type your message"
//                   InputProps={{
//                     sx: {
//                       height: "30px",
//                       borderRadius: "20px",
//                       backgroundColor: "#EBEDF3",
//                       fontSize: "12px",
//                       "& .MuiOutlinedInput-notchedOutline": {
//                         border: "none",
//                       },
//                       display: "flex",
//                       alignItems: "center",
//                     },
//                   }}
//                 />

//                 <IconButton
//                   onClick={handleSendMessage}
//                   sx={{ color: "#ef7d00" }}
//                 >
//                   <span
//                     class="icon-send-message"
//                     style={{ fontSize: "18px", WebkitTextFillColor: "#ef7d00" }}
//                   ></span>
//                 </IconButton>
//               </Box>
//             </Box>
//           ) : (
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: "100%",
//               }}
//             >
//               <IconButton>
//                 <WhatsAppIcon sx={{ color: "gray", fontSize: "55px" }} />{" "}
//               </IconButton>
//               <Typography
//                 variant="body1"
//                 sx={{ fontSize: "16px", color: "gray" }}
//               >
//                 Select a chat to start messaging.
//               </Typography>
//             </Box>
//           )}
//         </Grid>

//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleCloseMenu}
//           PaperProps={{
//             sx: {
//               minWidth: "100px",
//             },
//           }}
//         >
//           <MenuItem>
//             <PersonOutlineOutlinedIcon
//               sx={{ fontSize: 16, color: "#575756", marginRight: "10px" }}
//             />
//             <Box>
//               <Typography sx={{ fontSize: "10px", color: "#575756" }}>
//                 Name:
//               </Typography>
//               <Typography sx={{ fontSize: "10px", color: "gray" }}>
//                 {selectedChat ? selectedChat.name : "Name"}
//               </Typography>
//             </Box>
//           </MenuItem>
//           <MenuItem>
//             <LocalPhoneOutlinedIcon
//               sx={{ fontSize: 15, marginRight: "10px" }}
//             />
//             <Box>
//               <Typography sx={{ fontSize: "10px", color: "#575756" }}>
//                 Mobile:
//               </Typography>
//               <Typography sx={{ fontSize: "10px", color: "gray" }}>
//                 {selectedChat ? selectedChat.phone : "Mobile"}
//               </Typography>
//             </Box>
//           </MenuItem>
//           <MenuItem>
//             <MailOutlineIcon sx={{ fontSize: 15, marginRight: "10px" }} />
//             <Box>
//               <Typography sx={{ fontSize: "10px", color: "#575756" }}>
//                 Email:
//               </Typography>
//               <Typography sx={{ fontSize: "10px", color: "gray" }}>
//                 {selectedChat ? selectedChat.email : "Email"}
//               </Typography>
//             </Box>
//           </MenuItem>
//           <MenuItem>
//             <AddLocationAltOutlinedIcon
//               sx={{ fontSize: 15, marginRight: "10px" }}
//             />
//             <Box>
//               <Typography sx={{ fontSize: "10px", color: "#575756" }}>
//                 Address:
//               </Typography>
//               <Typography sx={{ fontSize: "10px", color: "gray" }}>
//                 {selectedChat ? selectedChat.address : "Address"}
//               </Typography>
//             </Box>
//           </MenuItem>
//         </Menu>
//       </Grid>
//     </Paper>
//   );
// };

// export default ChatApp;

import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
  TextField,
  IconButton,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Menu, MenuItem } from "@mui/material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import "./chat.css";
import { useTranslation } from "react-i18next";

const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [users, setUsers] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState({});

  const lastKnownMessages = useRef({});
  const requestQueue = useRef([]);
  const isProcessingQueue = useRef(false);
  const isRequestPending = useRef(false);
  const messageCache = useRef({});
  const { t } = useTranslation();

  const processQueue = async () => {
    if (isProcessingQueue.current || requestQueue.current.length === 0) return;

    isProcessingQueue.current = true;

    while (requestQueue.current.length > 0) {
      const { url, options, resolve, reject } = requestQueue.current[0];

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch(url, options);
        if (!response.ok) {
          if (response.status === 429) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            continue;
          }
          throw new Error(`Network error: ${response.status}`);
        }

        const data = await response.json();
        resolve(data);
        requestQueue.current.shift();
      } catch (error) {
        reject(error);
        requestQueue.current.shift();
      }
    }

    isProcessingQueue.current = false;
  };

  const makeRequest = async (url, options) => {
    return new Promise((resolve, reject) => {
      requestQueue.current.push({ url, options, resolve, reject });
      processQueue();
    });
  };

  const getInitialData = async () => {
    setIsLoading(true);
    try {
      const [usersResponse, lastMessagesResponse] = await Promise.all([
        fetch("https://highleveltecknology.com/Qtap/api/customer_info", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }),
        fetch("https://highleveltecknology.com/Qtap/api/last_messages", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }),
      ]);

      const usersData = await usersResponse.json();
      const lastMessagesData = await lastMessagesResponse.json();

      setUsers(usersData.customer_info);
      setLastMessages(lastMessagesData);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChat = async (chat) => {
    setSelectedChat({ ...chat, messages: messageCache.current[chat.id] || [] });
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://highleveltecknology.com/Qtap/api/chat?customer_id=${chat.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        const messages = [
          ...data.customer.map((msg) => ({
            text: msg.message,
            sender: "user",
            time: new Date(msg.created_at).toLocaleTimeString(),
            created_at: msg.created_at,
          })),
          ...data.support.map((msg) => ({
            text: msg.message,
            sender: "me",
            time: new Date(msg.created_at).toLocaleTimeString(),
            created_at: msg.created_at,
          })),
        ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        messageCache.current[chat.id] = messages;
        setSelectedChat({ ...chat, messages });
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    } finally {
      setIsLoading(false);
    }

    setUnreadMessages((prev) => ({
      ...prev,
      [chat.id]: false,
    }));
  };

  const handleNewMessage = (message) => {
    const newMessage = {
      text: message.message,
      sender: message.sender_type === "support" ? "me" : "user",
      time: new Date(message.created_at).toLocaleTimeString(),
      created_at: message.created_at,
    };

    if (messageCache.current[message.sender_id]) {
      messageCache.current[message.sender_id] = [
        ...messageCache.current[message.sender_id],
        newMessage,
      ];
    }

    setLastMessages((prev) => ({
      ...prev,
      [message.sender_id]: message,
    }));

    if (
      selectedChat?.id !== message.sender_id &&
      message.sender_type === "user"
    ) {
      setUnreadMessages((prev) => ({
        ...prev,
        [message.sender_id]: true,
      }));
    }

    if (selectedChat?.id === message.sender_id) {
      setSelectedChat((prev) => ({
        ...prev,
        messages: [...(prev.messages || []), newMessage],
      }));
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const fetchLastMessage = async (userId) => {
    try {
      const url = `https://highleveltecknology.com/Qtap/api/chat?customer_id=${userId}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      };

      const data = await makeRequest(url, options);
      if (data.success) {
        const allMessages = [
          ...data.customer.map((msg) => ({
            ...msg,
            sender: "user",
          })),
          ...data.support.map((msg) => ({
            ...msg,
            sender: "me",
          })),
        ];

        if (allMessages.length > 0) {
          allMessages.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          return allMessages[0];
        }
      }
      return null;
    } catch (error) {
      console.error("Error fetching last message:", error);
      return null;
    }
  };

  useEffect(() => {
    getUsers();

    const pollInterval = setInterval(() => {
      getUsers();
    }, 2000);

    return () => clearInterval(pollInterval);
  }, []);

  const getUsers = async () => {
    if (isRequestPending.current) return;

    isRequestPending.current = true;
    try {
      setLoading(true);
      const url = `https://highleveltecknology.com/Qtap/api/customer_info`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      };

      const data = await makeRequest(url, options);
      const dataUsers = data?.customer_info;

      const BATCH_SIZE = 5;
      const newLastMessages = {};
      let hasNewMessages = false;

      for (let i = 0; i < dataUsers.length; i += BATCH_SIZE) {
        const batch = dataUsers.slice(i, i + BATCH_SIZE);
        const promises = batch.map((user) => fetchLastMessage(user.id));
        const messages = await Promise.all(promises);

        messages.forEach((msg, index) => {
          if (msg) {
            const userId = batch[index].id;
            newLastMessages[userId] = msg;
            const lastKnownMsg = lastKnownMessages.current[userId];

            if (
              !lastKnownMsg ||
              new Date(msg.created_at) > new Date(lastKnownMsg.created_at)
            ) {
              hasNewMessages = true;
              if (selectedChat?.id !== userId && msg.sender === "user") {
                setUnreadMessages((prev) => ({
                  ...prev,
                  [userId]: true,
                }));
              }
            }
          }
        });
      }

      if (hasNewMessages) {
        setLastMessages(newLastMessages);
        lastKnownMessages.current = newLastMessages;

        setUsers((prevUsers) => {
          const sortedUsers = [...dataUsers].sort((a, b) => {
            const msgA = newLastMessages[a.id];
            const msgB = newLastMessages[b.id];
            if (!msgA && !msgB) return 0;
            if (!msgA) return 1;
            if (!msgB) return -1;
            return new Date(msgB.created_at) - new Date(msgA.created_at);
          });

          if (JSON.stringify(prevUsers) !== JSON.stringify(sortedUsers)) {
            return sortedUsers;
          }
          return prevUsers;
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        isRequestPending.current = false;
      }, 1000);
    }
  };

  const handleSendMessage = async () => {
    if (messageInput.trim() === "" || !selectedChat) return;

    const messageData = {
      sender_id: "1",
      receiver_id: selectedChat.id,
      sender_type: "support",
      message: messageInput,
    };

    const newMessage = {
      text: messageInput,
      sender: "me",
      time: new Date().toLocaleTimeString(),
      created_at: new Date().toISOString(),
    };

    setSelectedChat((prev) => ({
      ...prev,
      messages: [...(prev.messages || []), newMessage],
    }));
    setMessageInput("");

    try {
      const response = await fetch(
        "https://highleveltecknology.com/Qtap/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify(messageData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const MessageList = React.memo(({ messages }) => {
    const listRef = useRef(null);

    useEffect(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    }, [messages]);

    return (
      <Box
        ref={listRef}
        sx={{ overflowY: "auto", flexGrow: 1, padding: "0px 20px" }}
      >
        {messages.map((msg, index) => (
          <Box
            key={`${msg.created_at}-${index}`}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",
              marginBottom: 1,
            }}
          >
            <Box
              sx={{
                bgcolor: msg.sender === "me" ? "#E57C00" : "#F1F1F1",
                color: msg.sender === "me" ? "white" : "black",
                padding: "6px 20px",
                width: "50%",
                maxWidth: "70%",
                fontSize: "12px",
                borderRadius:
                  msg.sender === "me"
                    ? "30px 30px 0px 30px"
                    : "30px 30px 30px 0px",
              }}
            >
              {msg.text}
            </Box>
          </Box>
        ))}
      </Box>
    );
  });

  return (
    <Paper sx={{ height: "70vh", borderRadius: "20px" }}>
      <Typography
        variant="body2"
        sx={{ fontSize: "12px", padding: "20px", color: "#363535fa" }}
      >
        {t("liveChat")}
      </Typography>

      <Grid container>
        <Grid item width="30%">
          {!users ? (
            <Box
              sx={{
                height: "60vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <CircularProgress
                size={40}
                thickness={4}
                sx={{
                  color: "#E57C00",
                  "& .MuiCircularProgress-circle": {
                    strokeLinecap: "round",
                  },
                }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#666",
                  fontWeight: 500,
                  animation: "pulse 1.5s infinite",
                  "@keyframes pulse": {
                    "0%": { opacity: 0.6 },
                    "50%": { opacity: 1 },
                    "100%": { opacity: 0.6 },
                  },
                }}
              >
                Loading chats...
              </Typography>
            </Box>
          ) : (
            <List
              sx={{
                height: "60vh",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  width: "8px",
                  height: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#E57C00",
                  borderRadius: "4px",
                  width: "2px",
                  "&:hover": {
                    background: "#ef7d00",
                  },
                },
              }}
            >
              {users.map((user) => (
                <ListItem
                  button
                  key={user.id}
                  onClick={() => handleSelectChat(user)}
                  sx={{
                    fontSize: "12px",
                    padding: "3px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    position: "relative",
                    "&:hover": {
                      backgroundColor: "#f7f7f7fa",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          backgroundColor:
                            selectedChat?.id === user.id
                              ? "#ef7d00"
                              : "#AAAAAA",
                          width: 35,
                          height: 35,
                        }}
                      >
                        <PersonOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            sx={{ fontSize: "11px", color: "#575756" }}
                          >
                            {user.name}
                          </Typography>
                          {unreadMessages[user.id] && (
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                backgroundColor: "red",
                                marginLeft: 1,
                              }}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Typography
                          sx={{
                            fontSize: "8px",
                            color: "gray",
                            marginLeft: "10px",
                          }}
                        >
                          {lastMessages[user.id]?.message || ""}
                        </Typography>
                      }
                    />
                  </Box>
                  <Typography
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      fontSize: "8px",
                      textAlign: "right",
                    }}
                  >
                    {lastMessages[user.id] && (
                      <>
                        <span style={{ color: "#AAAAAA" }}>
                          {new Date(
                            lastMessages[user.id].created_at
                          ).toLocaleDateString()}
                        </span>
                        <span style={{ color: "#AAAAAA" }}>
                          {new Date(
                            lastMessages[user.id].created_at
                          ).toLocaleTimeString()}
                        </span>
                      </>
                    )}
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}
        </Grid>

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            borderRightWidth: 1,
            borderColor: "#d3d3d3",
            height: "55vh ",
          }}
        />

        <Grid item width="65%">
          {selectedChat ? (
            <Box
              sx={{
                height: "calc(70vh - 70px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ padding: "0px 20px", flexGrow: 1, overflowY: "auto" }}>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography sx={{ color: "#3c3d3d", fontSize: "12px" }}>
                    {selectedChat ? selectedChat.name : "Name"}
                  </Typography>

                  <Box>
                    <span
                      class="icon-magnifier"
                      sx={{
                        fontSize: "20px",
                        color: "#3c3d3d",
                        cursor: "pointer",
                      }}
                    ></span>
                    <LocalPhoneIcon
                      sx={{
                        fontSize: "20px",
                        color: "#3c3d3d",
                        margin: "0px 13px",
                        cursor: "pointer",
                      }}
                    />
                    <PersonOutlineOutlinedIcon
                      sx={{
                        fontSize: "20px",
                        color: "#3c3d3d",
                        cursor: "pointer",
                      }}
                      onClick={handleOpenMenu}
                    />
                  </Box>
                </Box>
                <Divider />

                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <CircularProgress sx={{ color: "#E57C00" }} />
                  </Box>
                ) : (
                  <MessageList messages={selectedChat.messages} />
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "20px 40px",
                  width: "100%",
                  gap: 1,
                  margin: "0 auto",
                }}
              >
                <IconButton edge="start" sx={{ color: "#ef7d00" }}>
                  <span
                    class="icon-plus"
                    style={{ fontSize: "22px", WebkitTextFillColor: "#ef7d00" }}
                  >
                    <span class="path1"></span>
                    <span
                      style={{ WebkitTextFillColor: "white" }}
                      class="path2"
                    ></span>
                  </span>
                </IconButton>

                <IconButton edge="start" sx={{ color: "#ef7d00" }}>
                  <span class="icon-image" style={{ fontSize: "22px" }}></span>
                </IconButton>

                <TextField
                  fullWidth
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message"
                  InputProps={{
                    sx: {
                      height: "30px",
                      borderRadius: "20px",
                      backgroundColor: "#EBEDF3",
                      fontSize: "12px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                />

                <IconButton
                  onClick={handleSendMessage}
                  sx={{ color: "#ef7d00" }}
                >
                  <span
                    class="icon-send-message"
                    style={{ fontSize: "18px", WebkitTextFillColor: "#ef7d00" }}
                  ></span>
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <IconButton>
                <WhatsAppIcon sx={{ color: "gray", fontSize: "55px" }} />{" "}
              </IconButton>
              <Typography
                variant="body1"
                sx={{ fontSize: "16px", color: "gray" }}
              >
                Select a chat to start messaging.
              </Typography>
            </Box>
          )}
        </Grid>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          PaperProps={{
            sx: {
              minWidth: "100px",
            },
          }}
        >
          <MenuItem>
            <PersonOutlineOutlinedIcon
              sx={{ fontSize: 16, color: "#575756", marginRight: "10px" }}
            />
            <Box>
              <Typography sx={{ fontSize: "10px", color: "#575756" }}>
                Name:
              </Typography>
              <Typography sx={{ fontSize: "10px", color: "gray" }}>
                {selectedChat ? selectedChat.name : "Name"}
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <LocalPhoneOutlinedIcon
              sx={{ fontSize: 15, marginRight: "10px" }}
            />
            <Box>
              <Typography sx={{ fontSize: "10px", color: "#575756" }}>
                Mobile:
              </Typography>
              <Typography sx={{ fontSize: "10px", color: "gray" }}>
                {selectedChat ? selectedChat.phone : "Mobile"}
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <MailOutlineIcon sx={{ fontSize: 15, marginRight: "10px" }} />
            <Box>
              <Typography sx={{ fontSize: "10px", color: "#575756" }}>
                Email:
              </Typography>
              <Typography sx={{ fontSize: "10px", color: "gray" }}>
                {selectedChat ? selectedChat.email : "Email"}
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <AddLocationAltOutlinedIcon
              sx={{ fontSize: 15, marginRight: "10px" }}
            />
            <Box>
              <Typography sx={{ fontSize: "10px", color: "#575756" }}>
                Address:
              </Typography>
              <Typography sx={{ fontSize: "10px", color: "gray" }}>
                {selectedChat ? selectedChat.address : "Address"}
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Grid>
    </Paper>
  );
};

export default ChatApp;