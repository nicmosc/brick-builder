import React from 'react';


export const SimpleBrick = ({ color }) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 36 26">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-16.000000, -245.000000)" fill={color || '#000000'}>
          <path d="M16,248 L52,248 L52,271 L16,271 L16,248 Z M19,245 L30,245 L30,248 L19,248 L19,245 Z M37,245 L48,245 L48,248 L37,248 L37,245 Z" id="Brick"></path>
        </g>
      </g>
    </svg>
  );
}
