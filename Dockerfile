FROM mcr.microsoft.com/playwright:v1.54.1-jammy

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000
CMD ["yarn", "start:prod"]