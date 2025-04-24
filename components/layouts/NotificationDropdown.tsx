"use client";

import { useState, useRef, useEffect } from "react";

interface Notification {
  id: string;
  type: "deploy" | "alert" | "success" | "message";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "deploy",
      title: "ทำการ Deploy สำเร็จ",
      message: "โปรเจค ecommerce-website ถูก deploy ไปที่ main branch",
      time: "5 นาทีที่แล้ว",
      read: false,
    },
    {
      id: "2",
      type: "alert",
      title: "คุณภาพโค้ดต่ำกว่ามาตรฐาน",
      message: "คะแนน Performance ของ admin-dashboard ต่ำกว่า 60%",
      time: "15 นาทีที่แล้ว",
      read: false,
    },
    {
      id: "3",
      type: "success",
      title: "เชื่อมต่อ Discord สำเร็จ",
      message: "ระบบได้เชื่อมต่อกับ Discord Webhook เรียบร้อยแล้ว",
      time: "1 ชั่วโมงที่แล้ว",
      read: true,
    },
  ]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "deploy":
        return "🚀";
      case "alert":
        return "⚠️";
      case "success":
        return "✅";
      case "message":
        return "💬";
      default:
        return "📢";
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">การแจ้งเตือน</h3>
            {unreadCount > 0 && (
              <button
                className="text-sm text-blue-600 hover:text-blue-700"
                onClick={markAllAsRead}
              >
                ทำเครื่องหมายว่าอ่านแล้ว
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    !notification.read ? "bg-blue-50/50" : ""
                  }`}
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <span className="text-xs text-gray-400 mt-1 block">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                ไม่มีการแจ้งเตือน
              </div>
            )}
          </div>

          <div className="p-3 bg-gray-50 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              ดูทั้งหมด
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
