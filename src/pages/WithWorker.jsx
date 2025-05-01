import React, { useRef, useState, useEffect } from 'react';
import PrimeWorker from '../worker/prime.worker?worker';
import Spinner from '../components/Spinner';
import '../components/Spinner.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WithWorker() {
  const [primes, setPrimes] = useState([]);
  const [progress, setProgress] = useState(0);
  const [limit, setLimit] = useState(50000);
  const [loading, setLoading] = useState(false);
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new PrimeWorker();
    workerRef.current.onmessage = (e) => {
      if (e.data.progress !== undefined) {
        setProgress(e.data.progress);
      }
      if (e.data.done) {
        setPrimes(e.data.primes);
        setLoading(false);
      }
    };
    return () => workerRef.current.terminate();
  }, []);

  const handleGenerate = () => {
    setProgress(0);
    setPrimes([]);
    setLoading(true);
    workerRef.current.postMessage({ limit });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>With Web Worker</h1>
      <p>The UI remains responsive during prime calculation.</p>
      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
      />
      <button onClick={handleGenerate}>Generate</button>
      {loading && <Spinner />}
      <div>Progress: {progress}%</div>
      <div>Found {primes.length} primes.</div>
      <button onClick={()=>toast.success('Button clicked!')}>Click Me</button>
    </div>
  );
}
