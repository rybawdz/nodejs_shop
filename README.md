# Project for university course - WEPPO

Full-stack web application - a simple online shop with basic functionalities.


## How to run

`docker-compose up`

## Architecture


|                |SERVICE                          |PORT                       |
|----------------|-------------------------------|-----------------------------|
| backend        |     nodejs + express          |            4040             |
| frontend       |     react + nextjs            |            3000             |
| database       |     MongoDB                   |            27017            |
| db panel       |     mongo express             |            8081             |
| metrics        |     prometheus                |            9090             |
| metrics graphs |     grafana                   |            8080             |


## TODO

 - change credentials (mongodb, me, prom, grafana)
 - change secrets (cookie sign, api)
 - change error messages to not show stack trace
 - add file upload sanitization, consider sanitizning imageUrl as well (path travelsal, extension check, stored xss, command injection)
 - add logging (syslog)
 - tighten cors restrictions
