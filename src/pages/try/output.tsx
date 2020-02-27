import React, { useState, useEffect, Fragment } from 'react';
import ReactLoading from 'react-loading';
import Loading from 'react-loading';
import styles from './styles.module.css';

const Load = () => (
  <div>
    <ReactLoading type="spin" color="black" /> Loading...
  </div>
);

const ShowOutput = ({ loading, error, ret }) => {
  if (loading) {
    return <Load />;
  } else if (error) {
    return <p>An unkown error occured</p>;
  } else {
    return (
      <Fragment>
        {(() => {
          if (ret.error) {
            return (
              <div className={styles.error}>ANALYSIS WAS NOT SUCCESSFUL</div>
            );
          } else {
            return (
              <div className={styles.success}>ANALYSIS WAS SUCCESSFUL</div>
            );
          }
        })()}
        {ret.stdout && <div>STDOUT: {ret.stdout}</div>}
        {ret.stderr && <div>STDERR: {ret.stderr}</div>}
      </Fragment>
    );
  }
};

export default ({ code }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ret, setRet] = useState(null);

  if (
    typeof window !== 'undefined' &&
    window.fetch &&
    typeof Headers !== undefined
  ) {
    useEffect(() => {
      window.fetchCosette(
        code,
        x => setLoading(x),
        x => setError(x),
        x => setRet(x),
      );
    }, [code]);

    return <ShowOutput loading={loading} ret={ret} error={error} />;
  } else {
    return <p>Your web browser is not compatible with this feature.</p>;
  }
};
