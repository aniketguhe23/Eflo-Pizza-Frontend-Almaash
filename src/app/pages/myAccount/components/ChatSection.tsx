"use client";

import { useCallback, useEffect, useState } from "react";
import { MessageCircle, Plus, Send, Bot, User } from "lucide-react";
import io from "socket.io-client";
import BackendUrl from "@/app/api/BackendUrl";
import { useUserStore } from "@/app/store/useUserStore";
import ProjectApiList from "@/app/api/ProjectApiList";
import axios from "axios";

interface ChatSession {
  id: string;
  title: string;
  address: string;
  name: string;
  restaurant_no: string;
  last_message_time: string;
  timestamp: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "restaurant";
  content: string;
}

const socket = io(BackendUrl); // replace with production URL if needed

export default function ChatSection() {
  const { user } = useUserStore();
  const {
    apigetChatsRestConversations,
    apigetChatsRestMessages,
    apipostChatsRestMessages,
    api_getOrderById,
  } = ProjectApiList();
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChat, setActiveChat] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants_no, setResturant_no] = useState<any>("");
  const [orderData, setOrderData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRestaurantId, setNewRestaurantId] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
    setInput(
      `Hi, I have a query regarding my recent order. Could you please assist with the status or any issues? Thank you.`
    );
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setInput("");
    setNewRestaurantId("");
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api_getOrderById}/${user?.waId}`);
      setOrderData(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [api_getOrderById, user?.waId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Load all chat sessions
  const chatSessionFunc = () => {
    fetch(`${apigetChatsRestConversations}/${user?.waId}`)
      .then((res) => res.json())
      .then((data) => {
        setChatSessions(data.data);
        if (data.length > 0) {
          setActiveChat(data[0].id);
        }
      });
  };

  useEffect(() => {
    chatSessionFunc();
  }, [isModalOpen]);

  // Load conversation for active chat
  useEffect(() => {
    fetch(
      `${apigetChatsRestMessages}?userId=${user?.waId}&restaurantId=${restaurants_no}`
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted: ChatMessage[] = data?.data.map((msg: any) => ({
          id: msg._id,
          role: msg.sender_type === "user" ? "user" : "restaurant",
          content: msg.message,
        }));
        setMessages(formatted);
      });
  }, [activeChat]);

  // Handle socket.io real-time updates
  useEffect(() => {
    socket.on("receive_message", (msg: any) => {
      setMessages((prev) => [
        ...prev,
        {
          id: msg._id,
          role: msg.sender_type === "user" ? "user" : "restaurant",
          content: msg.message,
        },
      ]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!input.trim()) return;

    const messagePayload = {
      sender_type: "user",
      sender_id: user?.waId,
      receiver_type: "restaurant",
      receiver_id: restaurants_no,
      message: input,
    };

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    closeModal();

    try {
      const res = await fetch(apipostChatsRestMessages, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messagePayload),
      });

      const data = await res.json();
    } catch (err) {
      console.error("Sending failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  // const createNewChat = () => {
  //   const newChat: ChatSession = {
  //     id: Date.now().toString(),
  //     title: "New Chat",
  //     lastMessage: "Start a new conversation...",
  //     timestamp: "now",
  //   };
  //   setChatSessions([newChat, ...chatSessions]);
  //   setActiveChat(newChat.id);
  //   setMessages([]);
  // };

  // console.log(chatSessions,"chatSessions========================>")

  return (
    <div className="flex h-[35rem] bg-[#fbd2bd]">
      {/* Sidebar */}
      <div className="w-56 bg-[#fbd2bd] border-r border-[#f4b798] flex flex-col">
        <div className="p-4 border-b border-[#f4b798] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">Chat</h1>
          </div>
          <button
            onClick={openModal}
            className="p-1.5 border rounded hover:bg-gray-100"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className=" overflow-y-auto flex-1 p-2">
          {chatSessions.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                setActiveChat(chat.id), setResturant_no(chat.restaurant_no);
              }}
              className={`mb-2 p-3 rounded cursor-pointer border ${
                activeChat === chat.id
                  ? "bg-[#f4b798] ring-2 ring-[#f4b798]"
                  : "hover:bg-[#f3bda3]"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f3bda3] flex items-center justify-center text-[#ea6929]">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-sm text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <h3 className="font-medium text-sm text-gray-900 truncate">
                    {chat.address}
                  </h3>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {chat.last_message_time.split(" ")[0]}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{chat.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-[#fbd2bd] border-b border-[#f4b798] p-2 ">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Almaash Alam</h2>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages?.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Chat Feature
              </h3>
              <p className="text-gray-500">Start a conversation</p>
            </div>
          ) : (
            messages?.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "restaurant" && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.content}
                </div>
                {message?.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-[#fbd2bd] border-t border-[#f4b798] p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Start New Conversation
            </h2>
            <select
              value={newRestaurantId}
              onChange={(e) => setResturant_no(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select a Restaurant</option>
              {orderData?.map((order, index) => (
                <option key={index} value={order.restaurant.restaurants_no}>
                  {order?.Order_no} -{" "}
                  <span className="text-gray-400">
                    {order.restaurant.address}
                  </span>
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
