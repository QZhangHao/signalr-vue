<template>
  <div>
    <div class="hello">
      <h1>{{ msg }}</h1>
    </div>
    <input type="text" v-model="messaggio"/>
    <button v-on:click="sendMessage">invia</button>
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
    }
  }
}
</script>
