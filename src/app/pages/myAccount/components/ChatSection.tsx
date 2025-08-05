"use client";

import { useEffect, useState } from "react";
import ProjectApiList from "@/app/api/ProjectApiList";
import { MessageCircle, Send, User, Bot, ArrowLeft } from "lucide-react";
import axios from "axios";
import socket from "@/lib/socket";
import { useUserStore } from "@/app/store/useUserStore";
import { toast } from "react-toastify";

interface ChatSession {
  admin: {
    id: string;
    name: string;
    email: string;
  } | null;
  order_id: string | null;
  last_message: string | null;
  last_message_time: string | null;
  status: "open" | "closed";
}

interface ChatMessage {
  id: string;
  role: "user" | "admin";
  content: string;
}

export default function ChatApp() {
  const {
    apigetChatsUserAdminConversations,
    apigetChatsUserList,
    apipostChatsUserMessages,
    api_getOrderById,
    apigetAllAdmins,
    apipostReopenChatSession,
  } = ProjectApiList();
  const { user } = useUserStore();

  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChat, setActiveChat] = useState<any>("default");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [userID, setUserID] = useState("");
  const [orderID, setOrderID] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [adminId, setAdminId] = useState<any>("");
  const [refreshChat, setRefreshChat] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [adminData, setAdminData] = useState<any[]>([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrderTemp, setSelectedOrderTemp] = useState<any>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [selectedAdminTemp, setSelectedAdminTemp] = useState<any>(null);
  const [chatStatus, setChatStatus] = useState<"open" | "closed" | "">("");

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reopening, setReopening] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const fetchAllAdmins = async () => {
  //   try {
  //     const res = await axios.get(`${apigetAllAdmins}`);
  //     setAdminData(res.data?.data || []);
  //   } catch (err) {
  //     console.error("Error fetching admins:", err);
  //   }
  // };

  const fetchAllAdmins = async () => {
  try {
    const res = await axios.get(`${apigetAllAdmins}`);
    const admins = res.data?.data || [];

    setAdminData(admins);

    // Automatically select the first admin
    if (admins.length > 0) {
      setSelectedAdminTemp(admins[0]);
    }
  } catch (err) {
    console.error("Error fetching admins:", err);
  }
};


  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${api_getOrderById}/${user?.waId}`);
      setOrders(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    if (user?.waId) {
      fetchAllOrders();
    }
  }, [user?.waId]);

  useEffect(() => {
    if (showOrderModal) {
      fetchAllAdmins();
    }
  }, [showOrderModal]);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      socket.emit("join_room", { userID, adminId });
    });

    socket.on("message_received", (data: any) => {
      if (data.sender_id !== userID) {
        const msg: ChatMessage = {
          id: data._id,
          role: "admin",
          content: data.message,
        };
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchConversations = async () => {
    const res = await axios.get(`${apigetChatsUserList}/${user?.waId}`);
    setChatSessions(res.data.data);
  };

  const fetchMessages = async () => {
    const res = await axios.get(
      `${apigetChatsUserAdminConversations}?userId=${user?.waId}&adminId=${adminId}&orderId=${orderID}`
    );
    const data = res.data.data;

    const formatted: ChatMessage[] = data.map((msg: any) => ({
      id: msg._id,
      role: msg.sender_type === "user" ? "user" : "admin",
      content: msg.message,
    }));
    setMessages(formatted);
  };

  useEffect(() => {
    if (user?.waId) fetchConversations();
    if (userID) fetchMessages();
  }, [user?.waId, adminId, orderID, refreshChat]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const payload = {
      sender_type: "user",
      sender_id: user?.waId,
      receiver_type: "admin",
      receiver_id: adminId,
      message: input,
      roomId: `chat-room-${userID}`,
      order_id: orderID,
    };

    try {
      const res = await axios.post(apipostChatsUserMessages, payload);
      socket.emit("send_message", res.data);
      fetchMessages();
    } catch (err) {
      console.error("Sending failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessageManually = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const payload = {
      sender_type: "user",
      sender_id: user?.waId,
      receiver_type: "admin",
      receiver_id: selectedAdminTemp?.id,
      message: messageText,
      roomId: `chat-room-${user?.waId}`,
      order_id: selectedOrderTemp?.Order_no,
    };

    try {
      const res = await axios.post(apipostChatsUserMessages, payload);
      socket.emit("send_message", res.data);
      fetchMessages();
    } catch (err) {
      console.error("Sending failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatSelect = (chat: ChatSession) => {
    if (!chat.admin) return;
    setActiveChat(chat.order_id);
    setUserID(user?.waId || "");
    setOrderID(chat.order_id || "");
    setUserName(chat.admin.name || "Unknown");
    setAdminId(chat.admin.id);
    setChatStatus(chat.status || "open");
    setRefreshChat((prev) => !prev);
    if (isMobile) setShowMobileChat(true);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const truncateText = (text: string, charLimit = 30) => {
    return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
  };

  const handleReopenChat = async () => {
    let payload = {
      orderId: orderID,
    };
    try {
      setReopening(true);
      const res = await axios.post(`${apipostReopenChatSession}`, payload);
      if (res?.data?.status === "success") {
        setChatStatus("open");
        setMessages([]);
        fetchConversations();
        toast.success(
          "Chat reopened successfully! Please select your chat to start the conversation "
        );
      } else {
        toast.error("Failed to reopen chat.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setReopening(false);
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="h-[100dvh] md:h-[550px] bg-gray-50 rounded-md shadow border overflow-hidden flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className={`w-full md:w-80 bg-white border-r border-gray-300 flex-shrink-0 flex-col ${
          isMobile && showMobileChat ? "hidden" : "flex"
        }`}
      >
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MessageCircle size={20} /> Chat Support
          </h2>
        </div>
        <div className="p-4 border-b">
          <button
            onClick={() => setShowOrderModal(true)}
            className="w-full text-sm px-4 py-2 border border-orange-500 text-orange-600 rounded hover:bg-orange-50 cursor-pointer"
          >
            {orderDetails?.Order_no || "Select an Order"}
          </button>
        </div>
        <div className="flex-grow max-w-[350px] overflow-y-auto overflow-x-hidden">
          {chatSessions.map((chat, index) => (
            <div
              key={index}
              onClick={() => handleChatSelect(chat)}
              className={`flex items-start gap-3 p-4 cursor-pointer transition-all hover:bg-gray-100 ${
                activeChat === chat.order_id ? "bg-gray-200" : ""
              }`}
            >
              <div className="bg-blue-100 rounded-full p-2">
                <MessageCircle className="text-blue-500" size={18} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {/* {chat.admin?.name || "No Name"} */}#
                  {chat.order_id || "No Order Id"}
                </p>
                <p className="text-xs text-gray-500">
                  {chat.last_message ? (
                    <>
                      <span className="block">
                        {truncateText(chat.last_message)}
                      </span>
                      <span className="block text-[10px] text-gray-400">
                        {formatDate(chat.last_message_time)}
                      </span>
                    </>
                  ) : (
                    "No messages yet"
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <main
        className={`flex flex-col flex-grow ${
          isMobile && !showMobileChat ? "hidden" : "flex"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex items-center gap-3">
          {isMobile && showMobileChat && (
            <button
              onClick={() => setShowMobileChat(false)}
              className="text-orange-600 hover:text-orange-800 flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          )}
          <div className="bg-gray-200 rounded-full p-2">
            <Bot size={18} className="text-gray-700" />
          </div>
          <h3 className="font-semibold text-gray-800">
            Elfo Support
            {chatStatus === "closed" && (
              <span className="ml-2 text-sm text-red-500">
                (Chat is Closed)
              </span>
            )}
          </h3>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.length === 0 && !isLoading ? (
            <div className="text-center pt-20 text-gray-500">
              <MessageCircle className="mx-auto mb-2" size={48} />
              <p className="text-lg">No messages yet</p>
              <p className="text-sm">Select a user to start chatting</p>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <div
                  key={`${msg.role}-${index}-${msg.content.slice(0, 10)}`}
                  className={`flex items-end ${
                    msg.role === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "user" && (
                    <div className="mr-2">
                      <div className="bg-gray-300 rounded-full p-1">
                        <User size={16} />
                      </div>
                    </div>
                  )}
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs text-sm shadow ${
                      msg.role === "admin"
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-900 border"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "admin" && (
                    <div className="ml-2">
                      <div className="bg-gray-300 rounded-full p-1">
                        <Bot size={16} />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Show "Chat is closed" message */}
              {chatStatus === "closed" && (
                <div className="text-center mt-6 space-y-3">
                  <div className="text-sm text-red-500 font-medium">
                    ⚠️ This chat is closed. You can view messages but cannot
                    reply.
                  </div>
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="px-4 py-2 text-sm  rounded underline transition cursor-pointer"
                  >
                    Reopen Chat
                  </button>
                </div>
              )}
            </>
          )}

          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-gray-500 animate-pulse">
              <div className="h-4 w-4 border-2 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
              <span>Sending...</span>
            </div>
          )}
        </div>

        {/* Message Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-gray-300 p-3 flex gap-2 bg-white"
        >
          <input
            type="text"
            placeholder={
              chatStatus === "closed"
                ? "Chat is closed"
                : "Type your message..."
            }
            value={input}
            onChange={handleInputChange}
            disabled={isLoading || chatStatus === "closed"}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 text-sm"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || chatStatus === "closed"}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </form>
      </main>

      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Start Chat</h2>
              <button
                onClick={() => {
                  setShowOrderModal(false);
                  setSelectedOrderTemp(null);
                  setSelectedAdminTemp(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
            </div>

            {/* Order Dropdown */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-1 block">
                Select an Order
              </label>
              <select
                value={selectedOrderTemp?.id || ""}
                onChange={(e) => {
                  const selected = orders.find(
                    (order) => order.id === parseInt(e.target.value)
                  );
                  setSelectedOrderTemp(selected || null);
                }}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Select Order --</option>
                {orders.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.Order_no}
                  </option>
                ))}
              </select>
            </div>

            {/* Admin Dropdown */}
            {/* <div className="mb-4">
              <label className="text-sm font-medium mb-1 block">
                Select an Admin
              </label>
              <select
                value={selectedAdminTemp?.id || ""}
                onChange={(e) => {
                  const selected = adminData.find(
                    (admin) => admin.id === parseInt(e.target.value)
                  );
                  setSelectedAdminTemp(selected || null);
                }}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Select Admin --</option>
                {adminData.map((admin) => (
                  <option key={admin.id} value={admin.id}>
                    Admin {admin.id}
                  </option>
                ))}
              </select>
            </div> */}

            {/* Confirm Button */}
            <button
              onClick={async () => {
                if (selectedOrderTemp && selectedAdminTemp) {
                  setOrderID(selectedOrderTemp.Order_no);
                  setOrderDetails(selectedOrderTemp);
                  setAdminId(selectedAdminTemp.id);
                  setUserID(user?.waId || "");
                  setUserName(
                    `${selectedAdminTemp.firstname} ${selectedAdminTemp.lastname}`
                  );
                  setShowOrderModal(false);
                  setSelectedOrderTemp(null);
                  setSelectedAdminTemp(null);

                  await sendMessageManually(
                    `Hi, I want to start a chat regarding my order - #${selectedOrderTemp?.Order_no}`
                  );
                }
              }}
              disabled={!selectedOrderTemp || !selectedAdminTemp}
              className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-50 cursor-pointer"
            >
              Start Chat
            </button>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full space-y-4">
            <h2 className="text-lg font-semibold">Reopen Chat</h2>
            <p className="text-sm text-gray-600">
              Are you sure you want to reopen this chat? The user will be able
              to respond again.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                className="px-4 py-2 text-sm text-gray-600 border rounded hover:bg-gray-100 cursor-pointer"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                disabled={reopening}
                className="px-4 py-2 text-sm bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-60 cursor-pointer"
                onClick={handleReopenChat}
              >
                {reopening ? "Reopening..." : "Yes, Reopen"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
