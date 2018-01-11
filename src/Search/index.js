import React from 'react';

export const Search = ({text, onChange}) => (
  <div>
    <label htmlFor="movement">What are we lifting today?</label>
    <input type="text" id="movement" className='u-full-width' placeholder="Movement"
      value={text}
      onChange={e => onChange(e.target.value) }
    />
  </div>
)
