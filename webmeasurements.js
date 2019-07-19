/*
 * Web Measurements
 * October 2018
 */
(function (f, b) {
    var c = f.createElement(b),
        e = f.getElementsByTagName(b)[0];
    c.src = "https://cdn.dev.lacnic.net/require.js";
    c.type = "text/javascript";
    e.parentNode.insertBefore(c, e);
    c.onload = c.onreadystatechange = function () {
        // Require libraries loaded
        requirejs.config({
            "paths": {
                "stun": "https://rawgit.com/LACNIC/natmeter/59f6bd2860a0c417d8ea7e67d2c6868d93800ed8/stun/app/static/app/js/stun",
            },
        });

        require([], function () {
            // Configuration loaded now, safe to do other require calls
            // that depend on that config.

            const runAutomatically = {

                'default-optin': 'false', // optin=false, in case the *site* hasn't specified anything yet

                'optin=true' : {
                    'default': 'false', // in case the *user* hasn't specified anything yet
                    'userchoice=true' : 'true',
                    'userchoice=false' : 'false'
                },
                'optin=false' : {
                    'default': 'false', // in case the *user* hasn't specified anything yet
                    'userchoice=true' : 'false',
                    'userchoice=false' : 'true'
                },

            };

            const optin = window.localStorage.getItem('webmeasurements.optin') || runAutomatically['default-optin'];
            const userchoice = window.localStorage.getItem('webmeasurements.userchoice') || runAutomatically[`optin=${optin}`]['default'];

            const runExperiment = runAutomatically[`optin=${optin}`][`userchoice=${userchoice}`] === 'true';
            if(!runExperiment)
                return;

            const ripestat = "https://stat.ripe.net";
            const browser = {}; // object to store our information into

            fetch(`${ripestat}/data/whats-my-ip/data.json`).then(
                a => a.json()
            ).then(
                json => {
                    browser.ip = json["data"]["ip"];
                }).then(
                _ => {
                    const f1 = fetch(`${ripestat}/data/geoloc/data.json?resource=${browser.ip}`).then(
                        a => a.json()
                    );
                    const f2 = fetch(`${ripestat}/data/network-info/data.json?resource=${browser.ip}`).then(
                        a => a.json()
                    );

                    const f3 = fetch(`${ripestat}/data/rir/data.json?resource=${browser.ip}`).then(
                        a => a.json()
                    );


                    delete browser.ip; // the IP address won't be used any more

                    Promise.all(
                        [f1, f2, f3]
                    ).then(
                        ([r1, r2, r3]) => {
                            const countries = r1["data"]["locations"].map(cc => cc["country"]);
                            const asns = r2["data"]["asns"].map(asn => Number(asn));
                            const rirs = r3["data"]["rirs"].map(rir => rir["rir"]);

                            const a = JSON.stringify(asns);
                            const ASNs = `"${a}"`;

                            const RIRs = rirs.join(",");

                            fetch(
                                "https://api.webmeasurements.net",
                                {
                                    method: 'POST',
                                    mode: "cors",
                                    headers: new Headers({
                                        'Content-Type': 'text/plain',
                                        'X-Network-Info': ASNs,
                                        'X-Rir-Info': RIRs
                                    })
                                }
                            );

                            return (countries, asns, rirs)
                        }
                    )
                }
            );

            if (Math.random() > 1.0) {

            } else {
                require(['stun'], function (STUN) {
                    STUN.init();
                });
            }
        });
    }
}(document, "script"));
