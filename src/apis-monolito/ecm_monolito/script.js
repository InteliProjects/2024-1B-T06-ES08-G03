import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 150,
  duration: '30s',
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
