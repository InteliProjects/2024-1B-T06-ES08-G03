# Prometheus Monitoring Setup

Este repositório contém a configuração do Prometheus para monitoramento e alertas, incluindo os arquivos `prometheus.yml`, `alerts.rules` e um `Dockerfile` para construir a imagem do Prometheus.

## Estrutura do Projeto

- `Dockerfile`: Define a imagem do Prometheus e copia os arquivos de configuração necessários.
- `prometheus.yml`: Arquivo de configuração principal do Prometheus.
- `alerts.rules`: Define regras de alerta para o Prometheus.

## Installation

1. **Clone o repositório:**

   ```sh
   git clone <link_repositorio>
   cd prometheus-monitoring

1. **Construa imagem Docker:**

   docker build -t prometheus-monitoring .


## Running the app

docker run -p 9090:9090 prometheus-monitoring

