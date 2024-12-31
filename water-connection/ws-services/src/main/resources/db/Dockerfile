FROM egovio/flyway:10.7.1

COPY ./migration/ddl /flyway/sql

COPY migrate.sh /usr/bin/migrate.sh

RUN chmod +x /usr/bin/migrate.sh

# Set the working directory to avoid issues with relative paths
WORKDIR /flyway

ENTRYPOINT ["/usr/bin/migrate.sh"]
