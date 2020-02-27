async function fetchData(code, setLoading, setError, setRet) {
  setLoading(true);
  setError(false);
  setRet(null);
  const headers = new Headers();
  headers.append('Content-Type', 'text/plain');
  headers.append('Content-Length', code.length.toString());
  try {
    const resp = await fetch('https://cosette.giltho.com/', {
      mode: 'cors',
      method: 'POST',
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

window.fetchCosette = fetchData;
