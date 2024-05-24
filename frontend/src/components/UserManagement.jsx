import React, { useState, useEffect } from 'react';

function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "Kadir", surname: "Çelik", email: "kadir@gmail.com", address: "Isparta/Merkez Modernevler mah. 3104 sk. bina no 17 daire 7", phone: "5324763189", password: "12345" },
    { id: 2, name: "Ali", surname: "Veli", email: "ali@gmail.com", address: "Ankara/Çankaya Atatürk Bulvarı no 123", phone: "5324762121", password: "12345" },
    { id: 3, name: "Ayşe", surname: "Yılmaz", email: "ayse@gmail.com", address: "İstanbul/Beyoğlu İstiklal Cad. no 45", phone: "5314266109", password: "12345" },
  ]);
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setSurname(editingUser.surname);
      setEmail(editingUser.email);
      setAddress(editingUser.address);
      setPhone(editingUser.phone);
      setPassword(editingUser.password);
    } else {
      setName('');
      setSurname('');
      setEmail('');
      setAddress('');
      setPhone('');
      setPassword('');
    }
  }, [editingUser]);

  const handleAddUser = () => {
    const newUser = { id: users.length + 1, name, surname, email, address, phone, password };
    setUsers([...users, newUser]);
    setName('');
    setSurname('');
    setEmail('');
    setAddress('');
    setPhone('');
    setPassword('');
  };

  const handleEditUser = () => {
    const updatedUsers = users.map(user =>
      user.id === editingUser.id ? { ...user, name, surname, email, address, phone, password } : user
    );
    setUsers(updatedUsers);
    setEditingUser(null);
    setName('');
    setSurname('');
    setEmail('');
    setAddress('');
    setPhone('');
    setPassword('');
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingUser) {
      handleEditUser();
    } else {
      handleAddUser();
    }
  };

  return (
    <div className='admin-container'>
      <h1>Kullanıcı Yönetimi</h1>
      <div>
        <div className='center-container'><h2>{editingUser ? 'Kullanıcı Düzenle' : 'Kullanıcı Ekle'}</h2></div>
        <form className='admin-user-addupdate' onSubmit={handleSubmit}>
          <div>
          <div>
            <div>İsim</div>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div>
            <div>Soyisim</div>
            <input 
              type="text" 
              value={surname} 
              onChange={(e) => setSurname(e.target.value)} 
              required 
            />
          </div>
          </div>
          <div>
          <div>
            <div>Email</div>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <div>Şifre</div>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          </div>
          <div>
          <div>
            <div>Adres</div>
            <input 
              type="text" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              required 
            />
          </div>
          <div>
            <div>Telefon</div>
            <input 
              type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>
          </div>
          <button className='admin-btn2' type="submit">{editingUser ? 'Güncelle' : 'Ekle'}</button>
        </form>
      </div>
      <div className='admin-container'>
        <h2 className='center-container'>User List</h2>
        <div className='admin-products-table'>
          <div className='admin-table-headers'>
              <div className='admin-table-header1'>ID</div>
              <div className='admin-table-header1'>İsim</div>
              <div className='admin-table-header1'>Soyisim</div>
              <div className='admin-table-header9'>Email</div>
              <div className='admin-table-header3'>Şifre</div>
              <div className='admin-table-header4'>Adres</div>
              <div className='admin-table-header3'>Telefon</div>
              <div className='admin-table-header6'>İşlem</div>
          </div>
          <div className='admin-table-list'>
            {users.map(user => (
              <div className='admin-table-row' key={user.id}>
                <div className='admin-table-col1'>{user.id}</div>
                <div className='admin-table-col1'>{user.name}</div>
                <div className='admin-table-col1'>{user.surname}</div>
                <div className='admin-table-col9'>{user.email}</div>
                <div className='admin-table-col3'>{user.password}</div>
                <div className='admin-table-col4'>{user.address}</div>
                <div className='admin-table-col3'>{user.phone}</div>
                <div className='admin-table-col6'>
                <div className='admin-product-btn1'>
                  <button className='admin-btn2' onClick={() => setEditingUser(user)}>Güncelle</button>
                  <button className='admin-btn3' onClick={() => handleDeleteUser(user.id)}>Sil</button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
