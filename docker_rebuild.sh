#! /bin/bash
docker build -t node_web .
docker run -p 9000:8080 -it --rm node_web