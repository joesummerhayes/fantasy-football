import React from 'react';
import Loading from '../components/Loading';

interface WithLoadingProps {
  loading: boolean;
}

const withLoading = <P extends object>(Component: React.ComponentType<P>): React.FC<P & WithLoadingProps> => ({ loading, ...props }): JSX.Element => {
  return (
    loading ? <Loading /> : <Component {...props as P} />
  );
};

export default withLoading;
