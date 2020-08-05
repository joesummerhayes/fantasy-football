import React from 'react';
import { Subtract } from 'utility-types';

interface ChangeColorProp {
  color: string;
}

// Example of a HOC that injects props into a child component. Can use it by wrapping a component in it in the export statement:
// e.g. export default InjectProps(childComponent)

const InjectProps = <T extends ChangeColorProp> (Component: React.ComponentType<T>) => {
  type InjectedProps = Subtract<T, ChangeColorProp>

  return (props: InjectedProps): JSX.Element => (
    <div style={{ backgroundColor: 'red' }}>
      <Component {...props as T} color="yellow" />
    </div>
  );
};

// version returning class component

// const InjectProps = <T extends ChangeColorProp> (Component: React.ComponentType<T>) => {
//   return class extends React.Component<Subtract<T, ChangeColorProp>> {
//     render() {
//       return (
//         <div style={{ backgroundColor: 'red' }}>
//           <Component {...this.props as T} color={'yellow'} />
//         </div>
//       );
//   };
//   }
// };


export default InjectProps;
