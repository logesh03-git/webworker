// src/worker/prime.worker.js

function isPrime(n) {
    for (let i = 2, sqrt = Math.sqrt(n); i <= sqrt; i++) {
      if (n % i === 0) return false;
    }
    return n > 1;
  }
  
  self.onmessage = function (e) {
    const limit = e.data.limit;
    const primes = [];
    let count = 0;
  
    for (let i = 2; i <= limit; i++) {
      if (isPrime(i)) {
        primes.push(i);
      }
  
      // Send progress every 1000 iterations
      if (i % 1000 === 0 || i === limit) {
        const progress = Math.floor((i / limit) * 100);
        self.postMessage({ progress });
      }
    }
  
    // ✅ Send 'done' message
    self.postMessage({ done: true, primes });
  };
  