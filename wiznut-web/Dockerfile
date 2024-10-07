#build source
# Stage 1: Install dependencies
FROM harbor.wiznut.com/linkpublic/node:20-alpine AS build-env
WORKDIR /app

COPY . ./

RUN npm ci
RUN npm run build && npm install --only=production --ignore-scripts

# Stage 2: Production image, copy file only needed
FROM harbor.wiznut.com/linkpublic/node:20-alpine AS runner
WORKDIR /app

ARG EXPOSE

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE ${EXPOSE}

COPY --from=build-env /app .
CMD ["npm", "run", "start"]
