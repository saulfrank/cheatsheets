# Install Cockroachdb
UI admin local:  http://localhost:26256

```shell script
# install
brew install cockroachdb/tap/cockroach
Connect insecure using root, no password and import test database:
cockroach workload init movr 'postgresql://root@localhost:26257?sslmode=disable'

```