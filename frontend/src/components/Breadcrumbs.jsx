import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(null);
  const locationRef = useRef(location.pathname);

  useEffect(() => {
    // Save the previous URL
    if (location.pathname !== locationRef.current) {
      setPrevLocation(locationRef.current);
      locationRef.current = location.pathname;
    }
  }, [location]);

  const pathnames = location.pathname.split('/').filter((x) => x);

  const alternativeNames = {
    'admin': 'Yönetici',
    'kadin': 'Kadın',
    'indirim': 'İndirimdekiler',
    'erkek': 'Erkek',
    'cocuk': 'Çocuk',
    'aksesuar': 'Aksesuar',
    'ic-giyim': 'İç Giyim',
    'tisort': 'Tişört',
    'gomlek': 'Gömlek',
    'tesettur': 'Tesettür',
    'buyuk-beden': 'Büyük Beden',
    'hirka': 'Hırka',
    'ayakkabi': 'Ayakkabı',
    'sort': 'Şort',
    'esofman': 'Eşofman',
    'takim-elbise': 'Takım Elbise',
    'canta': 'Çanta',
    'parfum': 'Parfüm',
    'taki': 'Takı',
    'basortusu': 'Başörtüsü',
    'gunes-gozlugu': 'Güneş Gözlüğü',
    'cuzdan': 'Cüzdan',
    'sapka': 'Şapka',
    'product-management': 'Ürün Yönetimi',
    'order-management': 'Sipariş Yönetimi',
    'user-management': 'Kullanıcı Yönetimi',
    'add-product': 'Ürün Ekle',
    'update-product': 'Ürün Güncelle',
    'product': 'Ürün',
  };

  // Don't show breadcrumbs when navigating from home to product page
  if (prevLocation === '/' && pathnames.includes('product')) {
    return null;
  }

  // When 'product' is in pathnames, use prevLocation if exists
  if (pathnames.includes('product') && prevLocation) {
    const prevPathnames = prevLocation.split('/').filter((x) => x);
    return (
      <nav style={{ "--bs-breadcrumb-divider": "''" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          {prevPathnames.map((name, index) => {
            const routeTo = `/${prevPathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === prevPathnames.length - 1;

            const displayName = alternativeNames[name] || name;

            return (
              <li key={name} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
                {index !== 0 && (
                  <i className="fa-solid fa-angle-right breadcrumb-icon" />
                )}
                <Link to={routeTo}>{displayName}</Link>
              </li>
            );
          })}
          <li key="product" className="breadcrumb-item active">
            <i className="fa-solid fa-angle-right breadcrumb-icon" />
            Ürün
          </li>
        </ol>
      </nav>
    );
  }

  // Don't show breadcrumbs if there's only one path segment
  if (pathnames.length === 1) {
    return null;
  }

  return (
    <nav style={{ "--bs-breadcrumb-divider": "''" }} aria-label="breadcrumb">
      <ol className="breadcrumb">
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          const displayName = alternativeNames[name] || name;

          return (
            <li key={name} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
              {index !== 0 && (
                <i className="fa-solid fa-angle-right breadcrumb-icon" />
              )}
              {isLast ? (
                displayName
              ) : (
                <Link to={routeTo}>{displayName}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
