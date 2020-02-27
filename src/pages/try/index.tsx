import React, { useState, useCallback } from 'react';
import Code from './code';
import Output from './output';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

var defaultText = `var n1 = symb_number(n1), n2 = symb_number(n2);

Assume((0 <= n1) and (0 <= n2) and (not (n1 = n2)));

var res = n1 + n2;

Assert((n1 <= res) and (n2 <= res));

var x = symb(x);
Assume(not (typeOf x = Obj));

var tx = typeof(x);
`;

export default function() {
  const [code, setCode] = useState(defaultText);
  const onChange = useCallback((_event, value) => {
    setCode(value);
  }, []);

  return (
    <Layout title="Try">
      <div className={styles.main}>
        <div>
          <Code value={code} onChange={onChange} language="javascript" />
        </div>
        <div className={styles.output}>
          <Output code={code} />
        </div>
      </div>
    </Layout>
  );
}
