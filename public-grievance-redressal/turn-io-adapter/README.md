
# Turn-io-adapter Service

 Turn-io-adapter service creates complaint and transforms the data to pgr service. keeps tracks of the complaints.

### DB UML Diagram

NA

### Service Dependencies

- user
- ID-GEN
- rainmaker-pgr
- MDMS
- Location
- localisation

### Swagger API Contract

NA

## Service Details

Creates Complaint and transform the data from pgr.

### API Details

- transform - The transform API's can be used to create and read the data from the another service.

### Kafka Consumers

NA

### Kafka Producers

NA

***LTS UPGRADE***

Under LTS upgrade the changes are done in some dependencies version and some unused dependencies are removed.
Below are the dependencies in which changes are done.

1. artifact id updated to 1.0.2-SNAPSHOT from 1.0.1-SNAPSHOT
2. spring boot starter parent version upgraded from 2.2.6.RELEASE to 3.2.2
3. tracer version updated to 2.9.0-SNAPSHOT from 2.0.0-SNAPSHOT.
4. mdms client version updated to 2.9.0-SNAPSHOT from 0.0.2-SNAPSHOT.
5. Junit dependency added and the version used is 4.13.2
6. Removed httpclient, velocity and velocity-tool dependencies.


