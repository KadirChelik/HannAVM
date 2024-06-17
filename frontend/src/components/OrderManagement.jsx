import React, { useState } from 'react';

const initialOrders = [
  { id: 1, username: "Kadir Çelik", email: "kadir@gmail.com", address: "Isparta/Merkez Modernevler mah. 3104 sk. bina no 17 daire 7", phone: "5324763189", product: 'Ürün Fotoğraf id renk beden', status: 'Sipariş alındı', orderDate: new Date('2024-01-01') },
  { id: 2, username: "Ali Veli", email: "ali@gmail.com", address: "Ankara/Çankaya Atatürk Bulvarı no 123", phone: "5324762121", product: 'Ürün Fotoğraf id renk beden', status: 'Ödeme bekliyor', orderDate: new Date('2024-02-10') },
  { id: 3, username: "Ayşegül Yılmaz", email: "ayse@gmail.com", address: "İstanbul/Beyoğlu İstiklal Cad. no 45", phone: "5314266109", product: 'Ürün Fotoğraf id renk beden', status: 'Kargoya verildi', orderDate: new Date('2024-03-15') },
];

const statuses = [
  'Sipariş alındı',
  'Kargoya verildi',
  'Yolda',
  'Teslim edildi',
  'Ödeme bekliyor',
  'İptal edildi',
];

const OrderManagement = ({ isAdmin }) => {
  if (!isAdmin) {
    console.log('isAdmin:', isAdmin);
    return (
      <div className='admin-main-container0'>
        <h1>Yetkili değilsiniz!</h1>
      </div>
    );
  }
  
  const [orders, setOrders] = useState(initialOrders);
  const [pendingChanges, setPendingChanges] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleStatusChange = (id, newStatus) => {
    setPendingChanges((prevChanges) => ({
      ...prevChanges,
      [id]: newStatus,
    }));
  };

  const handleUpdate = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        pendingChanges[order.id]
          ? { ...order, status: pendingChanges[order.id] }
          : order
      )
    );
    setPendingChanges({});
    setShowAlert(true);
    setAlertMessage('Değişiklikler başarıyla kaydedildi.');
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleCancel = () => {
    setPendingChanges({});
    setShowAlert(true);
    setAlertMessage('Değişiklikler iptal edildi.');
    setTimeout(() => setShowAlert(false), 3000);
  };

  const filteredOrders = orders.filter(order =>
    filterStatus ? order.status === filterStatus : true
  );

  return (
    <div className='admin-container'>
      <h1>Sipariş Yönetimi</h1>
      {showAlert && <div className="alert">{alertMessage}</div>}
      <div className="admin-order-filter">
        <div>Duruma göre filtrele</div>
        <select
          className='admin-status-select1'
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Tümü</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className='admin-products-table'>
        <div className='admin-table-headers'>
          <div className='admin-table-header1'>ID</div>
          <div className='admin-table-header2'>İsim Soyisim</div>
          <div className='admin-table-header9'>Email</div>
          <div className='admin-table-header7'>Adres</div>
          <div className='admin-table-header2'>Telefon</div>
          <div className='admin-table-header7'>Ürün</div>
          <div className='admin-table-header2'>Tarih</div>
          <div className='admin-table-header8'>Durum Güncelle</div>
        </div>
        <div className='admin-table-list'>
          {filteredOrders.map((order) => (
            <div className='admin-table-row' key={order.id}>
              <div className='admin-table-col1'>{order.id}</div>
              <div className='admin-table-col2'>{order.username}</div>
              <div className='admin-table-col9'>{order.email}</div>
              <div className='admin-table-col7'>{order.address}</div>
              <div className='admin-table-col2'>{order.phone}</div>
              <div className='admin-table-col7'>{order.product}</div>
              <div className='admin-table-col2'>
                {order.orderDate instanceof Date ? order.orderDate.toLocaleDateString() : 'Geçersiz Tarih'}
              </div>
              <div className='admin-table-col8'>
                <select
                  className='admin-status-select'
                  value={pendingChanges[order.id] || order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='admin-order-buttons'>
        <button className='admin-btn7' onClick={handleUpdate}>Güncelle</button>
        <button className='admin-btn6' onClick={handleCancel}>İptal</button>
      </div>
    </div>
  );
};

export default OrderManagement;
