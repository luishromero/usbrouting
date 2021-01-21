FROM pgrouting/pgrouting:10-2.5-2.6.1

ENV POSTGRES_USER=docker
ENV POSTGRES_PASSWORD=docker
ENV POSTGRES_DB=usbrouting

COPY calles.geojson docker-entrypoint-initdb.d/
COPY campus.geojson docker-entrypoint-initdb.d/
COPY init.sh docker-entrypoint-initdb.d/

WORKDIR /docker-entrypoint-initdb.d/

RUN apt-get update -y
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:ubuntugis/ppa
RUN apt-get install -y gdal-bin

# docker build -t usbroutefinderdb .
# docker run -d --name postgresdb -p 5432:5432 usbroutefinderdb
# docker exec -it postgresdb bash
