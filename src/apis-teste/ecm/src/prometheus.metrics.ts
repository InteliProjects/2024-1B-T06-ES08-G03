import * as client from 'prom-client';
import axios from 'axios';
import { GlobalState } from './globalState';

// Configurar métricas padrão
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 } as any);

// Contador de requisições HTTP
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

// Histograma de duração das requisições
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route'],
  buckets: [50, 100, 200, 300, 400, 500, 750, 1000, 2000, 3000, 4000, 5000],
});

async function monitorAlerts() {
  setInterval(async () => {
    try {
      const response = await axios.get('http://prometheus:9090/api/v1/alerts');
      const alerts = response.data.data.alerts;

      const highRequestRateAlert = alerts.find(alert => alert.labels.alertname === 'HighRequestRate');

      if (highRequestRateAlert) {
        GlobalState.getInstance().setScaleFactor(0.5); // Reduce processing time by half
      } else {
        GlobalState.getInstance().setScaleFactor(1); // Reset to normal processing time
      }
    } catch (error) {
      console.error('Error fetching alerts from Prometheus:', error);
    }
  }, 10000); // Check every 30 seconds
}

monitorAlerts();

export { httpRequestCounter, httpRequestDurationMicroseconds, client };
