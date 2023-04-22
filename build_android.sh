#!/bin/bash

# Update dependencies
npm install

# Run ionic build
ionic build

# Copy the build to the android project
ionic cap copy android

# Open the android project in Xcode
ionic cap open android