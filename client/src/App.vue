<script setup lang="ts">
import { Socket, io } from 'socket.io-client';

import { useToast } from 'primevue/usetoast';

import Button from 'primevue/button';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';

const toast = useToast();

const showInfo = (detail: string) => {
  toast.add({
    severity: 'info',
    summary: 'Info Message',
    detail,
    life: 3000,
  });
};

const adminMessage = ref<string>();

let socket = <Socket | null>null;

const connectToSocket = () => {
  socket = io();
  socket?.on('send_admin_message', (msg) => {
    console.log(msg);
    showInfo(msg);
  });
  console.log('connected', socket);
};

const disconnectFromSocket = () => {
  if (socket) socket.disconnect();

  console.log('disconnected', socket);
};

const sendAdminMessage = () => {
  if (!socket) return;

  socket.emit('send_admin_message', adminMessage.value);
  // adminMessage.value = '';
};
</script>

<template>
  <div class="page">
    <div class="control_buttons">
      <Button label="connect" @click="connectToSocket" />
      <Button
        label="disconnect"
        @click="disconnectFromSocket"
        severity="danger"
      />
    </div>
    <div class="admin_chat">
      <InputText type="text" v-model="adminMessage" />
      <Button label="send message" @click="sendAdminMessage" severity="help" />
    </div>
  </div>
  <Toast />
</template>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .control_buttons {
    display: flex;
    gap: 1rem;
  }
}
</style>
