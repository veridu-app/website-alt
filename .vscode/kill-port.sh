#!/bin/bash

# Port to check (default: 3000, can be overridden with PORT environment variable)
PORT=${PORT:-3000}

# Check if port is in use
PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
  echo "Port $PORT is free"
  exit 0
else
  echo "Port $PORT is in use by process $PID, killing it..."
  kill -9 $PID
  
  # Wait a moment and verify
  sleep 1
  PID_CHECK=$(lsof -ti:$PORT)
  if [ -z "$PID_CHECK" ]; then
    echo "Port $PORT is now free"
    exit 0
  else
    echo "Failed to free port $PORT"
    exit 1
  fi
fi

