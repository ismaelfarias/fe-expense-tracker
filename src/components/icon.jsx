import React from 'react';
import './icon.css';
const IconComponent = () => (
    <svg style={styles.Icon}  viewBox="0 0 24 24">
      <path fill="none" d="M0 0h24v24H0z">
      </path>
      <path d="m17 4 4 4-4 4V9h-4V7h4V4zm-7 3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM6 7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm1 10h4v-2H7v-3l-4 4 4 4v-3zm7 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm4 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z">
      </path>
    </svg>
  );
  
  const defaultProps = {
    IconComponent,
  };
  
  const Icon = (props) => {
    return (
      props.IconComponent 
        ? <props.IconComponent style={styles.Icon} /> 
        : <defaultProps.IconComponent />
    );
  };
  
  export default Icon;