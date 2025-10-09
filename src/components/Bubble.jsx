import React from 'react'

export default function Bubble({ visible, left, top, side, username, kind, attempts }) {
  const containerStyle = {
    left,
    top,
    position: 'absolute',
    transform: side === 'above' ? 'translate(-50%, -100%) scale(1.02)' : 'translate(-50%, 0) scale(1.02)',
    transition: 'opacity 180ms cubic-bezier(.2,.9,.2,1), transform 180ms cubic-bezier(.2,.9,.2,1)',
    transformOrigin: 'center bottom',
    overflow: 'visible',
    zIndex: 9999,
  }

  const tailStyle = side === 'above'
    ? { top: '100%', left: '50%', transform: 'translateX(-50%)', width: 14, height: 10, position: 'absolute' }
    : { bottom: -6, left: '50%', transform: 'translateX(-50%)', width: 14, height: 10, position: 'absolute' }

  return (
    <div role="status" aria-hidden={!visible} className={`absolute z-30 pointer-events-none ${visible ? 'opacity-100' : 'opacity-0'}`} style={containerStyle}>
  <div className={`relative rounded-lg px-3 py-2 text-sm font-semibold shadow-lg bg-white/90 dark:bg-white border border-gray-200 dark:border-gray-700 backdrop-blur-md text-black ${visible ? 'animate-pop-fade' : ''}`} style={{ overflow: 'visible', transition: 'transform 160ms cubic-bezier(.2,.9,.2,1)' }}>
        <span className="bubble-text">
          {username}
          <br />
          {kind === 'red' ? (<span className="text-xs font-normal">❌ attempts exhausted</span>) : null}
          {kind === 'green' ? (<span className="text-xs font-normal">✅ {attempts} attempts available</span>) : null}
        </span>
      </div>
      <svg className="absolute text-black dark:text-white" style={tailStyle} viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M0 0 L4 6 L8 0 Z" fill="currentColor" />
      </svg>
    </div>
  )
}
