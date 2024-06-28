export default class WebSocketService {
  private static instance: WebSocketService;
  private socket: WebSocket | null = null;
  private endpoint : string = 'ws://localhost:3000';

  private constructor () {}

  public static getInstance (): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  async connectWebSocket(onMessage: (data: any) => void): Promise <void> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.endpoint);

      this.socket.onopen = () => {
        console.log('WebSocket connected');
        resolve(); // Resuelve la promesa cuando el WebSocket se conecta correctamente
      };

      this.socket.onmessage = (event) => {
        onMessage(event.data);
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error); // Rechaza la promesa en caso de error
      };

      this.socket.onclose = () => {
        console.log('WebSocket closed');
      };
    });
  }

  async closeWebSocket() {
      if (this.socket) {
          this.socket.close();
          this.socket = null;
      }
  }

  async sendDataToServer(data: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        console.log(`Dato enviado ${data}`);
        this.socket.send(data);
        resolve();
      } else {
        reject(new Error('WebSocket no está conectado para enviar datos.'));
      }
    });
  }
}
