FROM nginx

RUN cd /usr/share/nginx/html/
RUN rm -rf html/
RUN mkdir html

# Install app dependencies
#RUN apk update && apk upgrade

COPY dist/. /usr/share/nginx/html/

# Build app
ENV HOST 0.0.0.0
EXPOSE 1234

