import React from 'react';

// Simple Higher order component that take a component and enhances it by turning the background red.

const makeRed = <T extends {}> (Component: React.ComponentType<T>) => {
  return (props: T) => (
    <div style={{ backgroundColor: 'red' }}>
      <Component {...props} />
    </div>
  );
};

// Version where you have to pass a colour into the newly created component

// const makeRed = <T extends ChangeColorProp> (Component: React.ComponentType<T>) => {
//   return (props: T): JSX.Element => {
//     const { color } = props;
//     return (
//       <div style={{ backgroundColor: color }}>
//         <Component {...props} />
//       </div>
//     );
//   };
// };

export default makeRed;
