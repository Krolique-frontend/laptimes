export default class Socket {
    constructor() {
        // this.url = 'ws://localhost:3001/'; //dev
        this.url = 'ws://35.195.249.169:8080/'; //prod
    }

    connect() {
        return new WebSocket(this.url);
    }

    open() {
        this.connect().onopen = () => {
            console.log('connecnted');
        };
    }

    message(hook) {
        this.connect().onmessage = event => {
            this.hook = hook;

            if (event.data === '[object Event]') return;
            else {
                let temp = JSON.parse(event.data);
                this.hook(temp);
            }
        };
    }

    // reconnect() {
    //     setTimeout(() => {
    //         console.log('reconnecting to socket');
    //         this.connect();
    //         this.open();
    //     }, 1000);
    // }
}