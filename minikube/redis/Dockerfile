FROM redis:5.0.7-alpine
#RUN mkdir /data
WORKDIR /data
COPY redis.conf /usr/local/etc/redis/redis.conf
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]