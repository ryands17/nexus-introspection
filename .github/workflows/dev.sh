#!/bin/bash

yarn dev &
pid=$!

sleep 15

kill "$pid"
