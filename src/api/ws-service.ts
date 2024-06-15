export default class WebSocketService {
    private socket: WebSocket | null = null;
  
    connectWebSocket(onMessage: (data: any) => void) {
      this.socket = new WebSocket('ws://localhost:3000');
  
      this.socket.onopen = () => {
        console.log('WebSocket connected');
      };
  
      this.socket.onmessage = (event) => {
        onMessage(event.data);
      };
  
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      this.socket.onclose = () => {
        console.log('WebSocket closed');
      };
    }
  
    closeWebSocket() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
    }
  }
  