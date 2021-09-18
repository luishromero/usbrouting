## USB ROUTE FINDER

This tool allows the [Simón Bolivar University's](https://es.wikipedia.org/wiki/Universidad_Sim%C3%B3n_Bol%C3%ADvar_(Venezuela)) Students to find the best route inside the campus to go from one point to other. It is very useful to new students who are not familiarized with the location of the buildings inside de campus.

This app was inspired by the solution proposed by [thegisdev](https://github.com/thegisdev/leaflet-pgrouting-geoserver).

### Containerization

This web application has been dockerized, here you will find the correspondent docker compose file in the root folder, from there, run the following command:

```
docker-compose up -d
```

For stop the services, run:

```
docker-compose down
```

The web application is now available in localhost:8181/comollegousb.html

#### Workarround

After de docker compose is up and running, you will have to access to the geoserver container and populate it with the necessary datastore and layers with the following commands:

```
docker exec -it usb-routing_geoserverusb_1 bash
cd /scripts
./init.sh
```
