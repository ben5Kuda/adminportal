FROM alpine:latest

# update alpine linux
RUN apk update && apk upgrade && \ 
    apk add nodejs && \
    apk add nodejs-npm && \
    npm install -g @angular/cli@7.2.2

# add source code to images
ADD . /app

# switch working directory
WORKDIR /app

# install dependencies
RUN npm install && \
    npm run build --prod

# expose port 4200
EXPOSE 4200 

# run ng serve on localhost
CMD ["ng","serve", "--host", "0.0.0.0", "--disable-host-check"] 