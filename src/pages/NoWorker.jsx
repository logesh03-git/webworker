import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import '../components/Spinner.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function isPrime(n) {
  for (let i = 2, sqrt = Math.sqrt(n); i <= sqrt; i++) {
    if (n % i === 0) return false;
  }
  return n > 1;
}

export default function NoWorker() {
  const [primes, setPrimes] = useState([]);
  const [limit, setLimit] = useState(50000);
  const [loading, setLoading] = useState(false);

  const generatePrimes = () => {
    setLoading(true);
    setTimeout(() => {
      const result = [];
      for (let i = 2; i <= limit; i++) {
        if (isPrime(i)) result.push(i);
      }
      setPrimes(result);
      setLoading(false);
    }, 100); // slight delay to allow spinner to show
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Without Web Worker</h1>
      <p>The UI will freeze when generating primes.</p>
      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
      />
      <button onClick={generatePrimes}>Generate</button>
      {loading && <Spinner />}
      <div>Found {primes.length} primes.</div>
      <button onClick={()=>toast.success('Button clicked!')}>Click Me</button>
    </div>
  );
}
