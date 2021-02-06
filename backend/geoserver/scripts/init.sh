#!/bin/bash

curl -v -u admin:geoserver -XPOST -H "Content-type: text/xml" -d @workspace.xml http://localhost:8080/geoserver/rest/workspaces
curl -v -u admin:geoserver -XPOST -H "Content-type: text/xml" -d @datastore.xml http://localhost:8080/geoserver/rest/workspaces/usbrouting/datastores

curl -v -u admin:geoserver -XPOST -H "Content-type: text/xml" -d @layercalles.xml http://localhost:8080/geoserver/rest/workspaces/usbrouting/datastores/postgisdb/featuretypes
curl -v -u admin:geoserver -XPOST -H "Content-type: text/xml" -d @sqlviewcalles.xml http://localhost:8080/geoserver/rest/workspaces/usbrouting/datastores/postgisdb/featuretypes

curl -v -u admin:geoserver -XPOST -H "Content-type: text/xml" -d @layervertices.xml http://localhost:8080/geoserver/rest/workspaces/usbrouting/datastores/postgisdb/featuretypes
curl -v -u admin:geoserver -XPOST -H "Content-type: text/xml" -d @sqlviewvertices.xml http://localhost:8080/geoserver/rest/workspaces/usbrouting/datastores/postgisdb/featuretypes

curl -v -u admin:geoserver -XPOST -H "Content-type: text/xml" -d @layercampus.xml http://localhost:8080/geoserver/rest/workspaces/usbrouting/datastores/postgisdb/featuretypes
curl -v -u admin:geoserver -XPOST -H "Content-type: text/xml" -d @sqlviewcampus.xml http://localhost:8080/geoserver/rest/workspaces/usbrouting/datastores/postgisdb/featuretypes
