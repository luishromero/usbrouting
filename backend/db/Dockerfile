FROM pgrouting/pgrouting:10-2.5-2.6.1

ENV POSTGRES_USER=docker
ENV POSTGRES_PASSWORD=docker
ENV POSTGRES_DB=usbrouting

ADD scripts /docker-entrypoint-initdb.d

RUN apt-get update -y
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:ubuntugis/ppa
RUN apt-get install -y gdal-bin
