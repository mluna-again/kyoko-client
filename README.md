# Kyoko client

Simple planning poker clone.

Made with React.

## How to run this client
Clone the repo with
```sh
git clone git@github.com:mluna-again/kyoko-client.git
```

The following ENV variables are used:

	VITE_SERVER_URL
	VITE_SERVER_SOCKET_URL

> Note:
	If you are not running the [server](https://github.com/mluna-again/kyoko) locally with the default ports you need to change these variables to reflect your configuration.

If they are not provided they default to:

	VITE_SERVER_URL=http://localhost:4000
	VITE_SERVER_SOCKET=ws://localhost:4000/socket

Install dependencies:
```sh
npm install
```

> Note:
	You need to start the [server](https://github.com/mluna-again/kyoko) as well along with this step.

Run with:
```sh
npm start
```

## Previews
<img width="2531" target="_blank" alt="shinobu showcase" src="https://raw.githubusercontent.com/mluna711/kyoko-client/master/previews/1.png">
<img width="2531" target="_blank" alt="shinobu showcase" src="https://raw.githubusercontent.com/mluna711/kyoko-client/master/previews/2.png">
<img width="2531" target="_blank" alt="shinobu showcase" src="https://raw.githubusercontent.com/mluna711/kyoko-client/master/previews/3.png">
<img width="2531" target="_blank" alt="shinobu showcase" src="https://raw.githubusercontent.com/mluna711/kyoko-client/master/previews/4.png">
<img width="2531" target="_blank" alt="shinobu showcase" src="https://raw.githubusercontent.com/mluna711/kyoko-client/master/previews/5.png">

# Building with Podman:

This will make a container with a webserver serving the web app. You can (and honestly should) then use nginx as a reverse proxy.
```sh
$ podman image build --build-arg SERVER="<server http url>" --build-arg WEBSOCKET="<server ws url>" -t kyoko-client .

# option 1: podman run
$ podman run --name kyoko-client -d -p 127.0.0.1:8881:80 --restart unless-stopped kyoko-client

# option 2: systemd service
$ cp kyoko.container ~/.config/containers/systemd/
$ systemctl --user daemon-reload
$ systemctl --user start kyoko
```
