import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 500 },
    { duration: '5m', target: 500 },
    { duration: '2m', target: 1000 },
    { duration: '5m', target: 1000 },
    { duration: '2m', target: 1500 },
    { duration: '5m', target: 1500 },
    { duration: '2m', target: 2000 },
    { duration: '5m', target: 2000 },
    { duration: '10m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('http://localhost:3022');

  check(res, {
    'status should be 200': (r) => r.status === 200,
  });

  sleep(1);
}
