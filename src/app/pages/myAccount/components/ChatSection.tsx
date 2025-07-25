"use client";

import { useCallback, useEffect, useState } from "react";
import { MessageCircle, Plus, Send, Bot, User, ArrowLeft } from "lucide-react";
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


  return (
<div className="flex flex-col sm:flex-row h-auto sm:h-[35rem] bg-[#fbd2bd]">
  {/* Sidebar */}
  {(!activeChat || typeof window !== "undefined" && window.innerWidth >= 640) && (
    <div className="w-full sm:w-56 bg-[#fbd2bd] border-b sm:border-b-0 sm:border-r border-[#f4b798] flex flex-col">
      <div className="p-3 sm:p-4 border-b border-[#f4b798] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Chat</h1>
        </div>
        <button
          onClick={openModal}
          className="p-1 border rounded hover:bg-gray-100"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 p-2 space-y-2">
        {chatSessions.map((chat) => (
          <div
            key={chat.id}
            onClick={() => {
              setActiveChat(chat.id);
              setResturant_no(chat.restaurant_no);
            }}
            className={`p-3 rounded cursor-pointer border text-sm ${
              activeChat === chat.id
                ? "bg-[#f4b798] ring-2 ring-[#f4b798]"
                : "hover:bg-[#f3bda3]"
            }`}
          >
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-[#f3bda3] flex items-center justify-center text-[#ea6929]">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium truncate">{chat.name}</h3>
                <h3 className="font-medium truncate">{chat.address}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {chat.last_message_time.split(" ")[0]}
                </p>
                <p className="text-xs text-gray-400">{chat.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Chat Area */}
  {activeChat && (
    <div className="flex-1 w-full flex flex-col relative">
      {/* Back Button on Small Screens */}
      <div className="sm:hidden absolute top-2 left-2 z-10">
        <button
          onClick={() => setActiveChat("")}
          className="flex items-center text-sm gap-1 px-2 py-1 bg-white border rounded shadow text-blue-600"
        >
          <ArrowLeft className="w-4 h-4" />
          {/* Back */}
        </button>
      </div>

      {/* Chat Header */}
      <div className="bg-[#fbd2bd] border-b border-[#f4b798] p-3 pt-10 sm:pt-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Almaash Alam
            </h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {messages?.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-14 h-14 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-2">
              Chat Feature
            </h3>
            <p className="text-gray-500 text-sm">Start a conversation</p>
          </div>
        ) : (
          messages?.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 sm:gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "restaurant" && (
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] sm:max-w-md px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {message.content}
              </div>
              {message?.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-gray-100 text-gray-900 max-w-[85%] sm:max-w-md px-3 py-2 rounded-lg flex space-x-1">
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
      <div className="bg-[#fbd2bd] border-t border-[#f4b798] p-3 sm:p-4">
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
  )}

  {/* Modal */}
  {isModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-[95%] sm:w-full sm:max-w-md px-4 py-5 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">
          Start New Conversation
        </h2>
        <select
          value={newRestaurantId}
          onChange={(e) => setResturant_no(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 sm:mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
        >
          <option value="">Select a Restaurant</option>
          {orderData?.map((order, index) => (
            <option key={index} value={order.restaurant.restaurants_no}>
              {order?.Order_no} - {order.restaurant.address}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
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
