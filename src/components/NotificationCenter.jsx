import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Product Added',
      message: 'Wireless Headphones added successfully',
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Stock Alert',
      message: '5 products are running low on stock',
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'New features available in dashboard',
      timestamp: new Date().toISOString(),
      read: true
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-green-600" size={20} />;
      case 'warning': return <AlertTriangle className="text-orange-600" size={20} />;
      case 'error': return <AlertCircle className="text-red-600" size={20} />;
      default: return <Info className="text-blue-600" size={20} />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-orange-50 border-orange-200';
      case 'error': return 'bg-red-50 border-red-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-50"
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-indigo-600 hover:text-indigo-700"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {getIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 text-sm">
                            {notification.title}
                          </p>
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 rounded"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          {notification.message}
                        </p>
                        <p className="text-gray-400 text-xs mt-2">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="mt-2 text-xs text-indigo-600 hover:text-indigo-700"
                      >
                        Mark as read
                      </button>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <Bell className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-gray-500">No notifications</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;