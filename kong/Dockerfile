FROM kong:3.0.0

# Install the js-pluginserver
USER root
RUN apk add --update nodejs npm python3 make g++ && rm -rf /var/cache/apk/*
# RUN apk add busybox-openrc
RUN npm install --unsafe -g kong-pdk@0.5.3
RUN luarocks install httpclient
RUN luarocks install lua-cjson
RUN echo "*	*	*	*	*	/bin/sh /home/cron-test.sh" >> /var/spool/cron/crontabs/root
COPY test.sh /
RUN ["chmod","+x","/test.sh"]
RUN ["/bin/sh","/test.sh"]
ENV term xterm
RUN apk add --update vim nano
