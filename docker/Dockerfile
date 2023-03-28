ARG NODEVERSION="19.8.1"

FROM node:${NODEVERSION} AS base

WORKDIR /app

RUN npm init -y && \
    npm install @google/clasp -g && \
    npm install