#!/bin/bash

curl -k https://<peserver>:8140/packages/current/install.bash | bash -s -- --puppet-service-ensure stopped --puppet-service-enable false

while true
do
    /opt/puppetlabs/bin/puppet agent --verbose --onetime --no-daemonize --summarize
    sleep 60
done
