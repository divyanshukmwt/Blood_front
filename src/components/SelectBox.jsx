import React, { useState } from 'react';
import { sendMessage } from '../config/Socket';
import { toast } from 'react-toastify';

const SelectBox = ({ option }) => {
  const [selected, setSelected] = useState(null);

  const handleSet = () => {
    if (!selected) return toast.error('Select a timer value first');
    sendMessage('set-delay', selected);
    toast.success(`Delay timer set to ${selected}`);
  };

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', flex: 1 }}>
        {option.map((opt, i) => (
          <button key={i} onClick={() => setSelected(opt)} style={{
            padding: '8px 14px', borderRadius: '8px',
            border: `1.5px solid ${selected === opt ? 'var(--crimson)' : 'var(--border)'}`,
            background: selected === opt ? 'var(--crimson-pale)' : 'var(--ash)',
            color: selected === opt ? 'var(--crimson)' : 'var(--ink)',
            cursor: 'pointer', fontFamily: 'DM Sans', fontWeight: 600, fontSize: '0.85rem',
            transition: 'all 0.2s',
          }}>{opt}</button>
        ))}
      </div>
      <button onClick={handleSet} style={{
        padding: '10px 20px', borderRadius: '8px',
        background: 'var(--crimson)', color: 'white',
        border: 'none', cursor: 'pointer',
        fontFamily: 'DM Sans', fontWeight: 700, fontSize: '0.875rem',
        transition: 'all 0.2s', flexShrink: 0,
      }}>Apply</button>
    </div>
  );
};

export default SelectBox;
