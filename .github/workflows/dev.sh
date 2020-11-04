#!/bin/bash

yarn dev &
pid=$!

sleep 10

kill "$pid"
