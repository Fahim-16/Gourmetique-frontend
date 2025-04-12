import React, { useState } from 'react';
import Restaurant_Nav from './Restaurant_Nav';

const Menu = () => {
  const [starters, setStarters] = useState([]);
  const [mainCourses, setMainCourses] = useState([]);
  const [desserts, setDesserts] = useState([]);

  const [si, setSi] = useState('');
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');

  const [mcSi, setMcSi] = useState('');
  const [mcItem, setMcItem] = useState('');
  const [mcPrice, setMcPrice] = useState('');

  const [dsSi, setDsSi] = useState('');
  const [dsItem, setDsItem] = useState('');
  const [dsPrice, setDsPrice] = useState('');

  const handleAddStarter = () => {
    if (!si || !item || !price) {
      alert('Please fill all starter fields');
      return;
    }
    setStarters([...starters, { si, item, price }]);
    setSi(''); setItem(''); setPrice('');
  };

  const handleAddMainCourse = () => {
    if (!mcSi || !mcItem || !mcPrice) {
      alert('Please fill all main course fields');
      return;
    }
    setMainCourses([...mainCourses, { si: mcSi, item: mcItem, price: mcPrice }]);
    setMcSi(''); setMcItem(''); setMcPrice('');
  };

  const handleAddDessert = () => {
    if (!dsSi || !dsItem || !dsPrice) {
      alert('Please fill all dessert fields');
      return;
    }
    setDesserts([...desserts, { si: dsSi, item: dsItem, price: dsPrice }]);
    setDsSi(''); setDsItem(''); setDsPrice('');
  };

  const sidebarStyle = {
    width: '250px',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'white',
    padding: '10px 10px 10px 250px',
  };

  const cardStyle = {
    height: "100%",
    width: "800px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    overflowY: "auto",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };

  const sectionStyle = {
    marginBottom: '40px'
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <Restaurant_Nav />
      </div>

      {/* Main Content */}
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1>MENU</h1>

          {/* STARTERS */}
          <div style={sectionStyle}>
            <h2>STARTERS</h2>
            <table border="1" cellPadding="10" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>SI</th>
                  <th>ITEM</th>
                  <th>PRICE (Rs)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="number" value={si} onChange={(e) => setSi(e.target.value)} /></td>
                  <td><input type="text" value={item} onChange={(e) => setItem(e.target.value)} /></td>
                  <td><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></td>
                </tr>
              </tbody>
            </table>
            <input type="submit" value="Add Starter" onClick={handleAddStarter} style={{ marginTop: '10px' }} />
            {starters.length > 0 && (
              <>
                <h4 style={{ marginTop: '20px' }}>Starter Items</h4>
                <table border="1" cellPadding="10" style={{ width: '100%' }}>
                  <thead>
                    <tr><th>SI</th><th>ITEM</th><th>PRICE</th></tr>
                  </thead>
                  <tbody>
                    {starters.map((s, i) => (
                      <tr key={i}>
                        <td>{s.si}</td>
                        <td>{s.item}</td>
                        <td>{s.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>

          {/* MAIN COURSE */}
          <div style={sectionStyle}>
            <h2>MAIN COURSE</h2>
            <table border="1" cellPadding="10" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>SI</th>
                  <th>ITEM</th>
                  <th>PRICE (Rs)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="number" value={mcSi} onChange={(e) => setMcSi(e.target.value)} /></td>
                  <td><input type="text" value={mcItem} onChange={(e) => setMcItem(e.target.value)} /></td>
                  <td><input type="number" value={mcPrice} onChange={(e) => setMcPrice(e.target.value)} /></td>
                </tr>
              </tbody>
            </table>
            <input type="submit" value="Add Main Course" onClick={handleAddMainCourse} style={{ marginTop: '10px' }} />
            {mainCourses.length > 0 && (
              <>
                <h4 style={{ marginTop: '20px' }}>Main Course Items</h4>
                <table border="1" cellPadding="10" style={{ width: '100%' }}>
                  <thead>
                    <tr><th>SI</th><th>ITEM</th><th>PRICE</th></tr>
                  </thead>
                  <tbody>
                    {mainCourses.map((m, i) => (
                      <tr key={i}>
                        <td>{m.si}</td>
                        <td>{m.item}</td>
                        <td>{m.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>

          {/* DESSERTS */}
          <div style={sectionStyle}>
            <h2>DESSERTS</h2>
            <table border="1" cellPadding="10" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>SI</th>
                  <th>ITEM</th>
                  <th>PRICE (Rs)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="number" value={dsSi} onChange={(e) => setDsSi(e.target.value)} /></td>
                  <td><input type="text" value={dsItem} onChange={(e) => setDsItem(e.target.value)} /></td>
                  <td><input type="number" value={dsPrice} onChange={(e) => setDsPrice(e.target.value)} /></td>
                </tr>
              </tbody>
            </table>
            <input type="submit" value="Add Dessert" onClick={handleAddDessert} style={{ marginTop: '10px' }} />
            {desserts.length > 0 && (
              <>
                <h4 style={{ marginTop: '20px' }}>Dessert Items</h4>
                <table border="1" cellPadding="10" style={{ width: '100%' }}>
                  <thead>
                    <tr><th>SI</th><th>ITEM</th><th>PRICE</th></tr>
                  </thead>
                  <tbody>
                    {desserts.map((d, i) => (
                      <tr key={i}>
                        <td>{d.si}</td>
                        <td>{d.item}</td>
                        <td>{d.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Menu;
