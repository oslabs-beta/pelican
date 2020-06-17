FROM node:12.18
RUN apt-get update && apt-get install -y \ 
  curl
RUN curl -o aws-iam-authenticator https://amazon-eks.s3.us-west-2.amazonaws.com/1.16.8/2020-04-16/bin/linux/amd64/aws-iam-authenticator \
  && chmod +x ./aws-iam-authenticator && mkdir -p ./bin \ 
  && cp ./aws-iam-authenticator ./bin/aws-iam-authenticator \ 
  && export PATH=$PATH:./bin && echo 'export PATH=$PATH:$HOME/bin' >> ~/.bashrc
WORKDIR usr/src/app
COPY . .
# ENV NODE_ENV production
RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["node", "./server/server.js"]

