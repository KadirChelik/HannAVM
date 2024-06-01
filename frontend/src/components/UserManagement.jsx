import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser, updateUser, deleteUser } from '../services/UserDataService'; // API fonksiyonlarını import ettik

function UserManagement({isAdmin}) {
  if (!isAdmin) {
    console.log('isAdmin:', isAdmin);
    return (
      <div className='admin-main-container0'>
        <h1>Yetkili değilsiniz!</h1>
      </div>
    )
  }
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAndUpdateUsers();
  }, []);

  const fetchAndUpdateUsers = () => {
    fetchUsers().then(response => {
      setUsers(response.data);
    }).catch(error => {
      console.error('Kullanıcılar alınamadı:', error);
    });
  };

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setSurname(editingUser.surname);
      setEmail(editingUser.email);
      setPassword('');
      setRole(editingUser.role);
    } else {
      setName('');
      setSurname('');
      setEmail('');
      setPassword('');
      setRole('user');
    }
  }, [editingUser]);

  const handleAddUser = () => {
    const newUser = { name, surname, email, password, role };
    addUser(newUser).then(response => {
      setUsers([...users, response.data]);
      setName('');
      setSurname('');
      setEmail('');
      setPassword('');
      setRole('user');
    }).catch(error => {
      console.error('Kullanıcı eklenemedi:', error);
    });
    setTimeout(() => {
      fetchAndUpdateUsers();
    }, 1000);
  };

  const handleEditUser = () => {
    const updatedUser = { name, surname, email, role };
    if (password) {
      updatedUser.password = password;
    }
    updateUser(editingUser._id, updatedUser).then(response => {
      const updatedUsers = users.map(user =>
        user._id === editingUser._id ? response.data : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
      setName('');
      setSurname('');
      setEmail('');
      setPassword('');
      setRole('user');
    }).catch(error => {
      console.error('Kullanıcı güncellenemedi:', error);
    });
    setTimeout(() => {
      fetchAndUpdateUsers();
    }, 1000);
  };

  const handleDeleteUser = (userId) => {
    deleteUser(userId).then(() => {
      setUsers(users.filter(user => user._id !== userId));
    }).catch(error => {
      console.error('Kullanıcı silinemedi:', error);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingUser) {
      handleEditUser();
    } else {
      handleAddUser();
    }
  };

  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
                placeholder={editingUser ? 'Şifreyi güncellemek için girin' : 'Şifre'}
              />
            </div>
            <div>
              <div>Rol</div>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <button className='admin-btn2' type="submit">{editingUser ? 'Güncelle' : 'Ekle'}</button>
        </form>
      </div>
      <div className='admin-container'>
        <h2 className='center-container'>Kullanıcı Listesi</h2>
        <div>
          <input
            type="text"
            className='admin-searcher'
            placeholder="Kullanıcı ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='admin-products-table'>
          <div className='admin-table-headers'>
            <div className='admin-table-header4'>ID</div>
            <div className='admin-table-header7'>İsim</div>
            <div className='admin-table-header7'>Soyisim</div>
            <div className='admin-table-header4'>Email</div>
            <div className='admin-table-header7'>Rol</div>
            <div className='admin-table-header11'>İşlem</div>
          </div>
          <div className='admin-table-list'>
            {filteredUsers.map((user, index) => (
              <div className='admin-table-row' key={index}>
                <div className='admin-table-col4'>{user._id}</div>
                <div className='admin-table-col7'>{user.name}</div>
                <div className='admin-table-col7'>{user.surname}</div>
                <div className='admin-table-col4'>{user.email}</div>
                <div className='admin-table-col7'>{user.role}</div>
                <div className='admin-table-col3'>
                  <div className='admin-product-btn1'>
                    <button className='admin-btn2' onClick={() => setEditingUser(user)}>Güncelle</button>
                    <button className='admin-btn3' onClick={() => handleDeleteUser(user._id)}>Sil</button>
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
