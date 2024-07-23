# Use a imagem oficial do Prometheus
FROM prom/prometheus:latest

# Copie o arquivo de configuração do Prometheus para o contêiner
COPY prometheus.yml /etc/prometheus/prometheus.yml
COPY alerts.rules /etc/prometheus/alerts.rules

# Exponha a porta do Prometheus
EXPOSE 9090

# Comando para rodar o Prometheus
CMD ["--config.file=/etc/prometheus/prometheus.yml"]
