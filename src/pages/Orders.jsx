import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, Plus, Eye, Edit2, Trash2, X, Search, Filter, 
  Download, Calendar, IndianRupee, Package, User, MapPin, 
  Phone, Mail, CheckCircle, Clock, AlertCircle, Truck
} from "lucide-react";
import { useToast } from "../contexts/ToastContext";

const Orders = () => {
  const { showSuccess, showError } = useToast();
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      customerName: "Rajesh Kumar",
      customerPhone: "+91 98765 43210",
      customerEmail: "rajesh@example.com",
      customerAddress: "123 MG Road, Mumbai, Maharashtra 400001",
      items: [
        { id: 1, name: "Smartphone", quantity: 2, price: 25000, gst: 18 },
        { id: 2, name: "Headphones", quantity: 1, price: 5000, gst: 18 }
      ],
      status: "pending",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-20",
      paymentMethod: "UPI",
      notes: "Urgent delivery required"
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      customerName: "Priya Sharma",
      customerPhone: "+91 87654 32109",
      customerEmail: "priya@example.com",
      customerAddress: "456 Park Street, Delhi, Delhi 110001",
      items: [
        { id: 3, name: "Laptop", quantity: 1, price: 65000, gst: 18 }
      ],
      status: "processing",
      orderDate: "2024-01-14",
      deliveryDate: "2024-01-19",
      paymentMethod: "Credit Card",
      notes: ""
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAddingOrder, setIsAddingOrder] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [newOrder, setNewOrder] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    items: [{ name: "", quantity: 1, price: 0, gst: 18 }],
    deliveryDate: "",
    paymentMethod: "Cash",
    notes: ""
  });

  const orderStatuses = [
    { id: "pending", name: "Pending", color: "yellow", icon: Clock },
    { id: "processing", name: "Processing", color: "blue", icon: Package },
    { id: "shipped", name: "Shipped", color: "purple", icon: Truck },
    { id: "delivered", name: "Delivered", color: "green", icon: CheckCircle },
    { id: "cancelled", name: "Cancelled", color: "red", icon: AlertCircle }
  ];

  const paymentMethods = ["Cash", "UPI", "Credit Card", "Debit Card", "Net Banking", "Cheque"];

  const calculateItemTotal = (item) => {
    const baseAmount = item.quantity * item.price;
    const gstAmount = (baseAmount * item.gst) / 100;
    return baseAmount + gstAmount;
  };

  const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleAddOrder = () => {
    setIsAddingOrder(true);
    setSelectedOrder(null);
    setNewOrder({
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      customerAddress: "",
      items: [{ name: "", quantity: 1, price: 0, gst: 18 }],
      deliveryDate: "",
      paymentMethod: "Cash",
      notes: ""
    });
    setIsModalOpen(true);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsAddingOrder(false);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    showSuccess(`Order status updated to ${newStatus}`);
  };

  const handleDeleteOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (window.confirm(`Delete order ${order?.orderNumber}?`)) {
      setOrders(orders.filter(o => o.id !== orderId));
      showSuccess("Order deleted successfully");
    }
  };

  const addOrderItem = () => {
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { name: "", quantity: 1, price: 0, gst: 18 }]
    });
  };

  const removeOrderItem = (index) => {
    if (newOrder.items.length > 1) {
      setNewOrder({
        ...newOrder,
        items: newOrder.items.filter((_, i) => i !== index)
      });
    }
  };

  const updateOrderItem = (index, field, value) => {
    const updatedItems = newOrder.items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setNewOrder({ ...newOrder, items: updatedItems });
  };

  const handleSaveOrder = () => {
    if (!newOrder.customerName || !newOrder.customerPhone || newOrder.items.some(item => !item.name || item.price <= 0)) {
      showError("Please fill all required fields");
      return;
    }

    const orderData = {
      id: Math.max(...orders.map(o => o.id)) + 1,
      orderNumber: `ORD-2024-${String(orders.length + 1).padStart(3, '0')}`,
      ...newOrder,
      status: "pending",
      orderDate: new Date().toISOString().split('T')[0]
    };

    setOrders([orderData, ...orders]);
    setIsModalOpen(false);
    showSuccess("Order created successfully!");
  };

  const exportOrders = () => {
    const headers = ['Order Number', 'Customer', 'Phone', 'Total Amount', 'Status', 'Order Date'];
    const csvData = filteredOrders.map(order => [
      order.orderNumber,
      order.customerName,
      order.customerPhone,
      `₹${calculateOrderTotal(order.items).toLocaleString('en-IN')}`,
      order.status,
      order.orderDate
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders_export.csv';
    a.click();
    showSuccess('Orders exported successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            label: "Total Orders", 
            value: orders.length, 
            icon: ShoppingCart, 
            color: "indigo",
            change: "+12%" 
          },
          { 
            label: "Pending Orders", 
            value: orders.filter(o => o.status === 'pending').length, 
            icon: Clock, 
            color: "yellow",
            change: "+5%" 
          },
          { 
            label: "Processing", 
            value: orders.filter(o => o.status === 'processing').length, 
            icon: Package, 
            color: "blue",
            change: "+8%" 
          },
          { 
            label: "Total Revenue", 
            value: `₹${orders.reduce((sum, order) => sum + calculateOrderTotal(order.items), 0).toLocaleString('en-IN')}`, 
            icon: IndianRupee, 
            color: "green",
            change: "+15%" 
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              stat.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
              stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
              stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
              'bg-green-100 text-green-600'
            }`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
            <div className="flex items-end justify-between mt-1">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Order Management</h2>
              <p className="text-gray-500">Track and manage customer orders</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddOrder}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
              >
                <Plus size={18} />
                New Order
              </motion.button>
              
              <button
                onClick={exportOrders}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
              >
                <Download size={18} />
                Export
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search orders, customers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="border border-gray-200 rounded-xl px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-100 outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              {orderStatuses.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
            
            <div className="text-sm text-gray-500 flex items-center">
              Showing {currentOrders.length} of {filteredOrders.length} orders
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Order Details</th>
                <th className="px-6 py-4">Customer Info</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentOrders.length > 0 ? currentOrders.map((order) => {
                const status = orderStatuses.find(s => s.id === order.status);
                const StatusIcon = status?.icon || Clock;
                
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{order.orderNumber}</div>
                        <div className="text-xs text-gray-500">{order.items.length} items</div>
                        <div className="text-xs text-blue-600">{order.paymentMethod}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-1">
                          <User size={14} />
                          {order.customerName}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Phone size={12} />
                          {order.customerPhone}
                        </div>
                        {order.customerEmail && (
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail size={12} />
                            {order.customerEmail}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        ₹{calculateOrderTotal(order.items).toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-500">
                        Inc. GST
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border-0 bg-${status?.color}-100 text-${status?.color}-700 focus:ring-2 focus:ring-${status?.color}-200 outline-none`}
                        >
                          {orderStatuses.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-xs text-gray-500">Ordered</div>
                        <div className="font-medium">{order.orderDate}</div>
                        {order.deliveryDate && (
                          <>
                            <div className="text-xs text-gray-500 mt-1">Delivery</div>
                            <div className="font-medium">{order.deliveryDate}</div>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="View Order"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <ShoppingCart className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">No orders found matching your criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-6 border-t flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} results
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg ${
                      currentPage === page
                        ? 'bg-indigo-600 text-white'
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      {isAddingOrder ? 'Create New Order' : `Order ${selectedOrder?.orderNumber}`}
                    </h3>
                    <p className="text-indigo-100 text-sm">
                      {isAddingOrder ? 'Add customer details and items' : 'Order details and information'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {isAddingOrder ? (
                  /* Add Order Form */
                  <form onSubmit={(e) => { e.preventDefault(); handleSaveOrder(); }} className="space-y-6">
                    {/* Customer Information */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                          <input
                            type="text"
                            required
                            value={newOrder.customerName}
                            onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Enter customer name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            value={newOrder.customerPhone}
                            onChange={(e) => setNewOrder({...newOrder, customerPhone: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={newOrder.customerEmail}
                            onChange={(e) => setNewOrder({...newOrder, customerEmail: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="customer@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                          <select
                            value={newOrder.paymentMethod}
                            onChange={(e) => setNewOrder({...newOrder, paymentMethod: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                          >
                            {paymentMethods.map(method => (
                              <option key={method} value={method}>{method}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                        <textarea
                          value={newOrder.customerAddress}
                          onChange={(e) => setNewOrder({...newOrder, customerAddress: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                          rows="3"
                          placeholder="Enter complete delivery address"
                        />
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">Order Items</h4>
                        <button
                          type="button"
                          onClick={addOrderItem}
                          className="flex items-center gap-2 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                        >
                          <Plus size={16} />
                          Add Item
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {newOrder.items.map((item, index) => (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                              <input
                                type="text"
                                required
                                value={item.name}
                                onChange={(e) => updateOrderItem(index, 'name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Enter product name"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                              <input
                                type="number"
                                min="1"
                                required
                                value={item.quantity}
                                onChange={(e) => updateOrderItem(index, 'quantity', parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                required
                                value={item.price}
                                onChange={(e) => updateOrderItem(index, 'price', parseFloat(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                              />
                            </div>
                            <div className="flex items-end">
                              {newOrder.items.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeOrderItem(index)}
                                  className="w-full px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                >
                                  <Trash2 size={16} className="mx-auto" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 p-4 bg-indigo-50 rounded-xl">
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            Total Amount: ₹{calculateOrderTotal(newOrder.items).toLocaleString('en-IN')}
                          </p>
                          <p className="text-sm text-gray-500">Including GST</p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expected Delivery Date</label>
                        <input
                          type="date"
                          value={newOrder.deliveryDate}
                          onChange={(e) => setNewOrder({...newOrder, deliveryDate: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                        <textarea
                          value={newOrder.notes}
                          onChange={(e) => setNewOrder({...newOrder, notes: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                          rows="3"
                          placeholder="Any special instructions..."
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6 border-t">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-lg"
                      >
                        Create Order
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  /* View Order Details */
                  selectedOrder && (
                    <div className="space-y-6">
                      {/* Order Header */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Order Number:</span>
                              <span className="font-medium">{selectedOrder.orderNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Order Date:</span>
                              <span className="font-medium">{selectedOrder.orderDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Delivery Date:</span>
                              <span className="font-medium">{selectedOrder.deliveryDate || 'Not set'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Payment Method:</span>
                              <span className="font-medium">{selectedOrder.paymentMethod}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Customer Details</h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <User size={16} className="text-gray-400" />
                              <span className="font-medium">{selectedOrder.customerName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone size={16} className="text-gray-400" />
                              <span>{selectedOrder.customerPhone}</span>
                            </div>
                            {selectedOrder.customerEmail && (
                              <div className="flex items-center gap-2">
                                <Mail size={16} className="text-gray-400" />
                                <span>{selectedOrder.customerEmail}</span>
                              </div>
                            )}
                            <div className="flex items-start gap-2">
                              <MapPin size={16} className="text-gray-400 mt-1" />
                              <span className="text-sm">{selectedOrder.customerAddress}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left">Product</th>
                                <th className="px-4 py-3 text-center">Quantity</th>
                                <th className="px-4 py-3 text-right">Unit Price</th>
                                <th className="px-4 py-3 text-right">GST</th>
                                <th className="px-4 py-3 text-right">Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {selectedOrder.items.map((item, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-3 font-medium">{item.name}</td>
                                  <td className="px-4 py-3 text-center">{item.quantity}</td>
                                  <td className="px-4 py-3 text-right">₹{item.price.toLocaleString('en-IN')}</td>
                                  <td className="px-4 py-3 text-right">{item.gst}%</td>
                                  <td className="px-4 py-3 text-right font-semibold">
                                    ₹{calculateItemTotal(item).toLocaleString('en-IN')}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot className="bg-gray-50">
                              <tr>
                                <td colSpan="4" className="px-4 py-3 text-right font-semibold">Grand Total:</td>
                                <td className="px-4 py-3 text-right font-bold text-lg">
                                  ₹{calculateOrderTotal(selectedOrder.items).toLocaleString('en-IN')}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>

                      {/* Notes */}
                      {selectedOrder.notes && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Notes</h4>
                          <p className="text-gray-600 bg-gray-50 p-4 rounded-xl">{selectedOrder.notes}</p>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;