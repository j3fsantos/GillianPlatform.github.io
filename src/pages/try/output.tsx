import React, { useState, useEffect, Fragment } from 'react';
import ReactLoading from 'react-loading';
import Loading from 'react-loading';
import styles from './styles.module.css';

const Load = () => <div>
  <ReactLoading type="spin" color="black" /> Loading...
</div>

const ShowOutput = ({ loading, error, ret }) => {
  if (loading) {
    return <Load/>
  } else if (error) {
    return <p>An unkown error occured</p>
  } else {
    return <Fragment>
      {
        (() => {
          if (ret.error) {
            return <div className={styles.error}>ANALYSIS WAS NOT SUCCESSFULL</div>
          } else {
            return <div className={styles.success}>ANALYSIS WAS SUCCESSFULL</div>
          }
        })()
      }
      {
        ret.stdout && <div>STDOUT: {ret.stdout}</div>
      }
      {
        ret.stderr && <div>STDERR: {ret.stderr}</div>
      }
    </Fragment>
  }
}

export default function ({ code }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ret, setRet] = useState(null);

  function reloading() {
    setLoading(true);
    setError(false);
    setRet(null);
  }

  const headers = new Headers();
  headers.append("Content-Type", "text/plain");
  headers.append("Content-Length", code.length.toString());

  useEffect(() => {
    async function fetchData() {
      reloading();
      try {
        const resp = await fetch("https://cosette.giltho.com/", {
          mode : 'cors',
          method: "POST",
          body: code,
          headers,
        });
        if (resp.status != 200) {
          setError(true);
          setLoading(false);
        } else {
          const ret = await resp.json();
          setRet(ret);
          setLoading(false);
        }
      } catch {
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, [code]);

  if (window.fetch) {
    return <ShowOutput loading={loading} ret={ret} error={error}/>
  } else {
    return <p>Your web browser is not compatible with this feature.</p>
  }
  
}