<template>
  <div>
    <div class="hello">
      <h1>{{ msg }}</h1>
    </div>
    <input type="text" v-model="groupName"/>
    <button v-on:click="register">registra</button>
    <br>
    <input type="text" v-model="messaggio"/>
    <button v-on:click="sendMessage">invia a tutti</button>
    <button v-on:click="sendMessageGroup">invia al gruppo</button>
    <button v-on:click="sendMessageApi">invia (api)</button>
    <ul v-if="messaggi">
      <li v-for="item in messaggi">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import '../signalr-client-1.0.0-alpha2-final'

export default {
  name: 'HelloWorld',
  data () {
    return {
      groupName: '',
      messaggio: '',
      messaggi: [],
      connection: null,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    this.connection = new signalR.HubConnection('http://localhost:5001/chat')
  },
  mounted () {
    this.connection.start()

    this.connection.on('send', data => {
      this.messaggi.push(data);
      console.log(data)
    })
  },
  methods: {
    sendMessage () {
      this.connection.invoke('send', this.messaggio)
    },
    sendMessageApi () {
      this.$http.post('http://localhost:5000/api/test/group/' + this.groupName, { messaggio: this.messaggio}, {  })
        .then(response => {
          console.log('messaggio inviato')
        }, response => {
          window.alert('errori in invio messaggio')
        })
    },
    sendMessageGroup () {
      this.connection.invoke('sendGroup', this.groupName, this.messaggio)
    },
    register () {
      this.connection.invoke('register', this.groupName, 'someKey');
    }
  }
}
</script>
