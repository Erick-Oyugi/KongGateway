FROM alpine:latest

RUN apk --no-cache add curl
RUN apk add --update python3 && rm -rf /var/cache/apk/*
ADD crontab.txt /crontab.txt
ADD script.sh /script.sh
COPY entry.sh /entry.sh
RUN chmod 755 /script.sh /entry.sh
RUN /usr/bin/crontab /crontab.txt

CMD ["/entry.sh"]