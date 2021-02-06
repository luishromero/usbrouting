#!/bin/bash

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    create extension postgis;
    create extension pgrouting;
EOSQL

ogr2ogr -select 'nombre' -lco GEOMETRY_NAME=the_geom -lco FID=id -f PostgreSQL PG:"dbname=usbrouting user=docker" -nln campus campus.geojson
ogr2ogr -select 'nombre, oneway, distancia' -lco GEOMETRY_NAME=the_geom -lco FID=id -f PostgreSQL PG:"dbname=usbrouting user=docker" -nln calles calles.geojson

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    alter table calles add source int4;
    alter table calles add target int4;
    ALTER TABLE calles ALTER COLUMN the_geom TYPE geometry(LineString,4326) USING ST_LineMerge(the_geom);
    select pgr_nodeNetwork('calles',0.00001);
    select pgr_createTopology('calles_noded',0.00001);
    ALTER TABLE calles_noded ADD COLUMN name VARCHAR;
    UPDATE calles_noded AS new SET name=old.nombre FROM calles AS old WHERE new.old_id=old.id;
    ALTER TABLE calles_noded ADD distance FLOAT8;
    UPDATE calles_noded SET distance = ST_Length(ST_Transform(the_geom, 4326)::geography) / 1000;
EOSQL
