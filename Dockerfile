# Install the latest Debain operating system.
FROM debian:latest as DEBIAN

# Copy the contents of the current working directory to the
# static-site directory.
COPY ./dist /static-site

# Install NGINX, remove the default NGINX index.html file, and
# copy the built static site files to the NGINX html directory.
FROM nginx:stable-alpine
RUN mv /usr/share/nginx/html/index.html /usr/share/nginx/html/old-index.html
COPY --from=DEBIAN /static-site/ /usr/share/nginx/html/

# Instruct the container to listen for requests on port 80 (HTTP).
EXPOSE 80